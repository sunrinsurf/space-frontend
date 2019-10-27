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
import createStore from './store/createStore';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { END } from 'redux-saga';

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
    const extractor = new ChunkExtractor({ statsFile });
    const sheet = new ServerStyleSheet()
    const store = createStore({
        Auth: {
            token: ctx.cookies.get('auth_token'),
            autorized: !!ctx.cookies.get('auth_token')
        }
    });

    const context = {};
    const prefetchContext: Prefetch.PrefetchContextInterface = {
        promises: {},
        preloads: {}
    };
    const jsx = (
        <ChunkExtractorManager extractor={extractor}>
            <StyleSheetManager sheet={sheet.instance}>
                <Prefetch.PrefetchContext.Provider value={prefetchContext}>
                    <Provider store={store}>
                        <StaticRouter location={ctx.url} context={context}>
                            <App />
                        </StaticRouter>
                    </Provider>
                </Prefetch.PrefetchContext.Provider>
            </StyleSheetManager>
        </ChunkExtractorManager>
    );

    ReactDOMServer.renderToStaticMarkup(jsx);
    await Promise.all(Object.entries(prefetchContext.promises).map(([key, value]) => {
        return (async () => {
            prefetchContext.preloads[key] = await Promise.resolve(value());
        })();
    }));

    store.dispatch(END);
    const root = ReactDOMServer.renderToString(jsx);
    const preloadScript = `<script>window.__PRELOAD_SERVER__=${JSON.stringify(prefetchContext.preloads).replace(/</g, '\\u003c')}</script>`;
    const preloadStateScript = `<script>window.__PRELOAD_STATE__=${
        JSON.stringify(store.getState()).replace(/</g, '\\u003c')
        }</script>`;
    ctx.body = createPage(root, {
        script: preloadScript + preloadStateScript + extractor.getScriptTags(),
        link: extractor.getLinkTags(),
        style: sheet.getStyleTags() + extractor.getStyleTags()
    });
}

router.get('*', serverRender);
app.use(router.routes()).use(router.allowedMethods())
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
})