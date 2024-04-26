import {
    createRootRouteWithContext,
    Link,
    Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

type GlobalSearchParams = {
    redirect?: string;
};

type AuthContext = {
    isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<AuthContext>()({
    component: Layout,
    validateSearch: (search: Record<string, unknown>): GlobalSearchParams => {
        return {
            redirect: search.redirect as string,
        };
    },
});

function Layout() {
    return (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{" "}
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}
