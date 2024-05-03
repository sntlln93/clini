import axios from "axios";
import { queryToString } from "@/lib/utils";
import { type PaginatedRequest, type PaginationQueryString } from "@/types/api";
import { type Patient } from "@/types/entities";
import { Token } from "@/types/auth";

export const getPatients = async (
    token: Token,
    queryString: PaginationQueryString
) => {
    if (!token) throw new Error();

    const qs = queryToString(queryString);

    const response = await axios.get<PaginatedRequest<Patient>>(
        `${import.meta.env.VITE_API_URL}/patients?${qs}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
