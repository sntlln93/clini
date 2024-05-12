import { Calendar } from "@/components/ui/calendar";
import { AppointmentCard } from "../components/AppointmentCard";
import { useAppointments } from "../useAppointments";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    EmptySelection,
    SelectionWithNoAppointments,
} from "../components/EdgeDateSelection";

export function AppointmentsList() {
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
                                <AppointmentCard appointment={appointment} />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
