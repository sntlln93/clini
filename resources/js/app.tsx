import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Router } from "./router";
import queryClient from "./queryClient";
import { z } from "zod";
import { validationMessages } from "@/lib/consts/validation";

// Define los mensajes de error en español
z.setErrorMap(validationMessages);

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
        </StrictMode>,
    );
}
