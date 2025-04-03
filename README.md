# Studio Ghibli Encyclopedia - Project Roadmap

A detailed checklist for building the Studio Ghibli Encyclopedia project using Next.js.

## Phase 1: Project Setup & Foundation (Est. 1-2 Hours)

- [ ] **Initialize Next.js Project:**
    - [x] Open terminal.
    - [x] Run `npx create-next-app@latest 008-studio-ghibli-encyclopedia`.
    - [x] Select: TypeScript (`Yes`), ESLint (`Yes`), Tailwind CSS (`Yes`), `src/` directory (`Yes`), App Router (`Yes`), Customize default import alias (`No`).
    - [x] Navigate into the project: `cd studio-ghibli-encyclopedia`.
- [x] **Project Structure Refinement:**
    - [x] Create `src/components/` folder.
        - [x] Create `components/ui/` subfolder.
        - [x] Create `components/layout/` subfolder.
        - [x] Create `components/shared/` subfolder.
    - [x] Create `src/lib/` folder.
    - [x] Create `src/types/` folder.
    - [x] *(Optional)* Create `src/hooks/` folder.
    - [x] Create `src/app/movies/` folder.
    - [x] Create `src/app/characters/` folder.
    - [x] Create `src/app/locations/` folder.
    - [x] *(Optional)* Create folders for `species`, `vehicles`.
- [ ] **Version Control Setup:**
    - [x] Initialize Git: `git init`.
    - [x] Verify `.gitignore` exists and is appropriate.
    - [x] Make initial commit: `git add . && git commit -m "Initial project setup with Next.js, TypeScript, Tailwind"`.
    - [x] Create GitHub repository and push initial commit.

## Phase 2: API Integration & Data Modeling (Est. 2-3 Hours)

- [ ] **Identify API:** Confirm usage of `https://ghibliapi.vercel.app/`.
- [ ] **Define Types:**
    - [ ] Create `src/types/index.ts`.
    - [ ] Define TypeScript interface `Movie`.
    - [ ] Define TypeScript interface `Person`.
    - [ ] Define TypeScript interface `Location`.
    - [ ] Define TypeScript interface `Species`.
    - [ ] Define TypeScript interface `Vehicle`.
- [ ] **Create API Client:**
    - [ ] Create `src/lib/api.ts`.
    - [ ] Define base API URL constant.
    - [ ] Implement `getAllMovies(): Promise<Movie[]>`.
    - [ ] Implement `getMovieById(id: string): Promise<Movie>`.
    - [ ] Implement `getAllPeople(): Promise<Person[]>`.
    - [ ] Implement `getPersonById(id: string): Promise<Person>`.
    - [ ] Implement similar functions for Locations, Species, Vehicles.
    - [ ] Add basic error handling (check response status).

## Phase 3: Core Layout & UI Components (Est. 4-6 Hours)

- [ ] **Global Layout (`src/app/layout.tsx`):**
    - [ ] Set up root `<html>`, `<body>`.
    - [ ] Integrate Navbar and Footer components.
    - [ ] Define main content area (`{children}`).
    - [ ] Apply base Tailwind styles, fonts (using `next/font`).
- [ ] **Navbar (`src/components/layout/Navbar.tsx`):**
    - [ ] Create responsive navigation bar component.
    - [ ] Use Next.js `<Link>` for navigation (`/`, `/movies`, `/characters`, etc.).
    - [ ] Style with Tailwind CSS.
- [ ] **Footer (`src/components/layout/Footer.tsx`):**
    - [ ] Create simple footer component.
- [ ] **Reusable UI (`src/components/ui/`):**
    - [ ] Create `Card.tsx` component.
    - [ ] Create `Button.tsx` component.
    - [ ] Create `LoadingSpinner.tsx` component.
    - [ ] Create `ErrorMessage.tsx` component.
- [ ] **Shared Components (`src/components/shared/`):**
    - [ ] Create `ItemGrid.tsx` component.
    - [ ] Create `SearchBar.tsx` component.

## Phase 4: List Pages Implementation (Est. 5-7 Hours)

