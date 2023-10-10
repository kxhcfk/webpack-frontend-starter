export type WebpackBuildMode = "development" | "production";

export interface WebpackBuildPaths {
    readonly app: string;
    readonly src: string;
    readonly output: string;
    readonly pages: string;
}

export interface WebpackBuildEnv {
    readonly mode: WebpackBuildMode,
    readonly port: number;
}

export interface WebpackBuildOptions {
    readonly mode: WebpackBuildMode;
    readonly paths: WebpackBuildPaths;
    readonly isDev: boolean;
    readonly port: number;
}