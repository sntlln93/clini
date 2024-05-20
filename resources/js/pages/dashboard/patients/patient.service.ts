import axios from "axios";
import { queryToString } from "@/lib/utils";
import { type PaginatedRequest, type PaginationQueryString } from "@/types/api";
import { type Patient } from "@/types/entities";
import { Token } from "@/types/auth";

const API_URL = "api";

export const getPatients = async (
    token: Token,
    queryString: PaginationQueryString
) => {
    if (!token) throw new Error();

    const qs = queryToString(queryString);

    const response = await axios.get<PaginatedRequest<Patient>>(
        `${API_URL}/patients?${qs}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
