import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import fs from "fs";

const buildPlugins = (options: WebpackBuildOptions): webpack.Configuration["plugins"] => {
    const {paths, isDev} = options;
    
    const html = fs.readdirSync(paths.pages).map(file => {
        const [filename, ext] = file.split('.');
        
        return (
            new HtmlWebpackPlugin({
                inject: false,
                template: path.resolve(paths.pages, file),
                filename: `${filename}.html`,
                minify: !isDev,
            })
        )
    });
    
    const plugins: webpack.Configuration["plugins"] = [
        ...html,
    ];
    
    return plugins;
};

export {buildPlugins};