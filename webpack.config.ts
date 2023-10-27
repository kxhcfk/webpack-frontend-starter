import path from "path";
import webpack from "webpack";

import {WebpackBuildEnv, WebpackBuildPaths} from "./config/webpack/types/config";
import {buildWebpackConfig} from "./config/webpack/buildWebpackConfig";

const config = (env: WebpackBuildEnv): webpack.Configuration => {
    const mode = env.mode;
    const port = env.port || 3000;
    const isDev = mode === "development";
    
    const paths: WebpackBuildPaths = {
        src: path.resolve(__dirname, "src"),
        output: path.resolve(__dirname, "build"),
        app: path.resolve(__dirname, "src", "app"),
        svgo: path.resolve(__dirname, "config", "svgo", "svgo.config.ts"),
    };
    
    return buildWebpackConfig({
        isDev,
        mode,
        port,
        paths,
    });
};

export default config;