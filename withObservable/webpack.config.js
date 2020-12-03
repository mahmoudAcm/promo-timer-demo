const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[contenthash:8].js'
    },
    module: {
        rules: [
          { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
          { test: /\.(png|svg|jpg|gif|jpe?g)$/, 
            use: [{
              options: {
                name: "[name].[ext]",
                outputPath: "static/images/"
              },
              loader: "file-loader"
            }], 
            exclude: /node_modules/ 
          },
          { test: /\.mp3$/, 
            use: [{
              options: {
                name: "[name].[ext]",
                outputPath: "static/records/"
              },
              loader: "file-loader"
            }], 
            exclude: /node_modules/ 
          },
          { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'], exclude: /node_modules/ },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin(
            Object.assign(
              {},
              {
                inject: true,
                template: 'public/index.html',
              }
            )
        ),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ],
    resolve: {
        // Add .ts and .tsx as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hotOnly: true
    }
};
