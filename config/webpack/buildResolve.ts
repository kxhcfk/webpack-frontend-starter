import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";

const buildResolve = (options: WebpackBuildOptions): webpack.Configuration["resolve"] => {
    return {
        extensions: [".ts", ".js"],
    };
};

export {buildResolve};