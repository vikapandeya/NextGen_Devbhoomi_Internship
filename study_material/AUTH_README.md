# Study Material — Authentication

## Overview
Study material pages are now protected by a **client-side login gate**. This is a simple, non-secure protection meant for basic access control.

## Default Credentials
- **User ID:** `intern`
- **Password:** `intern2026`

## Warning
⚠️ **Do NOT use this for sensitive data.** This is client-side authentication and can be bypassed by inspecting browser DevTools or viewing page source.

## How It Works
1. **auth.js** — Manages session storage (sessionStorage), login form handling, and redirect logic.
2. **login.html** — A simple login page that stores auth state in sessionStorage.
3. **Protected pages** — Each career_roadmap.html includes auth.js and calls `NGDF.requireAuth()` on load to check authentication before rendering content.

## Files
- `auth.js` — Core auth logic
- `login.html` — Login form page
- `index.html` — Study material portal (requires auth)
- `*/career_roadmap.html` — All career roadmaps require auth (9 domains)

## Logout
Users can close the browser tab/session; the sessionStorage will be cleared. No explicit logout button is provided.

## For Production
- Replace client-side auth with **HTTP Basic Auth**, **Netlify Identity**, or a **server-side session** (Node/Express + database).
- Store credentials securely (never in client code).
- Use HTTPS to protect credentials in transit.

## Modifying Credentials
To change the default login ID and password, edit `auth.js`:

```javascript
const NGDF_CREDENTIALS = { id: 'your_id', pwd: 'your_password' };
```

Then push the changes to your repository.
