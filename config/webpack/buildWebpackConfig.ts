import webpack from "webpack";
import {WebpackBuildOptions} from "./types/config";
import {buildEntry} from "./buildEntry";

const buildWebpackConfig = (options: WebpackBuildOptions): webpack.Configuration => {
    const {mode, port, isDev, paths} = options;
    
    return {
        mode: mode,
        entry: buildEntry(options),
        
        output: {
            path: paths.output,
            filename: isDev
                ? '[name].bundle.js'
                : '[name].[contenthash].bundle.js',
        },
    };
};

export {buildWebpackConfig};