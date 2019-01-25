const ENV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'watch' ? 'development' : 'production'
const REBUILD = process.env.NODE_ENV !== 'watch'


const path = require('path')
const fs = require('fs')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const pkg = require('./package.json')
const CONFIG = pkg.config[ENV]
CONFIG.info = `${pkg.name} v.${pkg.version} ${new Date().toISOString()}`


class WriteConfigPlugin {
    constructor(config, dist) {
        this.config = config
        this.dist = path.resolve(__dirname, dist)
    }
    apply(compiler) {
        compiler.plugin("afterEmit", () => {
            const content = `var CONFIG = ${JSON.stringify(CONFIG)};`
            fs.writeFile(this.dist, content, () => {
                console.log('Config saved', this.dist)
            })
        });
    }
}

const plugins = [
    new MiniCssExtractPlugin({
        filename: './css/styles.css'
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Test App',
        minify: true
    }),
    new CopyWebpackPlugin([
        { from: './src/assets/img', to: './img' },
        { from: './src/assets/fonts', to: './fonts' },
        { from: './src/assets/locales', to: './locales' },
    ]),
    new WriteConfigPlugin(CONFIG, './dist/js/config.js')
]

if(REBUILD) plugins.push(new CleanWebpackPlugin(['./dist']))

module.exports = {
    mode: ENV,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: CONFIG.PORT,
        historyApiFallback: true
    },
    entry: ['./src/index.js'],
    output: {
        filename: './js/bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: { 
        minimizer: ENV === 'production' ? [ 
            new UglifyJsPlugin({ sourceMap: true }), 
            new OptimizeCSSAssetsPlugin({})
        ] : []
    },
    devtool: 'source-map',
    performance: { hints: false },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer('last 2 versions', 'ie 10')],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins
};