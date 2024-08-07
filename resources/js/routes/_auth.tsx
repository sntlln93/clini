import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
    component: () => <Outlet />,
    beforeLoad: async ({ search, context }) => {
        if (context.auth.isAuthenticated()) {
            throw redirect({
                to: search.redirect ?? "/",
            });
        }
    },
});
