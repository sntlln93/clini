import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppointmentCard } from "@/features/Appointments/components/AppointmentCard";
import { SelectionWithNoAppointments } from "@/features/Appointments/components/EdgeDateSelection";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { appointmentsQueryOptions } from "@/lib/queries/appointments.query";
import { months } from "@/lib/consts/months";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Appointment } from "@/types/entities";
import { isSameDay } from "date-fns";
import { usePreserveSearchNavigation } from "@/lib/hooks/usePreserveSearchNavigation";

export const Route = createFileRoute("/_dashboard/appointments")({
    component: Page,
    loaderDeps: ({ search }) => search,
    loader: ({ context: { queryClient }, deps }) => {
        return queryClient.ensureQueryData(
            appointmentsQueryOptions(months[deps.month - 1]),
        );
    },
    validateSearch: z.object({
        month: z
            .number()
            .min(1)
            .max(12)
            .catch(new Date().getMonth() + 1),
        day: z.number().min(1).max(31).catch(new Date().getDate()),
        year: z.number().min(2020).catch(new Date().getFullYear()),
    }),
});

function Page() {
    const breakpoint = useMediaQuery();
    const navigate = usePreserveSearchNavigation();

    const qs = Route.useSearch();
    const { month, day, year } = qs;
    const selectedDate = new Date(`${year}-${month}-${day}`);

    const appointments = Route.useLoaderData();
    const todaysAppointments = appointments.filter((appointment: Appointment) =>
        isSameDay(appointment.date, selectedDate),
    );

    const daysWithEvents = appointments.reduce<Date[]>((acc, appointment) => {
        const dateIndex = acc.findIndex((date) =>
            isSameDay(date, appointment.date),
        );
        if (dateIndex === -1) {
            return [...acc, appointment.date];
        } else {
            return acc;
        }
    }, []);

    return (
        <div className={`flex ${breakpoint === "sm" && "flex-col"} gap-10`}>
            <div className="flex flex-col">
                <Calendar
                    key={selectedDate.toString()}
                    onMonthChange={(date) =>
                        navigate({
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                            year: date.getFullYear(),
                        })
                    }
                    month={selectedDate}
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) =>
                        navigate({
                            month: (date ?? new Date()).getMonth() + 1,
                            day: (date ?? new Date()).getDate(),
                            year: (date ?? new Date()).getFullYear(),
                        })
                    }
                    className="rounded-md border"
                    daysWithEvents={daysWithEvents}
                />
            </div>
            <div className="flex flex-col w-full">
                <ScrollArea className="h-screen">
                    <div className="flex flex-col gap-2 pb-4 pt-0">
                        {todaysAppointments.length === 0 ? (
                            <SelectionWithNoAppointments
                                selectedDate={selectedDate}
                            />
                        ) : (
                            todaysAppointments.map((appointment) => (
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
