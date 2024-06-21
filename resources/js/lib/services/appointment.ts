import api from "./api";
import { Appointment } from "@/types/entities";
import { parse, parseISO } from "date-fns";
import { Token } from "@/types/auth";
import { Month } from "@/lib/consts/months";
import { AppointmentResponse } from "@/types/api";

const parseAppointment = (appointment: AppointmentResponse) => {
    return {
        ...appointment,
        date: parseISO(appointment.date),
        time: parse(appointment.time, "HH:mm:ss", new Date()),
    };
};

export const getAppointment = async (token: Token, appointmentId: number) => {
    if (!token) throw new Error();

    const response = await api.get<AppointmentResponse>(
        `/appointments/${appointmentId}`,
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return parseAppointment(response.data);
};

export const getAppointments = async (
    month: Month,
    token: Token,
): Promise<Appointment[]> => {
    if (!token) throw new Error();

    const response = await api.get<AppointmentResponse[]>(
        `/appointments?month=${month}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );

    return response.data.map(parseAppointment);
};

export const getClosestAppointment = async (
    token: Token,
): Promise<Appointment | null> => {
    const response = await api.get<AppointmentResponse>(
        `/appointments/closest`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );

    if (response.status === 204) return null;

    return parseAppointment(response.data);
};
