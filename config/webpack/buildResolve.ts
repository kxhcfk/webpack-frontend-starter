import { WebpackBuildOptions } from "./types/config";
import webpack from "webpack";
import path from "path";

const buildResolve = (options: WebpackBuildOptions): webpack.Configuration["resolve"] => {
    const {paths} = options;
    
    return {
        extensions: [".ts", ".js"],
        alias: {
            "@icons": path.resolve(paths.src, "assets", "svg"),
        },
    };
};

export { buildResolve };