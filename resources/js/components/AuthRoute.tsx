import { useAuth } from "@/lib/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

export const Protected = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const queryString = searchParams.toString();

    if (!user) {
        return <Navigate to={`/login?${queryString}`} />;
    }

    return children;
};

export const Public = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const queryString = searchParams.toString();

    if (user) {
        return <Navigate to={`/?${queryString}`} />;
    }

    return children;
};
