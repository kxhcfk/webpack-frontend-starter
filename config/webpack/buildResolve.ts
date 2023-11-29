import { WebpackBuildOptions } from "./types/config";
import webpack from "webpack";
import path from "path";

const buildResolve = (options: WebpackBuildOptions): webpack.Configuration["resolve"] => {
    const {paths} = options;
    
    return {
        extensions: [".ts", ".js"],
        alias: {
            "@ui": path.resolve(paths.src, "shared", "ui")
        }
    };
};

export { buildResolve };