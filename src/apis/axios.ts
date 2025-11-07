import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => config);

let isRefreshing = false;
let queued: Array<() => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const status = err.response?.status;
    const original = err.config as
      | (typeof err.config & { _retried?: boolean })
      | undefined;

    if (status === 401 && original && !original._retried) {
      original._retried = true;

      if (isRefreshing) {
        await new Promise<void>((resolve) => queued.push(resolve));
        return api.request(original);
      }

      isRefreshing = true;
      try {
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken) throw new Error("No refresh cookie");

        const resp = await axios.post(
          `${BASE_URL}/api/user/token/refresh/`,
          { refresh: refreshToken },
          { withCredentials: true },
        );

        if (resp.status === 200 || resp.status === 201) {
          queued.forEach((fn) => fn());
          queued = [];
          return api.request(original);
        }

        throw new Error(`Unexpected refresh status: ${resp.status}`);
      } catch (refreshErr) {
        console.error("토큰 갱신 실패:", refreshErr);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userProfile");
        localStorage.setItem("isFirstLogin", "false");
        window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err instanceof Error ? err : new Error(String(err)));
  },
);
