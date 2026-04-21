import axios from "axios";
import { toast } from "sonner";
import config from "./config";
import {
  AUTH_FORBIDDEN_EVENT,
  type AuthForbiddenEventDetail,
} from "@/constants/authRedirect";

const FORBIDDEN_TOAST_ID = "auth-forbidden";
const FORBIDDEN_REDIRECT_DELAY_MS = 2500;
let forbiddenRedirectQueued = false;

function getForbiddenMessage(data: unknown) {
  if (data && typeof data === "object" && "message" in data) {
    const message = (data as { message?: unknown }).message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return "Your session has expired. Please login again.";
}

function handleForbiddenResponse(error: unknown) {
  if (forbiddenRedirectQueued) {
    return;
  }

  const data =
    error && typeof error === "object" && "response" in error
      ? (error as { response?: { data?: unknown } }).response?.data
      : undefined;

  toast.error(getForbiddenMessage(data), {
    id: FORBIDDEN_TOAST_ID,
    duration: 4000,
  });

  forbiddenRedirectQueued = true;

  window.dispatchEvent(
    new CustomEvent<AuthForbiddenEventDetail>(AUTH_FORBIDDEN_EVENT, {
      detail: {
        to: "/login",
        delayMs: FORBIDDEN_REDIRECT_DELAY_MS,
      },
    }),
  );

  window.setTimeout(() => {
    forbiddenRedirectQueued = false;
  }, FORBIDDEN_REDIRECT_DELAY_MS + 1000);
}

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true, // send cookies automatically
});

// Request interceptor (offline check)
api.interceptors.request.use(
  async (config) => {
    if (!navigator.onLine) {
      return Promise.reject({ message: "No internet connection", isNetworkError: true });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      handleForbiddenResponse(error);
    }
    return Promise.reject(error);
  }
);

export default api;
