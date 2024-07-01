import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CalendarX2, CircleCheck, CircleX, Clock, Filter } from "lucide-react";

import { AppointmentStatus as Status } from "@/types/enums/entities";

type FilterProps = {
    statusFilter: [Status[], React.Dispatch<React.SetStateAction<Status[]>>];
    statuses: Status[];
};

export function AppointmentStatusFilter({
    statusFilter,
    statuses,
}: FilterProps) {
    const [selected, setSelected] = statusFilter;

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
                    <Button variant="outline" size={"default"}>
                        {selected.length === 0 ? (
                            <>
                                Filtrar
                                <Filter className="h-4 w-4 ml-2 inline" />
                            </>
                        ) : (
                            <>
                                <span className="mr-2">Mostrando</span>
                                {selected.map((status, index) => {
                                    if (status === Status.Done) {
                                        return (
                                            <CircleCheck
                                                key={index}
                                                className={`fill-white h-5 w-5 ml-[${index === 0 ? "0" : "-.5rem"}] stroke-green-500 inline`}
                                            />
                                        );
                                    } else if (status === Status.Canceled) {
                                        return (
                                            <CalendarX2
                                                key={index}
                                                className={`fill-white h-5 w-5 ml-[${index === 0 ? "0" : "-.5rem"}] stroke-red-500 inline`}
                                            />
                                        );
                                    } else if (status === Status.Missed) {
                                        return (
                                            <CircleX
                                                key={index}
                                                className={`fill-white h-5 w-5 ml-[${index === 0 ? "0" : "-.5rem"}] stroke-red-500 inline`}
                                            />
                                        );
                                    } else if (status === Status.Pending) {
                                        return (
                                            <Clock
                                                key={index}
                                                className={`fill-white h-5 w-5 ml-[${index === 0 ? "0" : "-.5rem"}] stroke-amber-500 inline`}
                                            />
                                        );
                                    }
                                })}
                            </>
                        )}
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
