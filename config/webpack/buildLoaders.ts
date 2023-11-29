import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackBuildOptions } from "./types/config";
import SvgChunkWebpackPlugin from "svg-chunk-webpack-plugin";
import path from "path";

const buildLoaders = (options: WebpackBuildOptions): webpack.Configuration["module"]["rules"] => {
    const {isDev, paths} = options;
    
    const tsLoader = {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };
    
    const twigLoader: webpack.RuleSetRule = {
        test: /\.twig$/,
        use: [
            // {
            //     loader: "twig-loader",
            //     options: {
            //         twigOptions: {
            //             namespaces: {
            //                 "ui": path.resolve(paths.src, "shared", "ui")
            //             }
            //         }
            //     }
            // },
            {
                loader: "twigjs-loader",
            },
        ],
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
        test: /\.svg$/i,
        use: [
            {
                loader: (SvgChunkWebpackPlugin as any).loader,
                options: {
                    configFile: paths.svgo,
                },
            },
        ],
    };
    
    const assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    };
    
    const loaders: webpack.Configuration["module"]["rules"] = [
        styleLoader,
        fontLoader,
        assetsLoader,
        svgLoader,
        twigLoader,
        tsLoader,
    ];
    
    return loaders;
};

export { buildLoaders };