import { cn } from "@/lib/utils";
import { links } from "@/components/navigation-links";
import { Link, useLocation } from "react-router-dom";

export function Tabs() {
    const { pathname } = useLocation();

    return (
        <nav className="bg-primary-foreground fixed bottom-0 flex w-full justify-between z-50 shadow-inner rounded-t-lg">
            {links.map((link, index) => (
                <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                        "flex flex-col flex-1 gap-1 items-center py-3",
                        pathname === link.href
                            ? "bg-primary text-primary-foreground"
                            : "text-primary/80",
                        index + 1 === links.length
                            ? "rounded-tr-3xl"
                            : "rounded-tr-none",
                        index === 0 ? "rounded-tl-3xl" : "rounded-tl-none"
                    )}
                >
                    <link.icon className="h-4 w-4" />
                    <span className="text-sm">{link.title}</span>
                </Link>
            ))}
        </nav>
    );
}
