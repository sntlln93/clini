import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/lib/hooks/useAuth";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { z } from "zod";

type AuthContext = ReturnType<typeof useAuth>;

const redirectSchema = z.object({
    redirect: z.string().optional(),
});

export const Route = createRootRouteWithContext<{
    auth: AuthContext;
    queryClient: QueryClient;
}>()({
    component: () => (
        <>
            <Outlet />
            <Toaster />
            <TanStackRouterDevtools />
        </>
    ),
    validateSearch: redirectSchema,
});
