import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/fonts.css";
import { SmoothScrollProvider } from "./layouts/SmoothScrollProvider.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes fresh
      gcTime: 1000 * 60 * 10,         // keep in cache 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <SmoothScrollProvider>
        <Toaster
          position="bottom-right" // top-right, top-center, bottom-left, etc.
          richColors // enables vibrant colors for success/error/warning
          closeButton // adds a close button to each toast
          duration={3000} // default auto-close time
          className="font-bricolage "
        />
        <App />
      </SmoothScrollProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
