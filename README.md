# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Cross-domain authentication handoff

The form app (create/edit) runs on a different origin (`VITE_FORM_URL`), so it
cannot read our `localStorage` token (`token-entertainment`). The session is
handed over through the URL instead.

**Going to the form** — `buildFormUrl()`
(`src/shared/utils/form-handoff.util.ts`) builds
`VITE_FORM_URL?entertainment=<category>&id=<id>#token=<jwt>`. The category and
id are omitted when creating. Used by `Header.goToForm` (Add) and
`Card.handleEdit` (Edit).

**Coming back** — if the form app has no session it sends the user to
`/signature?redirect=<form url>`. After login or registration, `useAuthRedirect`
passes it to `resolveHandoffRedirect()`, which **rejects any origin other than
`VITE_FORM_URL`** (no open redirect), re-attaches the token and calls
`location.replace()`. Without a valid `redirect`, the user lands on `/`.

| Part | Name | Direction | Meaning |
| --- | --- | --- | --- |
| Query | `entertainment` | → form | `movie`, `book` or `album` |
| Query | `id` | → form | Item to edit; absent means "create" |
| Fragment | `token` | → form | JWT access token |
| Query | `redirect` | → this app | Absolute form-app URL to return to |

The token goes in the **fragment** because browsers never send it to the server:
it stays out of access logs and of the `Referer` header. In exchange, the form
app must read it and strip it on boot:

```js
const token = new URLSearchParams(location.hash.slice(1)).get("token");
if (token) {
  persist(token);
  history.replaceState(null, "", location.pathname + location.search);
}
```

Notes and limits:

- `CheckAuthProvider` refreshes the token every 50 s and on window focus, so the
  handed-off token is whichever was current at click time. A `401` on any
  non-`auth/` request logs out and redirects to `/signature`.
- Signing out here does **not** revoke the token the form app already holds —
  that is the API's job.
- The token lives in `localStorage`, so XSS on either origin compromises it.
- `VITE_FORM_URL` is baked in at build time: one build per environment. If it is
  unset, Add/Edit become no-ops and log an error.

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
