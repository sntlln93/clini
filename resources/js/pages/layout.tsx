import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/lib/contexts/auth.context";
import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <SessionProvider>
            <Outlet />
            <Toaster />
        </SessionProvider>
    );
}
