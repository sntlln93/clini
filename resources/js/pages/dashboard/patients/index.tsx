import { DataTable, Navigation } from "@/features/Table";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useSetAtom } from "jotai";
import { showCreatePatientModalAtom } from "@/stores/ui";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { usePatientsList } from "./usePatientList";
import { columns } from "./components/Columns";

export function PatientsPage() {
    const { patients, isPending, isError, currentPage, toPage, setFilter, qs } =
        usePatientsList();
    const breakpoint = useMediaQuery();
    const setShowCreatePatient = useSetAtom(showCreatePatientModalAtom);

    const openCreatePatient = () => setShowCreatePatient(true);

    if (isPending || !patients) return <Loader />;
    if (isError) {
        return <p>Error...</p>;
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between gap-2">
                <Input
                    name="search"
                    autoComplete="off"
                    placeholder="Filtra por dni, nombre o apellido"
                    defaultValue={qs.filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="max-w-sm"
                />
                <Button
                    onClick={openCreatePatient}
                    size={breakpoint === "sm" ? "icon" : "default"}
                >
                    <span className="hidden sm:inline">Nuevo paciente</span>
                    <UserRoundPlus className="h-4 w-4 sm:ml-2" />
                </Button>
            </div>
            <DataTable columns={columns} data={patients.data} />

            <Navigation
                currentPage={currentPage}
                totalPages={patients?.meta.last_page as number}
                toPage={toPage}
            />
        </div>
    );
}
