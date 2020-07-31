/**
 * Webpack configuration
 */

const path = require('path');

const mode = process.env.mode || 'development';

module.exports = {
    mode,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './app/'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        compress: true,
        hot: true,
        port: 3000,
        contentBase: path.join(__dirname, "./app/"),
    },
};