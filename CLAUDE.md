# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (HTTPS on spazyo.test:5173)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

The dev server uses a custom local domain. Add `spazyo.test` to `/etc/hosts` pointing to `127.0.0.1` for local development.

## Architecture

**React + Vite app** — JavaScript (not TypeScript), Tailwind CSS v4, React Router v7, Axios.

### Multi-tenant subdomain routing

`App.jsx` reads `window.location.hostname` to determine which UI to render:
- `admin.spazyo.xyz` → Admin dashboard
- `{storename}.spazyo.xyz` → Store catalog frontend
- `spazyo.xyz` / root → Landing page (`Index`)

### API layer (`src/api/`)

- `axiosConfig.jsx` — Axios instance pointed at `https://api.spazyo.xyz`, with a request interceptor that reads `localStorage.getItem('token')` and injects `Authorization: Bearer {token}`.
- `http.jsx` — Thin wrappers: `get`, `post`, `patch`, `del`. All API calls go through these.
- `auth.jsx` — Login helpers that store `token` and `subdomain` in localStorage.

### Authentication flow (3 steps in `LogIn.jsx`)

1. Email + password → `POST /auth/login` (or Google OAuth → `POST /auth/google`)
2. Email verification code (6-digit) → `POST /auth/email/verify`
3. New users create a store (name, subdomain, email, optional geolocation) → `POST /stores`

No token in localStorage → redirected to login. Google OAuth uses `VITE_GOOGLE_CLIENT_ID` env var via `@react-oauth/google`.

### State management

No Redux or Context — UI state (cart open, mobile menu) is passed as props from page components down to children. Auth state lives in localStorage.

## Environment

Only one env var required:
```
VITE_GOOGLE_CLIENT_ID=...
```
