import { resolve } from "node:path";

export const aliases = {
  "@shared": resolve("./src/shared"),
  "@app": resolve("./src/renderer/app"),
  "@ui": resolve("./src/renderer/app/components/ui"),
};
