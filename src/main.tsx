import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/fonts.css";
import { SmoothScrollProvider } from "./layouts/SmoothScrollProvider.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
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
