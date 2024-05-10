import { useQuery } from "@tanstack/react-query";
import { format, isSameDay } from "date-fns";
import { useState } from "react";
import { getAppointments } from "./appointment.service";
import type { Month } from "./types";
import type { Appointment } from "@/types/entities";
import { useSession } from "@/lib/contexts/auth.context";

export function useAppointments() {
    const { session } = useSession();
    const [selected, setSelected] = useState<number>();

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date>(new Date());

    const { data, isPending, isError } = useQuery({
        queryKey: ["appointments", format(month, "LLL").toLowerCase()],
        queryFn: ({ queryKey: [, month] }) =>
            getAppointments(month as Month, session!),
        enabled: !!session,
    });

    return {
        appointments: getOnlyFromSelectedDate(data, date),
        month,
        date,
        daysWithEvents: getDaysWithEvents(data),
        selected,
        setDate,
        setMonth,
        setSelected,
    };
}

function getOnlyFromSelectedDate(data?: Appointment[], date?: Date) {
    return data && date
        ? data.filter((appointment: Appointment) =>
              isSameDay(appointment.date, date)
          )
        : [];
}

function getDaysWithEvents(data?: Appointment[]) {
    return data
        ? data.reduce<Date[]>((acc, appointment) => {
              const dateIndex = acc.findIndex((date) =>
                  isSameDay(date, appointment.date)
              );
              if (dateIndex === -1) {
                  return [...acc, appointment.date];
              } else {
                  return acc;
              }
          }, [])
        : [];
}
