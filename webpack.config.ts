import path from 'path';
import webpack from 'webpack';

import {WebpackBuildEnv} from "./config/webpack/types/config";

const config = (env: WebpackBuildEnv): webpack.Configuration => {
    console.log(env);
    return {
        mode: 'production',
        entry: './foo.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
        },
    }
};

export default config;