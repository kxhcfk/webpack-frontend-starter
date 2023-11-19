import { WebpackBuildOptions } from "./types/config";
import webpack from "webpack";
import path from "path";

const buildResolve = (options: WebpackBuildOptions): webpack.Configuration["resolve"] => {
    const {paths} = options;
    
    return {
        extensions: [".ts", ".js"],
        modules: [
            paths.src,
            paths.public,
            path.resolve(paths.src, '..', 'node_modules')
        ],
        alias: {
            "@icons": path.resolve(paths.src, "assets", "svg"),
        },
    };
};

export { buildResolve };