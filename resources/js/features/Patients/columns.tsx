import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Patient } from "@/types/entities";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function columns(
    sortBy: (sort_column: string) => void,
): ColumnDef<Patient>[] {
    return [
        {
            accessorKey: "id",
            header: "#",
        },
        {
            accessorKey: "dni",
            header: () => {
                return (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={() => sortBy("dni")}
                            >
                                DNI
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ordenar por DNI</TooltipContent>
                    </Tooltip>
                );
            },
        },
        {
            accessorKey: "names",
            header: () => {
                return (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={() => sortBy("names")}
                            >
                                Nombre
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ordenar por nombre</TooltipContent>
                    </Tooltip>
                );
            },
        },
        {
            accessorKey: "lastname",
            header: () => {
                return (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={() => sortBy("lastname")}
                            >
                                Apellido
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ordenar por apellido</TooltipContent>
                    </Tooltip>
                );
            },
        },
        {
            accessorKey: "sex",
            header: "Sexo",
            cell: ({ row }) => {
                const { sex } = row.original;

                const label = {
                    U: "Desconocido",
                    F: "Femenino",
                    M: "Masculino",
                };

                return (
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge variant={"outline"}>{sex}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>{label[sex]}</TooltipContent>
                    </Tooltip>
                );
            },
        },
        {
            accessorKey: "dateOfBirth",
            header: () => {
                return (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={() => sortBy("date_of_birth")}
                            >
                                Fecha de nacimiento
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Ordenar por fecha de nacimiento
                        </TooltipContent>
                    </Tooltip>
                );
            },
            cell: ({ row }) =>
                format(row.original.dateOfBirth, "dd 'de' LLLL',' yyyy", {
                    locale: es,
                }),
        },
        {
            header: "Acciones",
            id: "actions",
            cell: ({ row }) => {
                const patient = row.original;

                return (
                    <div className="flex gap-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="bg-sky-600 hover:bg-sky-700 text-sky-50 hover:text-sky-50"
                                >
                                    <User2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Ver información de {patient.fullName}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];
}
