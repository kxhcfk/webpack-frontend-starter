import {WebpackBuildOptions} from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


const buildDevServer = (options: WebpackBuildOptions): DevServerConfiguration => {
    const {port} = options;
    
    return {
        port,
        compress: false,
        hot: 'only',
        open: true,
        watchFiles: 'src/**/*.*'
    }
}

export {buildDevServer}