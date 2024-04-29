import { RouteObject } from "react-router-dom";
import { RootLayout } from "./layout";
import { authRouter } from "./public/router";
import { dashboardRouter } from "./dashboard/router";
import { NotFoundPage } from "./404";

export const rootRouter: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
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
