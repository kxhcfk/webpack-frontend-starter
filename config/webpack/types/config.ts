export type WebpackBuildMode = "development" | "production";

export interface WebpackBuildPaths {
    readonly src: string;
}

export interface WebpackBuildEnv {
    mode: WebpackBuildMode,
    port: number;
}

export interface WebpackBuildOptions {
    readonly mode: WebpackBuildMode;
    readonly paths: WebpackBuildPaths;
    readonly isDev: boolean;
    readonly port: number;
}