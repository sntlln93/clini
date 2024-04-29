import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <>
            <Outlet />
            <Toaster />
        </>
    );
}
