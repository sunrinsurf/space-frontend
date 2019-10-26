const paths = require('./paths');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const useTypeScript = fs.existsSync(paths.appTsConfig);
const getClientEnvironment = require('./env');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const resolve = require('resolve');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';


module.exports = function () {
    const publicPath = paths.servedPath;

    const publicUrl = publicPath.slice(0, -1)
    const env = getClientEnvironment(publicUrl);
    const getStyleLoaders = (cssOptions = {}, preProcessor) => {
        const loaders = [
            {
                loader: require.resolve('css-loader'),
                options: { ...cssOptions, exportOnlyLocals: true },
            },
        ].filter(Boolean);
        if (preProcessor) {
            loaders.push(
                {
                    loader: require.resolve('resolve-url-loader'),
                    options: {
                        sourceMap: shouldUseSourceMap,
                    },
                },
                {
                    loader: require.resolve(preProcessor),
                    options: {
                        sourceMap: true,
                    },
                }
            );
        }
        return loaders;
    };

    return {
        mode: 'production',
        target: 'node',
        node: false,
        externals: [nodeExternals()],
        entry: paths.ssrIndex,
        output: {
            path: paths.ssrBuild,
            filename: 'server.js',
            chunkFilename: 'js/[name].chunk.js',
            publicPath: paths.servedPath
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: imageInlineSizeLimit,
                                name: 'static/media/[name].[hash:8].[ext]',
                                emitFile: false
                            },
                        },
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides'
                                ),

                                plugins: [
                                    [
                                        require.resolve('babel-plugin-named-asset-import'),
                                        {
                                            loaderMap: {
                                                svg: {
                                                    ReactComponent:
                                                        '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                                },
                                            },
                                        },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: false,
                                compact: false,
                            },
                        },
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: false,
                                configFile: false,
                                compact: false,
                                presets: [
                                    [
                                        require.resolve('babel-preset-react-app/dependencies'),
                                        { helpers: true },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: false,
                                sourceMaps: false,
                            },
                        },
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: getStyleLoaders({}),
                        },
                        {
                            test: cssModuleRegex,
                            use: getStyleLoaders({
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            }),
                        },
                        {
                            test: sassRegex,
                            exclude: sassModuleRegex,
                            use: getStyleLoaders(
                                {},
                                'sass-loader'
                            ),
                        },
                        {
                            test: sassModuleRegex,
                            use: getStyleLoaders(
                                {
                                    modules: true,
                                    getLocalIdent: getCSSModuleLocalIdent,
                                },
                                'sass-loader'
                            ),
                        },
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]',
                                emitFile: false
                            },
                        },
                        // ** STOP ** Are you adding a new loader?
                        // Make sure to add the new loader(s) before the "file" loader.
                    ],
                }
            ],
        },
        resolve: {
            modules: ['node_modules'],
            extensions: paths.moduleFileExtensions
                .map(ext => `.${ext}`)
                .filter(ext => useTypeScript || !ext.includes('ts')),
        },
        plugins: [
            new webpack.DefinePlugin(env.stringified),
            useTypeScript &&
            new ForkTsCheckerWebpackPlugin({
                typescript: resolve.sync('typescript', {
                    basedir: paths.appNodeModules,
                }),
                async: false,
                useTypescriptIncrementalApi: true,
                checkSyntacticErrors: true,
                resolveModuleNameModule: process.versions.pnp
                    ? `${__dirname}/pnpTs.js`
                    : undefined,
                resolveTypeReferenceDirectiveModule: process.versions.pnp
                    ? `${__dirname}/pnpTs.js`
                    : undefined,
                tsconfig: paths.ssrTsConfig,
                reportFiles: [
                    '**',
                    '!**/__tests__/**',
                    '!**/?(*.)(spec|test).*',
                    '!**/src/setupProxy.*',
                    '!**/src/setupTests.*',
                ],
                silent: true,
                // The formatter is invoked directly in WebpackDevServerUtils during development
                formatter: typescriptFormatter,
            }),

        ].filter(Boolean)
    }
}