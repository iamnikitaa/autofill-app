# Autofill Input Component - React & TypeScript

This project implements an Autofill Input component using React (with Vite) and TypeScript.

## Features

-   Filters a predefined list of items based on user input.
-   Displays filtered items as a dropdown list.
-   Implements debouncing (300ms) to optimize filtering performance.
-   Highlights the matched substring in bold within the suggestions.
-   Utilizes an LRU (Least Recently Used) Cache (stores up to 10 items) for optimized performance on repeated queries.

## Tech Stack

-   React
-   Vite
-   TypeScript
-   CSS (for basic styling)

## Setup and Installation

1.  Clone the repository:
    ```bash
    git clone <YOUR_GITHUB_REPO_URL.git>
    cd autofill-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## How it Works

-   **Data:** A predefined list of items is stored in `src/data.ts`.
-   **LRU Cache:** A custom LRU cache (`src/utils/lruCache.ts`) is used to store results of previous searches. It has a capacity of 10 items.
-   **Debouncing:** A custom debounce function (`src/utils/debounce.ts`) delays the filtering logic by 300ms after the user stops typing.
-   **Filtering & Highlighting:** The `AutofillInput` component (`src/components/AutofillInput.tsx`) handles user input, performs filtering, interacts with the cache, and renders suggestions with the matched text highlighted.
-   **Styling:** Basic CSS is provided in `src/components/AutofillInput.css`.

## To Test

-   Type in the input field (e.g., "react", "next js", "typescript").
-   Observe the suggestions dropdown.
-   Check the browser's developer console for "Cache hit" or "Cache miss" messages to see the LRU cache in action.
