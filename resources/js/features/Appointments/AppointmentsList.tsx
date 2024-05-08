import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addMinutes, format, formatDistance } from "date-fns";
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

interface AppointmentsProps {
    items: Appointment[];
    selected?: number;
    setSelected: (id: number) => void;
}

export function AppointmentsList({
    items,
    selected,
    setSelected,
}: AppointmentsProps) {
    return (
        <ScrollArea className="h-screen 0px]">
            <div className="flex flex-col gap-2 p-4 pt-0">
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
                            <div className="flex items-center">
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
