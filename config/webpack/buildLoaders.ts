import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackBuildOptions } from "./types/config";
import SvgChunkWebpackPlugin from "svg-chunk-webpack-plugin";
import path from "path";
import { LoaderContext } from "mini-css-extract-plugin/types/utils";

const buildLoaders = (options: WebpackBuildOptions): webpack.Configuration["module"]["rules"] => {
    const {isDev, isSvg, paths} = options;
    
    const tsLoader = {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };
    
    const twigLoader:  webpack.RuleSetRule = {
        test: /\.twig$/,
        use: [
            {
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: "img",
                                attribute: "src",
                                type: "src",
                            },
                        ],
                    },
                    minimize: false,
                },
            },
            {
                loader: "twig-html-loader",
                options: {
                    namespaces: {
                        "output": path.resolve(paths.output),
                    },
                    data: (context: LoaderContext, w: any, q: any) => {
                        const entry = path.dirname(context.resourcePath).split(path.sep).at(-1);

                        return {
                            htmlWebpackPlugin: {
                                files: {
                                    js: entry,
                                    css: entry,
                                    svgSprite: `sprites${path.sep}${entry}.svg`,
                                },
                            },
                        };
                    },
                },
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
        generator: {
            filename: 'assets/fonts/[base]'
        }
    };
    
    const svgLoader = {
        test: /\.svg$/,
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
        generator: {
            filename: 'assets/images/[base]'
        }
    };
    
    const loaders: webpack.Configuration["module"]["rules"] = [
        styleLoader,
        fontLoader,
        assetsLoader,
        svgLoader,
        tsLoader,
    ];
    
    if (!isSvg) {
        loaders.push(twigLoader);
    }
    
    return loaders;
};

export { buildLoaders };