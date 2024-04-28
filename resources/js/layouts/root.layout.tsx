import SideNavbar from "@/components/SideNavbar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <>
            <div className="h-screen w-full flex ">
                <SideNavbar />
                <Outlet />
            </div>
            <Toaster />
        </>
    );
}
