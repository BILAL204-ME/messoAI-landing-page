# Buildoria Landing Page

A modern, high-performance landing page for Buildoria, built with React, Vite, and Tailwind CSS. The project features full internationalization (i18n) support with Right-to-Left (RTL) layout capabilities.

## Project Overview

- **Purpose:** A multilingual landing page showcasing Buildoria's features, AI builder, developer marketplace, and pricing.
- **Core Technologies:** React 18, Vite 5, TypeScript, Tailwind CSS 3, shadcn-ui.
- **Internationalization:** Powered by `i18next`, supporting Arabic (default, RTL), French, and English.
- **Animations:** Integrated with `framer-motion` for smooth UI transitions.
- **State Management:** Uses `TanStack Query` (React Query) for efficient data fetching and caching.

## Building and Running

### Development
```sh
npm run dev
```
Starts the development server on `http://localhost:8080`.

### Production Build
```sh
npm run build
```
Builds the application for production in the `dist` directory.

### Testing
- **Unit/Integration Tests:** `npm test` or `npm run test:watch` (Vitest).
- **E2E Tests:** `npx playwright test` (Playwright).

### Linting
```sh
npm run lint
```
Runs ESLint to check for code quality issues.

## Development Conventions

- **Component Structure:** 
  - `src/components/ui/`: Contains reusable shadcn-ui primitives.
  - `src/components/`: Contains section-specific components (e.g., `HeroSection.tsx`, `Navbar.tsx`).
- **Styling:** 
  - Follows Tailwind CSS utility-first approach.
  - Custom themes and variables are defined in `tailwind.config.ts` and `src/index.css`.
  - Supports dark mode via the `class` strategy.
- **Internationalization:**
  - Translation keys are stored in `src/i18n/ar.json`, `src/i18n/fr.json`, and `src/i18n/en.json`.
  - Use the `useTranslation` hook from `react-i18next` for UI text.
  - Ensure RTL compatibility by checking `i18n.language === "ar"`.
- **Aliases:**
  - Use `@/` as an alias for the `src` directory (e.g., `import { Button } from "@/components/ui/button"`).
- **Testing:**
  - Aim for high coverage of critical UI components and business logic using Vitest.
  - Use Playwright for critical path E2E testing.

## Project Structure

- `src/assets/`: Static assets like images and logos.
- `src/components/`: Reusable React components.
- `src/hooks/`: Custom React hooks (e.g., `use-mobile.tsx`).
- `src/i18n/`: Internationalization configuration and translation files.
- `src/lib/`: Shared utility functions (e.g., `utils.ts` for Tailwind merge).
- `src/pages/`: Main application routes (e.g., `Index.tsx`).
- `src/test/`: Test configuration and setup files.
