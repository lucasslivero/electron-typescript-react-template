import { existsSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { app, BrowserWindow, net, protocol } from "electron";
import started from "electron-squirrel-startup";
import { createIpcHandler } from "./api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IS_DEV = !!MAIN_WINDOW_VITE_DEV_SERVER_URL;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Register scheme BEFORE app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      bypassCSP: true,
      supportFetchAPI: true,
      stream: true,
    },
  },
]);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Electron Typescript React Template",
    vibrancy: "under-window",
    visualEffectState: "active",
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
      devTools: IS_DEV,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: "right" });
  } else {
    mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.maximize();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  protocol.handle("app", async (request) => {
    try {
      // Remove 'app://' from the URL
      const url = request.url.slice("app://".length);

      // Decode URI component to handle special characters
      const decodedUrl = decodeURIComponent(url);

      // Determine the base path based on the URL
      let filePath: string;
      if (decodedUrl.startsWith("assets/")) {
        if (app.isPackaged) {
          filePath = join(process.resourcesPath, "public", decodedUrl);
        } else {
          filePath = join(__dirname, "..", "..", "public", decodedUrl);
        }
      } else {
        filePath = decodedUrl;
      }

      // Normalize the path to prevent directory traversal attacks
      const normalizedPath = normalize(filePath);

      // Check if file exists
      if (!existsSync(normalizedPath)) {
        return new Response("File not found", {
          status: 404,
          headers: { "content-type": "text/plain" },
        });
      }

      // Return the file using net.fetch
      return net.fetch(`file://${normalizedPath}`);
    } catch (error) {
      console.error("Protocol handler error:", error);
      return new Response("Internal server error", {
        status: 500,
        headers: { "content-type": "text/plain" },
      });
    }
  });

  createWindow();
  createIpcHandler();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
