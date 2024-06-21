import { queryOptions } from "@tanstack/react-query";
import { Token } from "@/types/auth";
import { getAppointment, getAppointments } from "@/lib/services/appointment";
import { Month } from "@/lib/consts/months";

export const appointmentQueryOptions = (token: Token, appointmentId: number) =>
    queryOptions({
        queryKey: ["appointments", appointmentId],
        queryFn: () => getAppointment(token, appointmentId),
    });

export const appointmentsQueryOptions = (token: Token, month: Month) =>
    queryOptions({
        queryKey: ["appointments", month],
        queryFn: ({ queryKey: [, month] }) =>
            getAppointments(month as Month, token),
    });
