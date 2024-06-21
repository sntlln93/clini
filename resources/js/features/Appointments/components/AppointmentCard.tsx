import { addMinutes, format } from "date-fns";
import type { Appointment } from "@/types/entities";
import { Heading } from "@/components/ui/typography";
import { AppointmentStatus } from "./AppointmentStatus";
import { AppointmentType } from "./AppointmentType";
import { usePreserveSearchNavigation } from "@/lib/hooks/usePreserveSearchNavigation";

interface AppointmentProps {
    appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentProps) {
    const navigate = usePreserveSearchNavigation();

    return (
        <button
            key={appointment.id}
            className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
            onClick={() =>
                navigate({
                    modal: "appointment.show",
                    appointmentId: appointment.id,
                })
            }
        >
            <div className="flex w-full flex-col gap-1">
                <div className="flex flex-col">
                    <AppointmentStatus
                        date={appointment.date}
                        status={appointment.status}
                        time={appointment.time}
                        className="ml-auto text-muted-foreground"
                    />
                    <div className="flex items-center gap-2">
                        <Heading variant="h4" className="font-semibold">
                            {format(appointment.time, "HH:mm")} -
                            {format(
                                addMinutes(
                                    appointment.time,
                                    appointment.duration,
                                ),
                                "HH:mm",
                            )}
                        </Heading>
                    </div>
                </div>
                <div className="text-xs font-medium">
                    {appointment.patient.fullName}
                </div>
            </div>
            {appointment.reason && (
                <div className="line-clamp-2 text-xs text-muted-foreground">
                    {appointment.reason.substring(0, 300)}
                </div>
            )}
            <div className="flex items-center gap-2">
                <AppointmentType appointmentType={appointment.type} />
            </div>
        </button>
    );
}
