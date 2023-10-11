import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {WebpackBuildOptions} from "./types/config";

const buildLoaders = (options: WebpackBuildOptions): webpack.Configuration["module"]["rules"] => {
    const {isDev} = options;
    
    const twigLoader = {
        test: /\.twig$/,
        use: {
            loader: "twig-loader",
        },
    };
    
    const styleLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
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