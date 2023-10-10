import {WebpackBuildOptions} from "./types/config";
import webpack from "webpack";
import fs from "fs";
import path from "path";

const buildEntry = (options: WebpackBuildOptions): webpack.Configuration["entry"] => {
    const {paths} = options;
    
    const entry = fs.readdirSync(paths.app).reduce((acc, file) => {
        const [filename, ext] = file.split(".");
        
        acc.push([
            filename,
            path.resolve(paths.app, file)
        ]);
        
        return acc;
    }, []);
    
    return Object.fromEntries(entry);
};

export {buildEntry};