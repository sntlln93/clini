import { Protected } from "@/components/AuthRoute";
import { RouteObject } from "react-router-dom";
import { DashboardLayout } from "./layout";
import { WelcomePage } from "./welcome";
import { PatientsPage } from "./patients";

export const dashboardRouter: RouteObject[] = [
    {
        path: "/",
        handle: { crumb: () => "Inicio" },
        element: (
            <Protected>
                <DashboardLayout />
            </Protected>
        ),
        children: [
            {
                path: "/",
                element: <WelcomePage />,
            },
            {
                path: "/patients",
                handle: { crumb: () => "Pacientes" },
                element: <PatientsPage />,
            },
        ],
    },
];
