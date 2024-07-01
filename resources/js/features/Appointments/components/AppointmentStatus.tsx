import { Badge } from "@/components/ui/badge";
import { mergeDateAndTime } from "@/lib/utils";
import { AppointmentStatus as Status } from "@/types/enums/entities";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarX2, CircleCheck, CircleX, Clock } from "lucide-react";

type AppointmentStatusProps = {
    date: Date;
    status: Status;
    time: Date;
    className?: string;
};

export function AppointmentStatus({
    date,
    status,
    time,
    className = "",
}: AppointmentStatusProps) {
    const datetime = mergeDateAndTime(date, time);

    return (
        <Badge className="bg-primary/70 py-1">
            <div className={className}>
                {status == Status.Pending && (
                    <>
                        <span>
                            {formatDistance(datetime, new Date(), {
                                addSuffix: true,
                                locale: es,
                            })}
                        </span>
                        <Clock className="h-5 w-5 ml-2 stroke-amber-500 inline" />
                    </>
                )}

                {status == Status.Done && (
                    <>
                        <span>Asistió</span>
                        <CircleCheck className="h-5 w-5 ml-2 stroke-green-500 inline" />
                    </>
                )}

                {status == Status.Canceled && (
                    <>
                        <span>Cancelado</span>
                        <CalendarX2 className="h-5 w-5 ml-2 stroke-red-500 inline" />
                    </>
                )}
                {status == Status.Missed && (
                    <>
                        <span>No asistió</span>
                        <CircleX className="h-5 w-5 ml-2 stroke-red-500 inline" />
                    </>
                )}
            </div>
        </Badge>
    );
}
