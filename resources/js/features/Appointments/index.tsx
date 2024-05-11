import { Calendar } from "@/components/ui/calendar";
import { AppointmentsList } from "./AppointmentsList";
import { useAppointments } from "./useAppointments";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

export function Appointments() {
    const breakpoint = useMediaQuery();

    const {
        date,
        month,
        setMonth,
        setDate,
        daysWithEvents,
        appointments,
        selected,
        setSelected,
    } = useAppointments();

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
                <AppointmentsList
                    selectedDate={date}
                    items={appointments}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    );
}
