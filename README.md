# React Mini Project

**Live Demo:** [https://test-mini-project.vercel.app/](https://test-mini-project.vercel.app/)

A product management dashboard built with React 19 and Vite, featuring authentication, product CRUD, and a clean layout shell.

## Stack

- **React 19** + **Vite** — UI and dev server
- **React Router v7** — client-side routing
- **Zustand 5** — global state (auth + products), auth persisted to `localStorage`
- **Tailwind CSS v4** — utility-first styling via PostCSS
- **Axios** — HTTP client
- **dummyjson.com** — public REST API (no local server required)

## Features

- JWT-based login via `dummyjson.com/auth/login`
- Protected routes — redirects to `/login` if unauthenticated
- Product list with pagination and search
- Add / edit / delete products
- Fixed sidebar + navbar layout shell

## Routes

| Path | Description |
|------|-------------|
| `/login` | Public login page |
| `/` | Home page (protected) |
| `/products` | Product list (protected) |
| `/products/add` | Add product (protected) |
| `/products/:id` | Product detail (protected) |
| `/products/:id/edit` | Edit product (protected) |

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint
```
