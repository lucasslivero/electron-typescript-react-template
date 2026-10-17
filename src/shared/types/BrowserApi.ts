import * as ipcHandlers from "./../../main/api/api";

type MainApiInterface = typeof ipcHandlers;
type customApi = {
  locale: string;
};

export type IBrowserApi = MainApiInterface & customApi;
export type ApiKeys = keyof MainApiInterface;

// Runtime-safe: Vite bundles only the key list; function bodies are tree-shaken.
export const apiKeys = Object.keys(ipcHandlers) as ApiKeys[];
