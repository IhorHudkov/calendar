const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
    const config =  {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ''
            },
        }
        ,'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}


const main = {
    target: 'web',
    
    context: path.resolve(__dirname, 'src'),
    entry: {
        base: './base.js',
        array_compare: './array-compare.js',
        calendar_select: './select-for-calendar.js',       
        index: './index.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'docs')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),

        
        
        new CopyWebpackPlugin({patterns:[
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'docs')
            }
        ]}),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
        ]
    }
}



const create_event = {
    target: 'web',
    
    context: path.resolve(__dirname, 'src'),
    entry: {
        select: './select.js',
        create_event: './create-event.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'docs')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),


    plugins: [
        new HTMLWebpackPlugin({
            filename: 'create-event.html',
            template: './create-event.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),

        
        
        new CopyWebpackPlugin({patterns:[
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'docs')
            }
        ]}),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
        ]
    }
}


module.exports = [main, create_event]