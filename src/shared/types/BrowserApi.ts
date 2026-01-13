import type * as ipcHandlers from "./../../main/api/api";

type Api = typeof ipcHandlers;

type customApi = {
  locale: string;
};

export type IBrowserApi = Api & customApi;
