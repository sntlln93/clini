import { useState } from "react";
import { ChevronRight, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Nav } from "./Nav";
import { type NavLink } from "./types";

export default function SideNavbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleNav = () => setIsCollapsed((prev) => !prev);

    return (
        <div
            className={cn(
                "relative border-r px-3 pb-10 pt-24 transition-all duration-500 ease-in-out",
                isCollapsed ? "min-w-[80px]" : "min-w-[200px] sm:mid-w-[150px]"
            )}
        >
            <div className="absolute right-[-20px] top-7">
                <Button
                    variant="secondary"
                    className="rounded-full p-2 border"
                    onClick={toggleNav}
                >
                    <ChevronRight
                        className={
                            isCollapsed
                                ? `transform rotate-180 transition-transform duration-500 ease-in-out`
                                : undefined
                        }
                    />
                </Button>
            </div>
            <Nav links={links} isCollapsed={isCollapsed} />
        </div>
    );
}

const links: NavLink[] = [
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
];
