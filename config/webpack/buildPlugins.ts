import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import SvgChunkWebpackPlugin from 'svg-chunk-webpack-plugin';
import path from "path";
import fs from "fs";

const buildPlugins = (options: WebpackBuildOptions): webpack.Configuration["plugins"] => {
    const {paths, isDev} = options;
    
    const html = fs.readdirSync(paths.app).map(dir => (
        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(paths.app, dir, 'template.twig'),
            filename: `${dir}.html`,
            minify: !isDev,
        })
    ));
    
    const plugins: webpack.Configuration["plugins"] = [
        ...html,
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new SvgChunkWebpackPlugin(),
    ];
    
    return plugins;
};

export {buildPlugins};