import { queryOptions } from "@tanstack/react-query";
import { getPatients } from "@/lib/services/patient";
import { Token } from "@/types/auth";
import { PaginationQueryString } from "@/types/api";

export const patientsQueryOptions = (
    token: Token,
    queryString: PaginationQueryString,
) =>
    queryOptions({
        queryKey: ["patients", queryString],
        queryFn: () => getPatients(token, queryString),
    });
