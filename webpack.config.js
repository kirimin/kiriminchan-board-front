var path = require('path');

module.exports = {
    mode: "development",
    //  mode: 'production',

    devtool: "sorce-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                {
                    loader: "ts-loader"
                }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: { url: false }
                  }
                ]
            }
        ]
    },

    devServer: {
        contentBase: "public",
        open: true,
        port: 8081
    },
    context: path.join(__dirname, "src"),
    entry: "./main.tsx",

    output: {
        path: __dirname + "/public/",
        filename: "main.min.js"
    },
};