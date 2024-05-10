import SideNavbar from "@/components/SideNavbar";
import { Breadcrumbs } from "@/features/Breadcrumbs";
import { CreatePatientModal } from "@/features/Patients/Create";
import { showCreatePatientModalAtom } from "@/stores/ui";
import { useAtomValue } from "jotai";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
    const showCreatePatient = useAtomValue(showCreatePatientModalAtom);

    return (
        <>
            <div className="h-screen w-full flex">
                <SideNavbar />
                <div className="w-full py-5 px-10">
                    <Breadcrumbs />
                    <Outlet />
                </div>
            </div>

            {showCreatePatient && <CreatePatientModal />}
        </>
    );
}
