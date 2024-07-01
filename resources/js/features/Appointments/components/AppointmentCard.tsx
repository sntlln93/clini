import { addMinutes, format } from "date-fns";
import type { Appointment } from "@/types/entities";
import { Heading } from "@/components/ui/typography";
import { AppointmentStatus } from "./AppointmentStatus";
import { AppointmentType } from "./AppointmentType";
import { AppointmentMenu } from "./AppointmentMenu";

interface AppointmentProps {
    appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentProps) {
    return (
        <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
            <div className="flex w-full flex-col gap-1">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <Heading variant="h4" className="font-semibold">
                            {`De ${format(appointment.time, "HH:mm")} a 
                            ${format(
                                addMinutes(
                                    appointment.time,
                                    appointment.duration,
                                ),
                                "HH:mm",
                            )}`}
                        </Heading>
                        <AppointmentMenu
                            appointment={appointment}
                            className="ml-auto"
                        />
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
                <AppointmentStatus
                    date={appointment.date}
                    status={appointment.status}
                    time={appointment.time}
                />
            </div>
        </div>
    );
}
