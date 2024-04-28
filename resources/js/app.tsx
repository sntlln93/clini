import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts/root.layout";
import { LoginPage } from "./pages/login";
import { WelcomePage } from "./pages/welcome";
import { Protected, Public } from "./components/AuthRoute";
import { NotFoundPage } from "./pages/404";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Router />
                </TooltipProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StrictMode>
    );
}
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route
                        path="login"
                        element={
                            <Public>
                                <LoginPage />
                            </Public>
                        }
                    />

                    <Route
                        index
                        element={
                            <Protected>
                                <WelcomePage />
                            </Protected>
                        }
                    />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
