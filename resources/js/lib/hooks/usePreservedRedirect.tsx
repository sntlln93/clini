import { useSearchParams } from "react-router-dom";

export function usePreservedRedirect() {
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get("redirect") || "/";

    return redirectPath;
}
