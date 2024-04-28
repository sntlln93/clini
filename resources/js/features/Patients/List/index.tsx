import { usePatientsList } from "./usePatientList";
import { columns } from "./components/Columns";
import { DataTable } from "../../Table";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/features/Table/Navigation";
import { useToast } from "@/components/ui/use-toast";

export default function PatientList() {
    const { patients, isPending, isError, currentPage, toPage, setFilter, qs } =
        usePatientsList();
    const { toast } = useToast();

    if (isPending || !patients) return <Loader />;
    if (isError) {
        return <p>Error...</p>;
    }

    return (
        <div className="flex flex-col py-5 px-10 gap-10">
            <div className="flex items-center">
                <Input
                    placeholder="Filtra por dni, nombre o apellido"
                    defaultValue={qs.filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="max-w-sm"
                />
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
