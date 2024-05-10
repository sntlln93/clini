import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { type NavLink, links } from "@/components/navigation-links";

export function Tabs() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="lg"
                    className={cn(
                        "rounded-full p-2 shadow-lg focus:outline-none focus:ring-2",
                        "fixed bottom-4 right-4",
                        "z-50"
                    )}
                >
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
                {links.map((link, index) => (
                    <NavItem key={index} link={link} />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function NavItem({ link }: { link: NavLink }) {
    const { pathname } = { pathname: "false" };

    return (
        <DropdownMenuItem>
            <a
                href={link.href}
                className={cn(
                    buttonVariants({
                        variant: pathname === link.href ? "default" : "ghost",
                        size: "sm",
                    })
                )}
            >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                    <span
                        className={cn(
                            "ml-auto",
                            "text-background dark:text-white"
                        )}
                    >
                        {link.label}
                    </span>
                )}
            </a>
        </DropdownMenuItem>
    );
}
