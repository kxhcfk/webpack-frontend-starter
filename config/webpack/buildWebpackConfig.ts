import webpack from "webpack";
import {WebpackBuildOptions} from "./types/config";
import {buildEntry} from "./buildEntry";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";

const buildWebpackConfig = (options: WebpackBuildOptions): webpack.Configuration => {
    const {mode, port, isDev, paths} = options;
    
    return {
        mode: mode,
        entry: buildEntry(options),
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        output: {
            path: paths.output,
            filename: '[name].js',
            clean: true,
        },
    };
};

export {buildWebpackConfig};