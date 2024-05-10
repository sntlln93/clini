import useMediaQuery from "./useMediaQuery";

type NavigationBar = "tabs" | "aside";

export function usePickNav(): NavigationBar {
    const breakpoint = useMediaQuery();

    if (breakpoint === "sm") return "tabs";

    return "aside";
}
