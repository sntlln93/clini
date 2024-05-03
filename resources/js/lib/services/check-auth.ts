import { type Token, type AuthenticatedUser } from "@/types/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function checkAuth(token: Token) {
    if (!token) throw new Error();

    const Authorization = { Authorization: `Bearer ${token}` };

    const response = await axios.get<AuthenticatedUser>(
        `${API_URL}/check-auth`,
        { headers: Authorization }
    );
    return response.data;
}
