import {WebpackBuildOptions} from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


const buildDevServer = (options: WebpackBuildOptions): DevServerConfiguration => {
    const {port} = options;
    
    return {
        port,
        open: true,
        watchFiles: ["src/**/*.twig"]
    }
}

export {buildDevServer}