import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePreservedRedirect } from "@/lib/hooks/usePreservedRedirect";
import { useSession } from "@/lib/contexts/auth.context";
import { Role } from "@/types/auth";
import { UnauthorizedError } from "@/lib/errors/Unauthorized";
import { useHistoryState } from "@uidotdev/usehooks";

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

export const RequiresAuthorization = ({
    children,
    allowed,
}: RequiresAuthorizationProps) => {
    const { user } = useSession();
    const location = useLocation();

    if (!user?.roles.find((role) => allowed.includes(role))) {
        throw new UnauthorizedError(user!, location.pathname);
    }

    return children;
};

type RequiresAuthorizationProps = {
    allowed: Role[];
} & PropsWithChildren;
