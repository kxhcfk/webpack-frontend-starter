import webpack from "webpack";
import {WebpackBuildOptions} from "./types/config";
import {buildEntry} from "./buildEntry";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildDevServer} from "./buildDevServer";

const buildWebpackConfig = (options: WebpackBuildOptions): webpack.Configuration => {
    const {mode, isDev, paths} = options;
    
    return {
        mode: mode,
        entry: buildEntry(options),
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        output: {
            path: paths.output,
            filename: '[name].js',
            clean: true,
        },
    };
};

export {buildWebpackConfig};