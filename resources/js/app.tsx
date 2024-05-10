import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { rootRouter } from "./pages/router";

const queryClient = new QueryClient();

const router = createBrowserRouter(rootRouter);

// Render the app
function Router() {
    return <RouterProvider router={router} />;
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Router />
                </TooltipProvider>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-left"
                />
            </QueryClientProvider>
        </StrictMode>
    );
}
