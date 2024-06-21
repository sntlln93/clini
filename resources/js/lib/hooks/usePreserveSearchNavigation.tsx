import { useNavigate } from "@tanstack/react-router";

export function usePreserveSearchNavigation() {
    const navigate = useNavigate();

    return function (toSearch: { [key: string]: unknown }) {
        navigate({
            search: (fromSearch) => ({ ...fromSearch, ...toSearch }),
        });
    };
}
