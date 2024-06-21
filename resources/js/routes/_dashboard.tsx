import { createFileRoute, redirect } from "@tanstack/react-router";
import Aside from "@/components/aside";
import { Breadcrumbs } from "@/features/Breadcrumbs";
import { dashboardContentLeftOffset } from "@/stores/ui";
import { useAtomValue } from "jotai";
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
import { Spinner } from "@/components/Spinner";
import { useMemo } from "react";
import { usePickNav } from "@/lib/hooks/usePickNav";
import { Tabs } from "@/components/tabs";
import { Prompter } from "@/features/Appointments/Prompter";
import { Outlet } from "@tanstack/react-router";
import { useAuth } from "@/lib/hooks/useAuth";
import { z } from "zod";
import CreatePatientModal from "@/modals/patients/create";
import { appointmentQueryOptions } from "@/lib/queries/appointments.query";
import { ShowAppointmentModal } from "@/modals/appointments/show";

const searchSchema = z
    .object({
        modal: z.enum(["patient.create", "appointment.show"]).optional(),
        appointmentId: z.number().optional(),
    })
    .refine(
        (schema) => {
            if (schema.modal === "appointment.show") {
                return schema.appointmentId !== undefined;
            }

            return true;
        },
        {
            message:
                "appointmentId is required when modal is 'appointment.show'",
            path: ["appointmentId"],
        },
    );

export const Route = createFileRoute("/_dashboard")({
    component: DashboardLayout,
    beforeLoad: async ({ location, context }) => {
        if (!context.auth.isAuthenticated()) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    loaderDeps: ({ search }) => search,
    loader: ({ context: { queryClient, auth }, deps }) => {
        if (deps.appointmentId) {
            return queryClient.ensureQueryData(
                appointmentQueryOptions(auth.user!.token, deps.appointmentId),
            );
        }
    },
    validateSearch: searchSchema,
});

function DashboardLayout() {
    const offset = useAtomValue(dashboardContentLeftOffset);
    const navToDisplay = usePickNav();
    const { modal } = Route.useSearch();

    const { user, signOut, signOutIsPending } = useAuth();

    const avatarFallback = useMemo(
        () =>
            user?.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2) ?? "NN",
        [user],
    );

    return (
        <>
            <div className="w-full flex">
                {navToDisplay === "aside" && <Aside />}
                <div className={`w-full py-2 px-10 ml-[${offset}]`}>
                    <div className="flex flex-1 items-center">
                        <Prompter />
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
                                    onClick={() => signOut()}
                                    disabled={signOutIsPending}
                                >
                                    {signOutIsPending ? (
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

            {modal === "patient.create" && <CreatePatientModal />}
            {modal === "appointment.show" && <ShowAppointmentModal />}
        </>
    );
}
