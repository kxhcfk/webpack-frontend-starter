import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";
import fs from "fs";
import path from "path";

const buildEntry = (options: WebpackBuildOptions): webpack.Configuration["entry"] => {
    const {paths} = options;
    
    const entry = fs.readdirSync(paths.pages).reduce((acc, dir) => {
        acc.push([
            dir,
            path.resolve(paths.pages, dir, 'script.ts')
        ]);
        
        return acc;
    }, []);
    
    return Object.fromEntries(entry);
};

export {buildEntry};