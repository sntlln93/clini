import { useQuery } from "@tanstack/react-query";
import { format, isSameDay } from "date-fns";
import { useState } from "react";
import { getAppointments } from "./appointment.service";
import { type Month } from "./types";
import { type Appointment } from "@/types/entities";
import { useStorageState } from "@/lib/hooks/useStorageState";

export function useAppointments() {
    const [token] = useStorageState("token");

    const [selected, setSelected] = useState<number>();

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date>(new Date());

    const { data, isPending } = useQuery({
        queryKey: ["appointments", format(month, "LLL").toLowerCase()],
        queryFn: ({ queryKey: [, month] }) =>
            getAppointments(month as Month, token!),
    });

    return {
        appointments: getOnlyFromSelectedDate(data, date),
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
