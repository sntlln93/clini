import { Appointment } from "@/types/entities";
import { atom } from "jotai";

/** Modals */
export const showCreatePatientModalAtom = atom(false);
export const appointmentAtom = atom<Appointment | null>(null);
export const showAppointmentAtom = atom((get) => {
    const appointment = get(appointmentAtom);

    return !!appointment;
});

/** Dashboard Layout */
export const sideNavbarIsCollapsedAtom = atom<boolean>(false);
export const sideNavbarMinWidthAtom = atom((get) => {
    const isCollapsed = get(sideNavbarIsCollapsedAtom);

    return isCollapsed ? "min-w-[80px]" : "min-w-[150px]";
});

export const dashboardContentLeftOffset = atom((get) => {
    const sideNavbarMinWidth = get(sideNavbarMinWidthAtom);

    return sideNavbarMinWidth === "min-w-[80px]" ? "80px" : "150px";
});
