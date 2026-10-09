import { watch } from "node:fs";
import { join } from "node:path";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { requestAppRestart } from "@electron-forge/core-utils/restart";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";

let mainWatcher: ReturnType<typeof watch> | null = null;
let restartDebounce: NodeJS.Timeout | null = null;

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    extraResource: ["./public/"],
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ["darwin"]), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new VitePlugin({
      hotRestart: true,
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main/main.ts",
          config: "vite.main.config.ts",
          target: "main",
        },
        {
          entry: "src/preload/preload.ts",
          config: "vite.preload.config.ts",
          target: "preload",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    postStart: async () => {
      if (mainWatcher) return;
      const buildDir = join(process.cwd(), ".vite/build");
      mainWatcher = watch(buildDir, (_event, filename) => {
        if (filename === "main.js") {
          if (restartDebounce) clearTimeout(restartDebounce);
          restartDebounce = setTimeout(() => {
            requestAppRestart();
          }, 300);
        }
      });
    },
  },
};

export default config;
