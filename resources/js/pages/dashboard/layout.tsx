import Aside from "@/components/aside";
import { Breadcrumbs } from "@/features/Breadcrumbs";
import { CreatePatientModal } from "@/features/Patients/Create";
import {
    dashboardContentLeftOffset,
    openAppointmentAtom,
    showCreatePatientModalAtom,
} from "@/stores/ui";
import { useAtomValue } from "jotai";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle } from "lucide-react";
import { useLogoutAction } from "@/lib/hooks/useLogout";
import { Spinner } from "@/components/Spinner";
import { useMemo } from "react";
import { useSession } from "@/lib/contexts/auth.context";
import { usePickNav } from "@/lib/hooks/usePickNav";
import { Tabs } from "@/components/tabs";
import { AppointmentPrompter } from "@/features/AppointmentPrompter";
import { AppointmentModal } from "@/features/Appointments/AppointmentModal";

export function DashboardLayout() {
    const showCreatePatient = useAtomValue(showCreatePatientModalAtom);
    const openAppointment = useAtomValue(openAppointmentAtom);

    const offset = useAtomValue(dashboardContentLeftOffset);
    const navToDisplay = usePickNav();

    const { attemptLogout, logoutIsPending } = useLogoutAction();
    const { user } = useSession();

    const avatarFallback = useMemo(
        () =>
            user?.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2) ?? "NN",
        [user]
    );

    return (
        <>
            <div className="w-full flex">
                {navToDisplay === "aside" && <Aside />}
                <div className={`w-full py-2 px-10 ml-[${offset}]`}>
                    <div className="flex flex-1 items-center">
                        <AppointmentPrompter />
                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-1 ml-auto">
                                <Avatar>
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>
                                        {avatarFallback}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <DropdownMenuShortcut className="ml-0 mr-2">
                                        <UserCircle className="h-4 w-4" />
                                    </DropdownMenuShortcut>
                                    <span>Perfil</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => attemptLogout()}
                                    disabled={logoutIsPending}
                                >
                                    {logoutIsPending ? (
                                        <>
                                            <DropdownMenuShortcut className="ml-0 mr-2">
                                                <Spinner className="h-4 w-4 animate-spin" />
                                            </DropdownMenuShortcut>
                                            <span>Cerrando sesión</span>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownMenuShortcut className="ml-0 mr-2">
                                                <LogOut className="h-4 w-4" />
                                            </DropdownMenuShortcut>
                                            <span>Cerrar sesión</span>
                                        </>
                                    )}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex flex-1 py-4">
                        <Breadcrumbs />
                    </div>

                    <div className="h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
            {navToDisplay === "tabs" && <Tabs />}

            {showCreatePatient && <CreatePatientModal />}
            {openAppointment && <AppointmentModal />}
        </>
    );
}