- [ ] **Movies List (`src/app/movies/page.tsx`):**
    - [ ] Mark as Client Component (`'use client'`).
    - [ ] Implement state for movies, loading, error, search term.
    - [ ] Fetch movies using `getAllMovies()` in `useEffect`.
    - [ ] Implement client-side filtering based on search term.
    - [ ] Render `LoadingSpinner` conditionally.
    - [ ] Render `ErrorMessage` conditionally.
    - [ ] Render `SearchBar` and connect to state.
    - [ ] Render `ItemGrid` with filtered movies, linking cards to detail pages.
- [ ] **Characters List (`src/app/characters/page.tsx`):**
    - [ ] Implement similar structure as Movies List.
    - [ ] Fetch and display `Person` data.
- [ ] **Locations List (`src/app/locations/page.tsx`):**
    - [ ] Implement similar structure as Movies List.
    - [ ] Fetch and display `Location` data.

## Phase 5: Detail Pages Implementation (Est. 4-6 Hours)

- [ ] **Movie Detail (`src/app/movies/[id]/page.tsx`):**
    - [ ] Keep as Server Component.
    - [ ] Access movie `id` from `params`.
    - [ ] Fetch movie data using `getMovieById(params.id)`.
    - [ ] Handle potential 'Not Found' errors (e.g., using `notFound()`).
    - [ ] Display movie details (title, description, director, `next/image`, etc.).
    - [ ] *(Optional Enhancement)* Fetch and display related item details (people, locations).
    - [ ] Link related items to their detail pages.
- [ ] **Character Detail (`src/app/characters/[id]/page.tsx`):**
    - [ ] Implement similar structure as Movie Detail.
    - [ ] Fetch and display `Person` data based on `id`.
- [ ] **Location Detail (`src/app/locations/[id]/page.tsx`):**
    - [ ] Implement similar structure as Movie Detail.
    - [ ] Fetch and display `Location` data based on `id`.

## Phase 6: Styling, Responsiveness & Accessibility (Est. 3-5 Hours)

- [ ] **Refine Tailwind Styling:** Ensure consistency across all pages/components.
- [ ] **Responsiveness:** Test and adjust layout/styles for various screen sizes (mobile, tablet, desktop).
- [ ] **Accessibility (A11y):**
    - [ ] Use semantic HTML.
    - [ ] Ensure keyboard navigation and focus states.
    - [ ] Add `alt` text to all images.
    - [ ] Use ARIA attributes where necessary.

## Phase 7: Testing & Optimization (Est. 2-4 Hours - Optional)

- [ ] **Basic Testing:**
    - [ ] *(Optional)* Write unit tests for API utils.
    - [ ] *(Optional)* Write component tests for key UI elements.
- [ ] **Image Optimization:** Verify correct usage of `next/image`.
- [ ] **Loading States:** Confirm clear loading indicators exist for all data fetching.
- [ ] **Error Handling:** Verify user-friendly error messages for API failures and edge cases.

## Phase 8: Portfolio Prep & Deployment (Est. 2-4 Hours)

- [ ] **Code Cleanup:** Remove logs, unused code; run linter/formatter.
- [ ] **Environment Variables:** Ensure no secrets are committed; add `.env.local` to `.gitignore`.
- [ ] **Write `README.md` (Refine this file):**
    - [ ] Add Project Title.
    - [ ] Add Link to Live Demo (post-deployment).
    - [ ] Add Brief Description.
    - [ ] Add Key Features list.
    - [ ] Add Screenshots/GIF.
    - [ ] Add Technology Stack list.
    - [ ] Add How to Run Locally instructions.
    - [ ] *(Optional)* Add Challenges & Learnings section.
- [ ] **Deployment:**
    - [ ] Push final code to GitHub.
    - [ ] Deploy using Vercel (or preferred platform).
    - [ ] Test the live deployment URL.
- [ ] **Add to Portfolio:**
    - [ ] Create project entry on your personal portfolio site.
    - [ ] Add description, screenshots/GIFs.
    - [ ] Link to Live Demo.
    - [ ] Link to Source Code (GitHub).# studio-ghibli-encyclopedia
