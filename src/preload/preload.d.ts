// Used in Renderer process, expose in `preload.ts`
/** biome-ignore-all lint/correctness/noUnusedVariables: <File for types> */
interface Window {
  api: import("@shared/types/BrowserApi").IBrowserApi;
}
