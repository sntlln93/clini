import axios from "axios";
import { PaginatedRequest, Patient, QueryString } from "./types";
import { queryToString } from "@/lib/utils";

export const getPatients = async (token: string, queryString: QueryString) => {
    const qs = queryToString(queryString);

    const response = await axios.get<PaginatedRequest<Patient>>(
        `${import.meta.env.VITE_API_URL}/patients?${qs}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
