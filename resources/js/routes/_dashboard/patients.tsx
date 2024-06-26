import { Loader } from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columns } from "@/features/Patients/columns";
import { DataTable, Navigation } from "@/features/Table";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { patientsQueryOptions } from "@/lib/queries/patients.query";
import { paginationSchema } from "@/lib/schemas/pagination.schema";
import { cn } from "@/lib/utils";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";
import { UserRoundPlus, X } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/patients")({
    pendingComponent: Loader,
    component: Page,
    loaderDeps: ({ search }) => search,
    loader: ({ context: { queryClient }, deps }) => {
        return queryClient.ensureQueryData(patientsQueryOptions(deps));
    },
    validateSearch: paginationSchema,
});

function Page() {
    const paginatedData = Route.useLoaderData();
    const { page, sort_order, filter } = Route.useSearch();
    const hasFilters = page || sort_order || filter;

    const navigate = useNavigate();
    const toPage = (page: number) => navigate({ search: { page } });

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        if (debouncedSearch.length > 1) {
            navigate({ search: { filter: debouncedSearch } });
        } else {
            navigate({ from: "/patients" });
        }
    }, [debouncedSearch]);

    const sortBy = (sort_column: string) => {
        let new_sort_order = sort_order === "asc" ? "desc" : "asc";

        navigate({
            search: { sort_column, sort_order: new_sort_order, filter },
        });
    };

    const breakpoint = useMediaQuery();

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-2">
                <div className="w-full max-w-[400px]">
                    <Input
                        name="search"
                        autoComplete="off"
                        placeholder="Filtra por dni, nombre o apellido"
                        defaultValue={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                {hasFilters ? (
                    <Link
                        search={{}}
                        className={cn(
                            buttonVariants({
                                size:
                                    breakpoint === "sm"
                                        ? "inputCompanion"
                                        : "default",
                                variant: "secondary",
                            }),
                        )}
                    >
                        <X className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Quitar filtros</span>
                    </Link>
                ) : null}

                <Link
                    search={(search) => ({
                        ...search,
                        modal: "patient.create",
                    })}
                    className={cn(
                        buttonVariants({
                            size:
                                breakpoint === "sm"
                                    ? "inputCompanion"
                                    : "default",
                        }),
                        "ml-auto",
                    )}
                >
                    <span className="hidden sm:inline">Nuevo paciente</span>
                    <UserRoundPlus className="h-4 w-4 sm:ml-2" />
                </Link>
            </div>

            <DataTable columns={columns(sortBy)} data={paginatedData.data} />

            <Navigation
                currentPage={page ?? 1}
                totalPages={paginatedData.meta.last_page}
                toPage={toPage}
            />
        </div>
    );
}
