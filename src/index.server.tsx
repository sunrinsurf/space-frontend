import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import App from './App';
import serve from 'koa-static';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import * as Prefetch from './lib/usePrefetch';
import store from './store';
import { Provider } from 'react-redux';

const PORT = process.env.PORT || 8080;
const statsFile = path.resolve('./build/loadable-stats.json');
console.log(statsFile);
const app = new Koa();
const router = new Router();
app.use(serve(path.resolve('./build'), {
    index: false
}));

function createPage(root: any, { style, link, script }: { style: string, link: string, script: string }) {
    return `
    <!DOCTYPE HTML>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            ${style}
            ${link}
        </head>
        <body>
            <div id="root">
                ${root}
            </div>
            ${script}
        </body>
    </html>
    `.trim();
}
async function serverRender(ctx: Koa.ParameterizedContext) {
    Prefetch.clearPromises();
    const extractor = new ChunkExtractor({ statsFile });

    const context = {};
    const jsx = (
        <ChunkExtractorManager extractor={extractor}>
            <Provider store={store}>
                <StaticRouter location={ctx.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        </ChunkExtractorManager>
    );

    ReactDOMServer.renderToStaticMarkup(jsx);
    const preloads: { [key: string]: Object } = {};
    await Promise.all(Object.entries(Prefetch.promises).map(([key, value]) => {
        return (async () => {
            preloads[key] = await Promise.resolve(value());
        })();
    }));
    (global as any).ssrPreloads = preloads;
    const root = ReactDOMServer.renderToString(jsx);
    ctx.body = createPage(root, {
        script: `<script>window.__PRELOAD_SERVER__=${JSON.stringify(preloads)}</script>` + extractor.getScriptTags(),
        link: extractor.getLinkTags(),
        style: extractor.getStyleTags()
    });
}

router.get('*', serverRender);
app.use(router.routes()).use(router.allowedMethods())
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
})