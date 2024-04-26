import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAtomValue } from "jotai";
import { authAtom } from "./shared/atoms/auth";

// Import the generated route tree

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {
        isAuthenticated: undefined!,
    },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <AuthWrapper />
        </StrictMode>,
    );
}

function AuthWrapper() {
    const isAuthenticated = useAtomValue(authAtom);

    return <RouterProvider router={router} context={{ isAuthenticated }} />;
}
