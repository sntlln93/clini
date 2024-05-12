import { AppointmentStatus as Status } from "@/types/enums/entities";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarX2, CircleCheck, CircleX, Clock } from "lucide-react";

type AppointmentStatusProps = {
    status: Status;
    time: Date;
    className: string;
};

export function AppointmentStatus({
    status,
    time,
    className,
}: AppointmentStatusProps) {
    return (
        <div className={className}>
            {status == Status.Pending && (
                <span>
                    {formatDistance(time, new Date(), {
                        addSuffix: true,
                        locale: es,
                    })}
                    <Clock className="h-6 w-6 ml-1 stroke-amber-500 inline" />
                </span>
            )}

            {status == Status.Done && (
                <span>
                    Completado
                    <CircleCheck className="h-6 w-6 ml-1 stroke-green-500 inline" />
                </span>
            )}

            {status == Status.Canceled && (
                <span>
                    Cancelado
                    <CalendarX2 className="h-6 w-6 ml-1 stroke-red-500 inline" />
                </span>
            )}
            {status == Status.Missed && (
                <span>
                    No asistió
                    <CircleX className="h-6 w-6 ml-1 stroke-red-500 inline" />
                </span>
            )}
        </div>
    );
}
