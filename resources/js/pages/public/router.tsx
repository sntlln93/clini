import { Public } from "@/components/AuthRoute";
import { LoginPage } from "./login";
import { RouteObject } from "react-router-dom";

export const authRouter: RouteObject[] = [
    {
        path: "login",
        element: (
            <Public>
                <LoginPage />
            </Public>
        ),
    },
];
