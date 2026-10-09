# Overview
Desktop application template built with Electron, React 19, TypeScript, and Vite, managed via Electron Forge. Maintained by a senior developer; keep solutions direct, production-ready, and minimal.

# Communication Style
- Be concise; skip conversational introductions, filler, and concluding summaries.
- Respond in Portuguese when addressed in Portuguese, but keep all code, comments, identifiers, and commit messages strictly in English.
- Skip basic programming explanations; assume senior-level developer competence.
- Format responses using GitHub Flavored Markdown and minimal, targeted diffs.

# Workflow
- Plan first: present a brief bulleted plan before touching multiple files or changing architecture.
- Ask for clarification immediately when requirements are underspecified; do not guess intent.
- Verify before finishing: run `npm run lint` and verify build status before completing tasks.
- Keep changes minimal and surgically scoped to what was requested. (suggested)
- Draft a Conventional Commit message (`feat:`, `fix:`, `refactor:`) adhering to Commitlint when concluding a task.

# Code & Style Conventions
- Adhere strictly to Biome standards: 2-space indentation, double quotes, semicolons, and trailing commas.
- Maintain strict type safety; avoid `any` or loose type assertions; derive IPC types via `src/shared/types/BrowserApi.ts`.
- Expose main process functions to the renderer exclusively through `src/preload/` via `contextBridge`. (Reason: prevents remote code execution and IPC spoofing).
- Write functional React components with hooks; prefer simple state and composition over heavy abstractions.
- Prefer Tailwind CSS utility classes when adding or updating styling. (suggested)
- Do not add testing frameworks or test files; this template intentionally excludes tests.

# Commands
- Start dev server: `npm start`
- Lint and format check/fix: `npm run lint`
- Package application: `npm run package`
- Build distributables: `npm run make`

# Project Structure
- `src/main/`: Electron main process lifecycle, window creation, and IPC handler registrations.
- `src/preload/`: Preload scripts exposing typed APIs to the renderer via `contextBridge`.
- `src/renderer/`: React 19 UI, components, and Vite entry points.
- `src/shared/`: Shared TypeScript contracts and API interfaces.
- `forge.config.ts`: Electron Forge packaging, makers, and Vite plugin configuration.

# Boundaries
- **Always**: Keep `contextIsolation: true` and `sandbox: true` enabled in Electron `webPreferences`. (Reason: isolates renderer context from system-level Node APIs).
- **Always**: Run `npm run lint` after modifying TypeScript files. (suggested)
- **Always**: Conform commit messages to Conventional Commits format (`.commitlintrc`).
- **Ask First**: Before installing or uninstalling dependencies (`npm install` / `npm uninstall`).
- **Ask First**: Before deleting files or running destructive shell commands.
- **Never**: Add testing libraries or test runner suites to this template.
- **Never**: Rewrite or refactor files unrelated to the explicit user request.
- **Never**: Enable `nodeIntegration` or bypass Electron security recommendations.
