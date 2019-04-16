// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// configs
const CleanConfig = require("./clean.config");

// clean config
module.exports = {
 entry: {
   main: './js/index.js'
 },
 output: {
   path: path.resolve(__dirname, 'dist'),
   filename: 'bundle.js'
 },
 module: {
   rules: [
     {
       test: /\.jsx?$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.scss$/,
       use: [
         'style-loader',
         MiniCssExtractPlugin.loader,
         'css-loader',
         'postcss-loader',
         'sass-loader'
       ]
     },
     {
       test: /\.(png|svg|jpg|gif|jpeg)$/,
       use: [
           'file-loader'
       ]
     },
     {
       test: /\.html$/,
       loader: "html-loader"
     }
   ]
 },
 plugins: [
   new CleanWebpackPlugin(CleanConfig.paths, CleanConfig.options),
   new MiniCssExtractPlugin({
     filename: 'bundle.css'
   }),
   new StyleLintPlugin({
     configFile: './stylelint.config.js',
     files: '**/*.scss',
     syntax: 'scss'
   })
 ]
};