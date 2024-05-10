import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePreservedRedirect } from "@/lib/hooks/usePreservedRedirect";
import { useSession } from "@/lib/contexts/auth.context";

export const Protected = ({ children }: PropsWithChildren) => {
    const { session } = useSession();

    const { pathname, search } = useLocation();
    const redirectPath = encodeURIComponent(pathname + search);
    const queryString = pathname !== "/" ? `?redirect=${redirectPath}` : "";

    if (!session) {
        return <Navigate to={`/login${queryString}`} />;
    }

    return children;
};

export const Public = ({ children }: PropsWithChildren) => {
    const { session } = useSession();

    const redirectPath = usePreservedRedirect();

    if (session) {
        return <Navigate to={redirectPath} />;
    }

    return children;
};
