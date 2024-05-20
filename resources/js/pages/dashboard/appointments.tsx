import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppointmentCard } from "@/features/Appointments/components/AppointmentCard";
import {
    EmptySelection,
    SelectionWithNoAppointments,
} from "@/features/Appointments/components/EdgeDateSelection";
import { useAppointments } from "@/features/Appointments/useAppointments";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

export function AppointmentsPage() {
    const breakpoint = useMediaQuery();

    const { date, month, setMonth, setDate, daysWithEvents, appointments } =
        useAppointments();

    return (
        <div className={`flex ${breakpoint === "sm" && "flex-col"} gap-10`}>
            <div className="flex flex-col">
                <Calendar
                    key={date?.toString()}
                    onMonthChange={setMonth}
                    month={month}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    daysWithEvents={daysWithEvents}
                />
            </div>
            <div className="flex flex-col w-full">
                <ScrollArea className="h-screen">
                    <div className="flex flex-col gap-2 pb-4 pt-0">
                        {!date ? (
                            <EmptySelection />
                        ) : appointments.length === 0 ? (
                            <SelectionWithNoAppointments selectedDate={date} />
                        ) : (
                            appointments.map((appointment) => (
                                <AppointmentCard
                                    appointment={appointment}
                                    key={appointment.id}
                                />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
