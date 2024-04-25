import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.tsx"],
            refresh: true,
        }),
        react(),
        TanStackRouterVite({
            routesDirectory: "./resources/js/routes",
            generatedRouteTree: "./resources/js/routeTree.gen.ts",
        }),
    ],
});
