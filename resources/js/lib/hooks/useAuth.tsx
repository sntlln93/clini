import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { checkAuth } from "../services/check-auth";
import { type TokenAtom } from "@/types/auth";

export const authAtom = atomWithStorage<TokenAtom>("auth", null);

export function useAuth() {
    const auth = useAtomValue(authAtom);
    const {
        data: user,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["auth"],
        queryFn: () => checkAuth(auth),
        retry: false,
    });

    return { isPending, isError, user };
}
