import { useLayoutEffect, useState } from "react";
import { getBreakPoint } from "../utils";
import { BreakPoint } from "@/types/ui";

export const useMediaQuery = (): BreakPoint => {
    const [breakpoint, setBreakpoint] = useState<BreakPoint>(getBreakPoint());

    useLayoutEffect(() => {
        const updateBreakpoint = () => {
            setBreakpoint(getBreakPoint());
        };

        window.addEventListener("resize", updateBreakpoint);

        return () => {
            window.removeEventListener("resize", updateBreakpoint);
        };
    }, []);

    return breakpoint;
};

export default useMediaQuery;
