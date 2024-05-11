import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addMinutes, format, formatDate, formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import type { Appointment } from "@/types/entities";
import {
    CalendarX2,
    CircleCheck,
    CircleX,
    Clock,
    Home,
    Hospital,
} from "lucide-react";
import { AppointmentStatus, AppointmentType } from "@/types/enums/entities";
import { Heading } from "@/components/ui/typography";
import { buttonVariants } from "@/components/ui/button";

interface AppointmentsProps {
    items: Appointment[];
    selectedDate?: Date;
    selected?: number;
    setSelected: (id: number) => void;
}

export function AppointmentsList({
    items,
    selected,
    selectedDate,
    setSelected,
}: AppointmentsProps) {
    if (!selectedDate) {
        return <EmptySelection />;
    }

    if (items.length === 0) {
        return <SelectionWithNoAppointments selectedDate={selectedDate} />;
    }

    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 pb-4 pt-0">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={cn(
                            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            selected === item.id && "bg-muted"
                        )}
                        onClick={() => setSelected(item.id)}
                    >
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex flex-col">
                                <div className="ml-auto text-muted-foreground">
                                    {item.status ==
                                        AppointmentStatus.Pending && (
                                        <span>
                                            {formatDistance(
                                                item.time,
                                                new Date(),
                                                {
                                                    addSuffix: true,
                                                    locale: es,
                                                }
                                            )}
                                            <Clock className="h-6 w-6 ml-1 stroke-amber-500 inline" />
                                        </span>
                                    )}

                                    {item.status == AppointmentStatus.Done && (
                                        <span>
                                            Completado
                                            <CircleCheck className="h-6 w-6 ml-1 stroke-green-500 inline" />
                                        </span>
                                    )}

                                    {item.status ==
                                        AppointmentStatus.Canceled && (
                                        <span>
                                            Cancelado
                                            <CalendarX2 className="h-6 w-6 ml-1 stroke-red-500 inline" />
                                        </span>
                                    )}
                                    {item.status ==
                                        AppointmentStatus.Missed && (
                                        <span>
                                            No asistió
                                            <CircleX className="h-6 w-6 ml-1 stroke-red-500 inline" />
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Heading
                                        variant="h4"
                                        className="font-semibold"
                                    >
                                        {format(item.time, "HH:mm")} -
                                        {format(
                                            addMinutes(
                                                item.time,
                                                item.duration
                                            ),
                                            "HH:mm"
                                        )}
                                    </Heading>
                                </div>
                            </div>
                            <div className="text-xs font-medium">
                                {item.patient.fullName}
                            </div>
                        </div>
                        {item.reason && (
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                {item.reason.substring(0, 300)}
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            {item.type === AppointmentType.Practice && (
                                <Badge className="bg-primary/70 py-1">
                                    <Hospital className="h-5 w-5 mr-2" />
                                    <span className="mr-2">Consultorio</span>
                                </Badge>
                            )}

                            {item.type === AppointmentType.Visit && (
                                <Badge className="bg-primary/70 py-1">
                                    <Home className="h-5 w-5 mr-2" />
                                    <span className="mr-2">Domicilio</span>
                                </Badge>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </ScrollArea>
    );
}

function SelectionWithNoAppointments({ selectedDate }: { selectedDate: Date }) {
    return (
        <div className="min-h-[50px] grid place-content-center rounded-lg border transition-all hover:bg-accent">
            No hay turnos{" "}
            {selectedDate === new Date()
                ? "hoy"
                : `el ${formatDate(selectedDate, "d 'de' LLLL", {
                      locale: es,
                  })}`}
        </div>
    );
}

function EmptySelection() {
    const classes = {
        booked: "h-5 w-5 p-0 border bg-blue-100 text-primary hover:bg-blue-400 hover:text-primary-foreground focus:bg-blue-400 focus:text-primary-foreground",
        selected:
            "h-5 w-5 p-0 border bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        empty: cn(
            buttonVariants({ variant: "ghost" }),
            "h-5 w-5 border p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100"
        ),
    };

    return (
        <div className="min-h-[100px] p-10 rounded-lg border transition-all hover:bg-accent">
            Elegí un día para mostrar
            <ul className="flex flex-row gap-4 mt-5">
                <li className="flex flex-row justify-center gap-2">
                    <div className={`w-4 h-4 ${classes.selected}`} />
                    <span>Seleccionado</span>
                </li>
                <li className="flex flex-row justify-center gap-2">
                    <div className={`w-4 h-4 ${classes.booked}`} />
                    <span>Con turnos</span>
                </li>
                <li className="flex flex-row justify-center gap-2">
                    <div className={`w-4 h-4 ${classes.empty}`} />
                    <span>Sin turnos</span>
                </li>
            </ul>
        </div>
    );
}
