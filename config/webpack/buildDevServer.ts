import { WebpackBuildOptions } from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import path from "path";


const buildDevServer = (options: WebpackBuildOptions): DevServerConfiguration => {
    const {port, paths} = options;
    
    return {
        port,
        open: true,
        watchFiles: {
            paths: [
                "src/**/*.twig",
                "public/**/*.png",
            ],
            options: {
                usePolling: true,
                useFsEvents: true,
            }
        },
        hot: 'only',
        static: {
            directory: path.resolve(paths.public),
            staticOptions: {
                extensions: ['png', 'svg', 'jpg']
            },
            serveIndex: {
                filter: (filename: string) => {
                    return filename.includes('.html')
                }
            },
            watch: true,
        },
    };
};

export { buildDevServer };