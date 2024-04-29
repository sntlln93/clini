import { usePatientsList } from "./usePatientList";
import { columns } from "./components/Columns";
import { DataTable, Navigation } from "@/features/Table";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";

export default function PatientList() {
    const { patients, isPending, isError, currentPage, toPage, setFilter, qs } =
        usePatientsList();
    const { toast } = useToast();

    if (isPending || !patients) return <Loader />;
    if (isError) {
        return <p>Error...</p>;
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Filtra por dni, nombre o apellido"
                    defaultValue={qs.filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="max-w-sm"
                />
                <Button>
                    Nuevo paciente
                    <UserRoundPlus className="h-4 w-4 ml-2" />
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
