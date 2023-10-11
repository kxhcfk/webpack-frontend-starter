import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import SvgChunkWebpackPlugin from 'svg-chunk-webpack-plugin';
import {WebpackBuildOptions} from "./types/config";

const buildLoaders = (options: WebpackBuildOptions): webpack.Configuration["module"]["rules"] => {
    const {isDev} = options;
    
    const tsLoader = {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };
    
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
    
    const fontLoader = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
    };
    
    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: (SvgChunkWebpackPlugin as any).loader,
            },
        ],
    };
    
    return [
        tsLoader,
        twigLoader,
        styleLoader,
        fontLoader,
        svgLoader
    ];
};

export {buildLoaders};