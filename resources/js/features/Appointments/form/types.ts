import { ControllerRenderProps } from "react-hook-form";
import { AppointmentForm } from "./schema";

export type ControlProps<T extends keyof AppointmentForm> = {
    field: ControllerRenderProps<AppointmentForm, T>;
};
