import { Calendar, Settings, Map, Users, type LucideIcon } from "lucide-react";

export const links: NavLink[] = [
    {
        title: "Inicio",
        icon: Calendar,
        href: "/",
    },
    {
        title: "Pacientes",
        icon: Users,
        href: "/patients",
    },
    {
        title: "Hoja de ruta",
        icon: Map,
        href: "/roadmap",
    },
    {
        title: "Configuración",
        icon: Settings,
        href: "/settings",
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
