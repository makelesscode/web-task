/**
 * Webpack configuration
 */

const path = require("path");

const paths = {
    js: [
        path.resolve(__dirname, "./src/components"),
        path.resolve(__dirname, "./src/containers"),
        path.resolve(__dirname, "./src/actions"),
        path.resolve(__dirname, "./src/reducers"),
        path.resolve(__dirname, "./src/helpers"),
        path.resolve(__dirname, "./src/index.jsx"),
    ],
    styles: [
        path.resolve(__dirname, "./src/styles/**/.css"),
        path.resolve(__dirname, "./src/styles/**/.scss")
    ]
};

/**
 * Environment mode
 */
const mode = process.env.NODE_ENV || "development";
module.exports = {
    mode,
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "./app/"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        compress: true,
        hot: true,
        port: 3000,
        contentBase: path.join(__dirname, "./app/"),
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.jsx?$/,
                include: paths.js,
                enforce: "pre",
                loader: require.resolve("eslint-loader"),
                options: {
                    cache: true,
                    eslintPath: require.resolve("eslint")
                },
            },
            {
                test: /\.jsx?$/,
                include: paths.js,
                loader: require.resolve("babel-loader"),
                options: {
                    presets: [
                        "@babel/preset-react",
                        "@babel/preset-env"
                    ],
                    cacheDirectory: true, // caching for faster rebuilds (babel-loader)
                    cacheCompression: false,
                    compact: mode === "production",
                }
            },
            {
                test: /\.s?css/,
                include: paths.styles,
                loader: require.resolve('sass-loader'),
                options: {
                    sourceMap: mode === "development"
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};