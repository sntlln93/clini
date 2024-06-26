import { AppointmentType } from "@/types/enums/entities";
import { z } from "zod";

export const appointmentFormSchema = z.object({
    patientId: z.number().gt(0),
    date: z.date(),
    time: z.string(),
    duration: z.coerce.number(),
    type: z.nativeEnum(AppointmentType),
    phone: z
        .string()
        .refine((value) => /^\d{10}$/.test(value), {
            message:
                "El número de teléfono debe contener exactamente 10 dígitos numéricos.",
        })
        .optional(),
    reason: z.string().optional(),
});

export type AppointmentForm = z.infer<typeof appointmentFormSchema>;
