import { type Token, type AuthenticatedUser } from "@/types/auth";
import { UserCredentials } from "../schemas/auth.schema";
import api from "./api";

export async function checkAuth(token: Token | null) {
    if (!token) throw new Error();

    const Authorization = { Authorization: `Bearer ${token}` };

    const response = await api.get<AuthenticatedUser>(`check-auth`, {
        headers: Authorization,
    });
    return response.data;
}

export const attemptSignIn = async (
    payload: UserCredentials,
): Promise<AuthenticatedUser> => {
    const response = await api.post(`/login`, payload);

    return response.data;
};

export const attemptSignOut = async ({ token }: LogoutArgs): Promise<void> => {
    if (!token) throw new Error();

    await api.delete(`/logout`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

type LogoutArgs = { token: Token };
