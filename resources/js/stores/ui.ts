import { atom } from "jotai";

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
