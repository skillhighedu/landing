import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/fonts.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "./layouts/SmoothScrollProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import OfflineAlert from "@/components/common/OfflineAlert";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

function GlobalToaster() {
  return createPortal(
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      duration={3000}
      className="font-bricolage"
      style={{
        zIndex: 20000,
      }}
      toastOptions={{
        style: {
          zIndex: 20000,
        },
      }}
    />,
    document.body,
  );
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />

    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider delayDuration={150}>
          <SmoothScrollProvider>
            {/* 🌐 GLOBAL OFFLINE ALERT */}
            <OfflineAlert />

            <GlobalToaster />

            <App />
          </SmoothScrollProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
