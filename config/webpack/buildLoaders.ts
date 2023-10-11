import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";

const buildLoaders = (options: WebpackBuildOptions): webpack.Configuration["module"]["rules"] => {
    const twigLoader = {
        test: /\.twig$/,
        use: {
            loader: "twig-loader",
        },
    };
    
    const styleLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader",
        ],
    };
    
    return [
        twigLoader,
        styleLoader
    ];
};

export {buildLoaders};