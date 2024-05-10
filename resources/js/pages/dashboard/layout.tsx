import SideNavbar from "@/components/SideNavbar";
import { Breadcrumbs } from "@/features/Breadcrumbs";
import { CreatePatientModal } from "@/features/Patients/Create";
import { showCreatePatientModalAtom } from "@/stores/ui";
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
import { useAuth } from "@/lib/hooks/useAuth";
import { useMemo } from "react";

export function DashboardLayout() {
    const showCreatePatient = useAtomValue(showCreatePatientModalAtom);
    const { attemptLogout, logoutIsPending } = useLogoutAction();
    const { user } = useAuth();

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
            <div className="h-screen w-full flex">
                <SideNavbar />
                <div className="w-full py-5 px-10">
                    <div className="flex justify-between w-full p-5 mb-5">
                        <Breadcrumbs />

                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-1">
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
                    <Outlet />
                </div>
            </div>

            {showCreatePatient && <CreatePatientModal />}
        </>
    );
}
