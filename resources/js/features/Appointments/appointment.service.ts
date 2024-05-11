import { Appointment } from "@/types/entities";
import { Month } from "./types";
import axios from "axios";
import { parse, parseISO } from "date-fns";
import { Token } from "@/types/auth";

const API_URL = "api";

const parseAppointment = (appointment: AppointmentResponse) => {
    return {
        ...appointment,
        date: parseISO(appointment.date),
        time: parse(appointment.time, "HH:mm:ss", new Date()),
    };
};
export const getAppointments = async (
    month: Month,
    token: Token
): Promise<Appointment[]> => {
    if (!token) throw new Error();

    const response = await axios.get<AppointmentResponse[]>(
        `${API_URL}/appointments?month=${month}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return response.data.map(parseAppointment);
};

export const getClosestAppointment = async (
    token: Token
): Promise<Appointment | null> => {
    const response = await axios.get<AppointmentResponse>(
        `${API_URL}/appointments/closest`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    if (response.status === 204) return null;

    return parseAppointment(response.data);
};

type AppointmentResponse = Omit<Appointment, "date" | "time"> & {
    date: string;
    time: string;
};
