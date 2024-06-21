import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
    component: () => <Outlet />,
    beforeLoad: async ({ search, context }) => {
        if (context.auth.isAuthenticated()) {
            throw redirect({
                to: search.redirect ?? "/",
            });
        }
    },
});
