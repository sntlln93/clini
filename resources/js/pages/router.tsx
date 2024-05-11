import { RouteObject } from "react-router-dom";
import { RootLayout } from "./layout";
import { authRouter } from "./public/router";
import { dashboardRouter } from "./dashboard/router";
import { NotFoundPage } from "./errors/not-found";
import { ErrorBoundary } from "./errors/error-boundary";

export const rootRouter: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            ...authRouter,
            ...dashboardRouter,
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
];
