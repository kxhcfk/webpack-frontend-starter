import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";

const buildLoaders = (options: WebpackBuildOptions): webpack.Configuration['module']['rules'] => {
    const twigLoader = {
        test: /\.twig$/,
        use: {
            loader: 'twig-loader',
        }
    };
    
    return [
        twigLoader
    ]
}

export {buildLoaders}