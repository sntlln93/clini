import { queryOptions } from "@tanstack/react-query";
import { getPatients } from "@/lib/services/patient";
import { PaginationQueryString } from "@/types/api";

export const patientsQueryOptions = (queryString: PaginationQueryString) =>
    queryOptions({
        queryKey: ["patients", queryString],
        queryFn: () => getPatients(queryString),
    });
