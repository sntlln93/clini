import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "./patient.service";
import { queryToString } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { useSession } from "@/lib/contexts/auth.context";

export function usePatientsList() {
    const navigate = useNavigate();
    const { session } = useSession();

    let [searchParams, setSearchParams] = useSearchParams({
        page: "1",
        sort_column: "",
        sort_order: "",
        filter: "",
        per_page: "",
    });

    const qs = {
        page: Number(searchParams.get("page")),
        sort_column: String(searchParams.get("sort_column")),
        sort_order: String(searchParams.get("sort_order")),
        filter: String(searchParams.get("filter")),
        per_page: Number(searchParams.get("per_page")),
    };

    const debouncedQueryString = useDebounce(queryToString(qs), 300);

    const {
        data: patients,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["patients", debouncedQueryString],
        queryFn: () => getPatients(session!, qs),
    });

    const toPage = (page: number) => {
        const propagatedQueryString = queryToString({ ...qs, page });

        navigate(`/patients?${propagatedQueryString}`, {
            replace: true,
        });
    };

    const setFilter = (filter: string) => {
        setSearchParams((prev) => ({ ...prev, filter }));
    };

    return {
        patients,
        isPending,
        isError,
        currentPage: qs.page,
        toPage,
        setFilter,
        qs,
    };
}