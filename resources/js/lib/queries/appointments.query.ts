import { queryOptions } from "@tanstack/react-query";
import { getAppointment, getAppointments } from "@/lib/services/appointment";
import { Month } from "@/lib/consts/months";

export const appointmentQueryOptions = (appointmentId: number) =>
    queryOptions({
        queryKey: ["appointments", appointmentId],
        queryFn: () => getAppointment(appointmentId),
    });

export const appointmentsQueryOptions = (month: Month, year: number) =>
    queryOptions({
        queryKey: ["appointments", month, year],
        queryFn: () => getAppointments(month, year),
    });
