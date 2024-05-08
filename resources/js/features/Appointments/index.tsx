import { Calendar } from "@/components/ui/calendar";
import { AppointmentsList } from "./AppointmentsList";
import { useAppointments } from "./useAppointments";

export function Appointments() {
    const {
        date,
        setMonth,
        setDate,
        daysWithEvents,
        appointments,
        selected,
        setSelected,
    } = useAppointments();

    return (
        <div className="flex flex-row gap-10">
            <div className="flex flex-col">
                <Calendar
                    key={date?.toString()}
                    onMonthChange={setMonth}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    daysWithEvents={daysWithEvents}
                />
            </div>
            <div className="flex flex-col w-full">
                <AppointmentsList
                    items={appointments}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    );
}
