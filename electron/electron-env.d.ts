/// <reference types="vite-plugin-electron/electron-env" />
declare module 'wechaty-web-panel'
declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    DIST_ELECTRON: string
    DIST: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}
