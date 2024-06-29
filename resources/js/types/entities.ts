import { AppointmentStatus, AppointmentType } from "./enums/entities";

export type Appointment = {
    id: number;
    date: Date;
    time: Date;
    type: AppointmentType;
    status: AppointmentStatus;
    patient: Patient;
    phone: string;
    reason?: string;
    notes?: string;
    duration: number;
};

export type Patient = {
    id: string;
    names: string;
    lastname: string;
    fullName: string;
    dni: string;
    dateOfBirth: Date;
    sex: "F" | "M" | "U";
    healthcare?: string;
    address?: string;
};
