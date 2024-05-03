import { Appointment } from "@/types/entities";
import { Month } from "./types";
import axios from "axios";
import { parse, parseISO } from "date-fns";

export const getAppointments = async (
    month: Month,
    token: string
): Promise<Appointment[]> => {
    const response = await axios.get<AppointmentResponse>(
        `${import.meta.env.VITE_API_URL}/appointments?month=${month}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return response.data.map((appointment) => ({
        ...appointment,
        date: parseISO(appointment.date),
        time: parse(appointment.time, "HH:mm:ss", new Date()),
    }));
};

type AppointmentResponse = Array<
    Omit<Appointment, "date" | "time"> & {
        date: string;
        time: string;
    }
>;
