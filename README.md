# React Spreadsheet Prototype

## Live URL : https://himanshu-intern-assignment.netlify.app/

This project is a static, front-end-only React prototype that visually replicates a spreadsheet view, designed to match a provided screenshot and Figma design.

## Features

* **Pixel-Perfect UI:** Closely matches the provided Figma design and screenshot for a spreadsheet-like experience.
* **React 18 & TypeScript:** Built with modern React and typed for robust development.
* **Tailwind CSS v4.1 (Canary):** Utilizes the latest utility-first CSS framework for efficient and highly customizable styling, integrated via the new `@tailwindcss/vite` plugin.
* **@tanstack/react-table v8:** Employs a headless table library for flexible and performant grid rendering, allowing full control over the UI.
* **Interactive UI:** All buttons and tabs log their actions to the console (as per assignment requirements), ensuring no "dead UI".
* **Code Quality:** Enforces high code standards with ESLint and Prettier for linting, formatting, and type-checking via TypeScript strict mode.

## Tech Stack

* **Framework:** React 18
* **Language:** TypeScript (strict mode)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4.1 (Canary)
* **Table Component:** `@tanstack/react-table` v8

## Setup and Running the Project

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_GITHUB_REPO_URL_HERE]
    cd spreadsheet-app # Or whatever your project folder name is
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

In the project directory, you can run:

* **`npm run dev`**: Runs the app in development mode.
* **`npm run build`**: Builds the app for production to the `dist` folder.
* **`npm run lint`**: Runs ESLint to check for code quality issues.
* **`npm run lint:fix`**: Runs ESLint and attempts to fix issues automatically.
* **`npm run format`**: Formats code using Prettier.
* **`npm run type-check`**: Runs TypeScript compiler to check for type errors.

## Trade-offs and Future Improvements (Optional Section)

* **Component Structure:** For a larger, production-grade application, the `App.tsx` file would be refactored into smaller, more modular, and reusable components (e.g., `Header.tsx`, `TableGrid.tsx`, `StatusPill.tsx`, etc.) to improve maintainability and readability.
* **Dummy Data:** The table data is currently hardcoded for prototyping. In a real application, this would be fetched from an API.
* **Accessibility (a11y):** While basic HTML semantics are used, further accessibility considerations (e.g., ARIA attributes for complex interactions) could be implemented for a production application.
* **Stretch Goals:**
    * **Keyboard Navigation:** Implementing full keyboard navigation (arrow keys to move between cells, enter to edit) within the grid would enhance the Excel-like experience.
    * **Column Resizing/Hiding:** Adding functionality to dynamically resize or hide columns.
    * **Icon Library:** Replacing inline SVGs/emojis with a dedicated icon library (e.g., Heroicons, Font Awesome) for better management and consistency.

---
