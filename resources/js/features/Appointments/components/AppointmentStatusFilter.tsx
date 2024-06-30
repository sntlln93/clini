import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    CalendarX2,
    CircleCheck,
    CircleX,
    Clock,
    FilterX,
    Filter,
} from "lucide-react";

import { AppointmentStatus as Status } from "@/types/enums/entities";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

const STATUS_LABEL = {
    [Status.Canceled]: "cancelados",
    [Status.Done]: "completados",
    [Status.Missed]: "perdidos",
    [Status.Pending]: "pendientes",
};

type FilterProps = {
    statusFilter: [Status[], React.Dispatch<React.SetStateAction<Status[]>>];
    statuses: Status[];
};

export function AppointmentStatusFilter({
    statusFilter,
    statuses,
}: FilterProps) {
    const [selected, setSelected] = statusFilter;
    const breakpoint = useMediaQuery();

    const getFilterLabel = () => {
        if (breakpoint === "sm") return;

        const totalStatuses = selected.length;

        if (totalStatuses === 0) {
            return "Ocultando todos los turnos";
        } else if (totalStatuses === 1) {
            return `Mostrando ${STATUS_LABEL[selected[0]]}`;
        } else if (totalStatuses === 2) {
            return `Mostrando ${selected.map((status) => STATUS_LABEL[status]).join(" y ")}`;
        } else if (totalStatuses === 3) {
            return `Mostrando ${STATUS_LABEL[selected[0]]}, ${STATUS_LABEL[selected[1]]}, y 1 más`;
        } else {
            return "Mostrando todos los turnos";
        }
    };

    const toggleStatus = (status: Status) => {
        const updatedStatuses = [...selected];
        const index = updatedStatuses.findIndex((s) => s === status);

        if (index !== -1) {
            updatedStatuses.splice(index, 1);
        } else {
            updatedStatuses.push(status);
        }

        setSelected(updatedStatuses);
    };

    return (
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size={
                            breakpoint === "sm" ? "inputCompanion" : "default"
                        }
                    >
                        {selected.length !== 4 ? (
                            <FilterX className="h-5 w-5 mr-2 inline" />
                        ) : (
                            <Filter className="h-5 w-5 mr-2 inline" />
                        )}
                        {getFilterLabel()}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel
                        onClick={() =>
                            setSelected([
                                Status.Done,
                                Status.Missed,
                                Status.Pending,
                                Status.Canceled,
                            ])
                        }
                    >
                        <span>
                            {`${selected.length === 4 ? "Mostrando" : "Mostrar"} todos`}
                        </span>
                        <CircleCheck className="fill-slate-50 h-5 w-5 ml-1 stroke-green-500 inline" />
                        <CalendarX2 className="fill-slate-50 h-5 w-5 ml-[-.5rem] stroke-red-500 inline" />
                        <CircleX className="fill-slate-50 h-5 w-5 ml-[-.5rem] stroke-red-500 inline" />
                        <Clock className="fill-slate-50 h-5 w-5 ml-[-.5rem] stroke-amber-500 inline" />
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={selected.includes(Status.Done)}
                        onCheckedChange={() => toggleStatus(Status.Done)}
                    >
                        <span>
                            <CircleCheck className="h-5 w-5 mr-2 stroke-green-500 inline" />
                            Asistió (
                            {
                                statuses.filter(
                                    (status) => status === Status.Done,
                                ).length
                            }
                            )
                        </span>
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={selected.includes(Status.Canceled)}
                        onCheckedChange={() => toggleStatus(Status.Canceled)}
                    >
                        <span>
                            <CalendarX2 className="h-5 w-5 mr-2 stroke-red-500 inline" />
                            Cancelado (
                            {
                                statuses.filter(
                                    (status) => status === Status.Canceled,
                                ).length
                            }
                            )
                        </span>
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={selected.includes(Status.Missed)}
                        onCheckedChange={() => toggleStatus(Status.Missed)}
                    >
                        <span>
                            <CircleX className="h-5 w-5 mr-2 stroke-red-500 inline" />
                            No asistió (
                            {
                                statuses.filter(
                                    (status) => status === Status.Missed,
                                ).length
                            }
                            )
                        </span>
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={selected.includes(Status.Pending)}
                        onCheckedChange={() => toggleStatus(Status.Pending)}
                    >
                        <span>
                            <Clock className="h-5 w-5 mr-2 stroke-amber-500 inline" />
                            Pendiente (
                            {
                                statuses.filter(
                                    (status) => status === Status.Pending,
                                ).length
                            }
                            )
                        </span>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
