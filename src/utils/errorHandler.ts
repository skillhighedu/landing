import axios from "axios";
import { toast } from "sonner";

const API_ERROR_TOAST_ID = "api-error";

type ApiErrorItem = {
  message?: unknown;
  msg?: unknown;
  error?: unknown;
};

const getText = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const getErrorItemMessage = (error: unknown): string | undefined => {
  if (typeof error === "string") {
    return getText(error);
  }

  if (error && typeof error === "object") {
    const item = error as ApiErrorItem;
    return getText(item.message) || getText(item.msg) || getText(item.error);
  }

  return undefined;
};

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    const errors = data?.errors;
    let message = getText(data?.message);

    if (Array.isArray(errors)) {
      const messages = errors
        .map(getErrorItemMessage)
        .filter((value): value is string => Boolean(value));

      if (messages.length) {
        message = messages.join("\n");
      }
    }

    const fallbackMessage = message || "An error occurred";
    if (error.response?.status === 403) {
      return fallbackMessage;
    }

    toast.error(fallbackMessage, { id: API_ERROR_TOAST_ID });

    return fallbackMessage;
  }
  return "Unexpected error";
};
