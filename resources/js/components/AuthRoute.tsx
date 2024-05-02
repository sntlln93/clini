import { useAuth } from "@/lib/hooks/useAuth";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePreservedRedirect } from "@/lib/hooks/usePreservedRedirect";

export const Protected = ({ children }: PropsWithChildren) => {
    const { user } = useAuth();

    const { pathname, search } = useLocation();
    const redirectPath = encodeURIComponent(pathname + search);
    const queryString = pathname !== "/" ? `?redirect=${redirectPath}` : "";

    if (!user) {
        return <Navigate to={`/login${queryString}`} />;
    }

    return children;
};

export const Public = ({ children }: PropsWithChildren) => {
    const { user } = useAuth();
    const redirectPath = usePreservedRedirect();

    if (user) {
        return <Navigate to={redirectPath} />;
    }

    return children;
};
