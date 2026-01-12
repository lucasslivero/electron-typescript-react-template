import { contextBridge } from "electron";
import { api } from "./api";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("api", {
  locale: navigator.language,
  ...api,
});
