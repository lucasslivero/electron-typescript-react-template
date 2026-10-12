import type { ReactNode } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col">
      <ThemeSwitcher />

      <main className="h-full w-full overflow-hidden">
        <div className="h-full w-full overflow-auto p-5">{children}</div>
      </main>
    </div>
  );
}
