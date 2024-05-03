import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../services/check-auth";
import { useStorageState } from "./useStorageState";

export function useAuth() {
    const [auth] = useStorageState("token");
    const {
        data: user,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["auth"],
        queryFn: () => checkAuth(auth!),
        enabled: !!auth,
    });

    return { isPending, isError, user };
}
