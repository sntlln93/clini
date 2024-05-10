import { PropsWithChildren, createContext, useContext } from "react";
import { useStorageState } from "@/lib/hooks/useStorageState";
import { AuthenticatedUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../services/check-auth";

const AuthContext = createContext<AuthContext>({
    user: null,
    session: null,
    isPending: false,
    setSession: () => null,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <SessionProvider />"
            );
        }
    }

    return value;
}

export function SessionProvider(props: PropsWithChildren) {
    const [session, setSession] = useStorageState("session");

    const { data, isPending } = useQuery({
        queryKey: ["auth"],
        queryFn: () => checkAuth(session),
    });

    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                isPending,
                session,
                setSession,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

type AuthContext = {
    session?: string | null;
    user: AuthenticatedUser | null;
    isPending: boolean;
    setSession: (value: string | null) => void;
};
