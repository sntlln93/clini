import { type Token, type AuthenticatedUser } from "@/types/auth";
import axios from "axios";
import { type UserCredentials } from "./auth.schema";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (
    payload: UserCredentials
): Promise<AuthenticatedUser> => {
    const response = await axios.post(`${API_URL}/login`, payload);

    return response.data;
};

export const logout = async ({ token }: LogoutArgs): Promise<void> => {
    if (!token) throw new Error();

    await axios.delete(`${API_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

type LogoutArgs = { token: Token };
