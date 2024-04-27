import { useAuth } from "@/lib/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const Protected = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export const Public = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    return children;
};
