import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import SvgChunkWebpackPlugin from "svg-chunk-webpack-plugin";
import path from "path";
import fs from "fs";
import CopyPlugin from "copy-webpack-plugin";

const buildPlugins = (options: WebpackBuildOptions): webpack.Configuration["plugins"] => {
    const {paths, isDev} = options;
    
    const html = fs.readdirSync(paths.pages).map(dir => (
        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(paths.pages, dir, "template.twig"),
            templateParameters: (compilation, assets, assetTags, options) => {
                const compilationAssets = compilation.getAssets();
                
                const sprites = compilationAssets.filter((asset: any) => asset.name.includes('sprites/'));
                
                return {
                    compilation,
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        tags: assetTags,
                        files: {
                            ...assets,
                            svgSprites: sprites.map((sprite: any) => ([
                                sprite.name.split('/')[1],
                                sprite.source._valueAsString
                            ])),
                        },
                        options,
                    },
                };
            },
            filename: `${dir}.html`,
            minify: false,
        })
    ));
    
    const plugins: webpack.Configuration["plugins"] = [
        ...html,
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new SvgChunkWebpackPlugin({
            filename: "sprites/[name].svg",
            generateSpritesPreview: true,
            svgstoreConfig: {
                svgAttrs: {
                    'aria-hidden': true,
                    style: 'position: absolute; width: 0; height: 0; overflow: hidden;'
                }
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.public),
                    to: path.resolve(paths.output, 'assets')
                }
            ],
        }),
        new webpack.ProgressPlugin()
    ];
    
    return plugins;
};

export {buildPlugins};