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
    slim?: boolean;
};

export function AppointmentStatus({
    date,
    status,
    time,
    className = "",
    slim = false,
}: AppointmentStatusProps) {
    const datetime = mergeDateAndTime(date, time);

    return (
        <div className={className}>
            {status == Status.Pending && (
                <span>
                    {slim
                        ? "Pendiente"
                        : formatDistance(datetime, new Date(), {
                              addSuffix: true,
                              locale: es,
                          })}
                    <Clock className="h-5 w-5 ml-2 stroke-amber-500 inline" />
                </span>
            )}

            {status == Status.Done && (
                <span>
                    Completado
                    <CircleCheck className="h-5 w-5 ml-2 stroke-green-500 inline" />
                </span>
            )}

            {status == Status.Canceled && (
                <span>
                    Cancelado
                    <CalendarX2 className="h-5 w-5 ml-2 stroke-red-500 inline" />
                </span>
            )}
            {status == Status.Missed && (
                <span>
                    No asistió
                    <CircleX className="h-5 w-5 ml-2 stroke-red-500 inline" />
                </span>
            )}
        </div>
    );
}
