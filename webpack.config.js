const path = require('path')
//const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    // devServer: {
    //     publicPath: '/build',
    //     hot: true,
    //     historyApiFallback: true
    // },

    module:{
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                   loader: 'babel-loader',
                   options: {
                       presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                      loader: 'css-loader',
                      options: {
                        modules: true,
                      },
                    }
                  ]
            },   
        ],
    },

    plugins: [ new HtmlWebpackPlugin({
        // hash: true,
        inject: true,
        template: 'client/index.html'
      }),]
}

