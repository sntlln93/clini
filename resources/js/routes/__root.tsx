import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/lib/hooks/useAuth";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React from "react";
import { z } from "zod";

type AuthContext = ReturnType<typeof useAuth>;

const redirectSchema = z.object({
    redirect: z.string().optional(),
});

const TanStackRouterDevtools =
    process.env.NODE_ENV === "production"
        ? () => null // Render nothing in production
        : React.lazy(() =>
              import("@tanstack/router-devtools").then((res) => ({
                  default: res.TanStackRouterDevtools,
              })),
          );

export const Route = createRootRouteWithContext<{
    auth: AuthContext;
    queryClient: QueryClient;
}>()({
    component: () => (
        <>
            <Outlet />
            <Toaster />
            <React.Suspense>
                <TanStackRouterDevtools />
            </React.Suspense>
        </>
    ),
    validateSearch: redirectSchema,
});
