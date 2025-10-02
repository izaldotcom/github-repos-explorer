# GitHub Repositories Explorer

A small React + TypeScript app that lets you search up to 5 GitHub users by username and, on click, list **all** repositories for the selected user (by following pagination).

## ✨ Features

- React + TypeScript (Vite)
- Search up to 5 matching users via GitHub Search API
- Show **all** repositories (no explicit limit) for selected user
- Good UX: loading states, keyboard support (Enter to search), accessible markup
- Error handling with friendly messages
- Mobile‑friendly layout
- Optional GitHub token support to avoid rate‑limits

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173/

### Environment (optional)

Create a `.env` from `.env.example` if you want to use a token:

```bash
VITE_GITHUB_TOKEN=ghp_xxx   # Personal Access Token (no scopes needed for public data)
# For GitHub Pages (see below), you can set:
# BASE_PATH=/your-repo-name/
```

## 🧪 Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview dist locally
- `npm run deploy` – deploy `dist` to GitHub Pages (requires branch setup; see below)

## 🔗 GitHub API

- Search users: `GET /search/users?q={query}&per_page=5`
- Repos: `GET /users/{username}/repos?per_page=100&page={n}&sort=updated`
- Follows pagination with the `Link` header until there are no more pages (up to 1000 repos for safety).

## 📦 Deployment (GitHub Pages)

1. Create a new GitHub repository (public).
2. Push this project to the repo.
3. **Set base path**:
   - If your repository name is `github-repos-explorer`, set an env var before building:
     ```bash
     export BASE_PATH=/github-repos-explorer/
     ```
     Or edit `vite.config.ts` and set `base: '/github-repos-explorer/'`.
4. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```
5. In GitHub settings → Pages, ensure the source is set to `gh-pages` branch.

> Tip: Alternatively deploy on Vercel/Netlify without changing base (fastest).

## ✅ Notes

- Errors and rate‑limit messages are surfaced to the UI.
- Keyboard: press **Enter** in the search box to execute an immediate search.
- Use token if you hit anonymous API rate limits.

---

© 2025 GitHub Repositories Explorer
