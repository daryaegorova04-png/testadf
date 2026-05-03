# TestDaF Studio — Deployment Guide

This is your interactive TestDaF preparation website built from your project materials.

## 🚀 Quick deploy to Vercel (easiest, free, gives you a real URL)

### Step 1 — Make a GitHub account (2 min)
1. Go to **https://github.com**
2. Click **Sign up** in the top right
3. Use any email + password. Verify your email.

### Step 2 — Upload this folder to GitHub (3 min)
1. While logged in, click the **+** icon (top right) → **New repository**
2. Name it: `testdaf-studio` (any name works)
3. Leave everything else as default. Click **Create repository**.
4. On the next page you'll see "uploading an existing file" — click that link.
5. **Drag this entire folder** (everything inside `testdaf-website/`) into the upload area.
   - On Mac: open Finder, select all files (Cmd+A), drag them in.
   - On Windows: open File Explorer, select all (Ctrl+A), drag them in.
   - Make sure to drag the FILES, not the parent folder.
6. Scroll down, click **Commit changes**.

### Step 3 — Connect to Vercel (3 min)
1. Go to **https://vercel.com**
2. Click **Sign Up** → choose **Continue with GitHub** (easiest — it links them automatically)
3. Approve permissions when GitHub asks.
4. On the Vercel dashboard, click **Add New** → **Project**
5. Find your `testdaf-studio` repository in the list. Click **Import**.
6. Vercel will auto-detect everything (it knows it's a Vite + React project).
7. Don't change any settings. Just click **Deploy**.
8. Wait ~60 seconds while it builds.

### Step 4 — Get your URL 🎉
Vercel shows you a link like `testdaf-studio-xyz.vercel.app`. **That's your website.** Bookmark it. Open on your phone. Share with friends.

Every time you (or I, helping you) update the code on GitHub, Vercel will automatically rebuild the site within 60 seconds. No manual work.

---

## 🏃 Even faster: Run it locally first (optional)

If you want to test the website on your own computer before deploying:

1. Install **Node.js** from https://nodejs.org (download the LTS version, install with defaults)
2. Open a terminal/command prompt in this folder
3. Run: `npm install` (downloads dependencies, ~1 min)
4. Run: `npm run dev`
5. Open http://localhost:5173 in your browser

---

## What's in this folder

- `src/App.jsx` — the entire TestDaF Studio app (your vocab, quizzes, all the content)
- `src/main.jsx` — boots up React
- `src/index.css` — styling base
- `index.html` — the HTML page
- `package.json` — list of libraries the project uses
- `vite.config.js` — build tool config
- `tailwind.config.js` + `postcss.config.js` — styling config

## Editing your vocabulary later

Open `src/App.jsx` and find the `VOCAB` array near the top. Each word looks like:

```js
{ de: 'feststellen', en: 'to determine', ex: 'Forscher haben...', topic: 'Akademisch', difficulty: 1 },
```

Add new lines following the same pattern. Save. If you've deployed via Vercel, push the change to GitHub and Vercel rebuilds automatically.
