// Used in Renderer process, expose in `preload.ts`
interface Window {
  api: import("@shared/types/BrowserApi").IBrowserApi;
}
