import api from "./api";
import { Appointment } from "@/types/entities";
import { parse, parseISO } from "date-fns";
import { Month } from "@/lib/consts/months";
import { AppointmentPayload, AppointmentResponse } from "@/types/api";
import { toPhpStrtotimeFormat } from "../utils";

const parseAppointment = (appointment: AppointmentResponse) => {
    return {
        ...appointment,
        date: parseISO(appointment.date),
        time: parse(appointment.time, "HH:mm:ss", new Date()),
    };
};

export const getAppointment = async (appointmentId: number) => {
    const response = await api.get<AppointmentResponse>(
        `/appointments/${appointmentId}`,
    );
    return parseAppointment(response.data);
};

export const getAppointments = async (month: Month): Promise<Appointment[]> => {
    const response = await api.get<AppointmentResponse[]>(
        `/appointments?month=${month}`,
    );

    return response.data.map(parseAppointment);
};

export const getClosestAppointment = async (): Promise<Appointment | null> => {
    const response = await api.get<AppointmentResponse>(
        `/appointments/closest`,
    );

    if (response.status === 204) return null;

    return parseAppointment(response.data);
};

export const createAppointment = async (
    payload: Omit<AppointmentPayload, "status">,
): Promise<Appointment> => {
    const response = await api.post("/appointments", {
        ...payload,
        date: toPhpStrtotimeFormat(payload.date),
    });

    return parseAppointment(response.data);
};

export const updateAppointment = async (
    payload: Partial<AppointmentPayload>,
    appointmentId: number,
): Promise<Appointment> => {
    let formattedDate;
    if (payload.date) {
        formattedDate = { date: toPhpStrtotimeFormat(payload.date) };
    }
    const response = await api.patch(`/appointments/${appointmentId}`, {
        ...payload,
        ...formattedDate,
    });

    return parseAppointment(response.data);
};
