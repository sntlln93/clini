import SideNavbar from "@/components/SideNavbar";
import { Breadcrumbs } from "@/features/Breadcrumbs";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
    return (
        <>
            <div className="h-screen w-full flex">
                <SideNavbar />
                <div className="w-full py-5 px-10">
                    <Breadcrumbs />
                    <Outlet />
                </div>
            </div>
        </>
    );
}
