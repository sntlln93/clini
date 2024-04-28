import { type LucideIcon } from "lucide-react";

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
