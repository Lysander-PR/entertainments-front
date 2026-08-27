import { useAuthStore } from "@/auth/store/auth.store";
import { TOKEN_STORAGE } from "@/shared/types/consts/token-storage.const";

const TOKEN_PARAM = "token";
const ENTERTAINMENT_PARAM = "entertainment";
const ID_PARAM = "id";

interface FormUrlParams {
  entertainment?: string;
  id?: string;
}

const getFormOrigin = (): string | null => {
  const formUrl = import.meta.env.VITE_FORM_URL;

  if (!formUrl) {
    console.error("VITE_FORM_URL is not configured: cannot reach the form app.");
    return null;
  }

  return formUrl;
};

/**
 * The form app lives on a different origin, so it cannot read our
 * `localStorage`. The session is handed off through the URL fragment, which is
 * never sent to the server: it stays out of access logs and of the `Referer`
 * header. The form app stores the token and strips the fragment on boot.
 */
const attachToken = (url: URL): string => {
  const token = useAuthStore.getState().token ?? localStorage.getItem(TOKEN_STORAGE);

  if (token) {
    url.hash = new URLSearchParams({ [TOKEN_PARAM]: token }).toString();
  }

  return url.toString();
};

export const buildFormUrl = ({ entertainment, id }: FormUrlParams = {}): string | null => {
  const formUrl = getFormOrigin();

  if (!formUrl) return null;

  const url = new URL(formUrl);

  if (entertainment) url.searchParams.set(ENTERTAINMENT_PARAM, entertainment);
  if (id) url.searchParams.set(ID_PARAM, id);

  return attachToken(url);
};

/**
 * Resolves the `?redirect=` the form app sends when it has no session, so the
 * user lands back on the exact page that was requested. The target is checked
 * against `VITE_FORM_URL` to avoid turning the login into an open redirect.
 */
export const resolveHandoffRedirect = (redirect: string | null): string | null => {
  const formUrl = getFormOrigin();

  if (!redirect || !formUrl) return null;

  try {
    const target = new URL(redirect);

    if (target.origin !== new URL(formUrl).origin) return null;

    return attachToken(target);
  } catch {
    return null;
  }
};
