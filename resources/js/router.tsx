import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./lib/hooks/useAuth";
import queryClient from "./queryClient";

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {
        auth: undefined!,
        queryClient,
    },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Render the app
export function Router() {
    const auth = useAuth();

    return <RouterProvider router={router} context={{ auth }} />;
}
