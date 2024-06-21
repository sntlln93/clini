import { queryToString } from "@/lib/utils";
import {
    type PaginatedResponse,
    type PaginationQueryString,
} from "@/types/api";
import { type Patient } from "@/types/entities";
import { Token } from "@/types/auth";
import api from "./api";

export const getPatients = async (
    token: Token,
    queryString: PaginationQueryString,
) => {
    if (!token) throw new Error();

    const qs = queryToString(queryString);

    const response = await api.get<PaginatedResponse<Patient>>(
        `/patients?${qs}`,
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
};
