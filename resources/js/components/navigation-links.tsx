import { Calendar, Home, Users, type LucideIcon } from "lucide-react";

export const links: NavLink[] = [
    {
        title: "Inicio",
        icon: Home,
        href: "/",
    },
    {
        title: "Pacientes",
        icon: Users,
        href: "/patients",
    },
    {
        title: "Turnos",
        icon: Calendar,
        href: "/appointments",
    },
];

export type NavProps = {
    links: NavLink[];
    isCollapsed: boolean;
};

export type NavLink = {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
};
