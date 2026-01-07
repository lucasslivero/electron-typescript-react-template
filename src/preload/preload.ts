import { contextBridge } from "electron";

if (!process.contextIsolated) {
	throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

contextBridge.exposeInMainWorld("api", {
	locale: navigator.language,
});
