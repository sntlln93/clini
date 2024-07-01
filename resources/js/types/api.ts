import { AxiosError } from "axios";
import { Appointment } from "./entities";

export type ApiValidationError = AxiosError<{
    message: string;
    errors: Record<string, string[]>;
}>;

export type PaginatedResponse<Data> = {
    data: Data[];
    meta: {
        current_page: number;
        from: number;
        to: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

export type PaginationQueryString = {
    page?: number;
    sort_column?: string;
    sort_order?: string;
    filter?: string;
    per_page?: number;
};

export type AppointmentResponse = Omit<Appointment, "date" | "time"> & {
    date: string;
    time: string;
};

export type AppointmentPayload = Omit<
    Appointment,
    "id" | "patient" | "time"
> & { time: string };
