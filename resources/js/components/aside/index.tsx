import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Nav } from "./Nav";
import { useAtom, useAtomValue } from "jotai";
import { sideNavbarIsCollapsedAtom, sideNavbarMinWidthAtom } from "@/stores/ui";
import { links } from "@/components/navigation-links";

export default function Aside() {
    const [isCollapsed, setIsCollapsed] = useAtom(sideNavbarIsCollapsedAtom);
    const minWidth = useAtomValue(sideNavbarMinWidthAtom);

    const toggleNav = () => setIsCollapsed((prev) => !prev);

    return (
        <div
            className={cn(
                "relative h-screen border-r px-3 pb-10 pt-24 transition-all duration-500 ease-in-out",
                minWidth
            )}
        >
            <div className="absolute right-[-20px] top-7">
                <Button
                    variant="secondary"
                    className="rounded-full border p-2"
                    onClick={toggleNav}
                >
                    <ChevronRight
                        className={
                            isCollapsed
                                ? `rotate-180 transform transition-transform duration-500 ease-in-out`
                                : undefined
                        }
                    />
                </Button>
            </div>
            <Nav links={links} isCollapsed={isCollapsed} />
        </div>
    );
}
