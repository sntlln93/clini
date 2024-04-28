import { useSearchParams } from "react-router-dom";

export function useSorting() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = (sort_column: string) => {
        // Get the current sort_order from the search params
        let currentSortOrder = searchParams.get("sort_order");

        // Toggle the sort_order
        let newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";

        return () => {
            setSearchParams((prev) => ({
                ...prev,
                sort_column,
                sort_order: newSortOrder,
            }));
        };
    };

    return { sortBy };
}
