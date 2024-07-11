import { z } from "zod";
import {
    Specialty,
    specialties as validSpecialties,
} from "@/lib/consts/specialties";

const specialtiesSet = new Set(validSpecialties);
const rolesSet = new Set(["doctor", "secretary"]);

export const registerSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(4, "Este campo es obligatorio"),
        names: z.string(),
        lastname: z.string(),
        practiceName: z.string(),
        specialties: z
            .array(z.string().trim())
            .refine((values) => {
                return values.every((value) =>
                    specialtiesSet.has(value as Specialty),
                );
            })
            .optional(),
        roles: z
            .array(z.string().trim())
            .refine(
                (values) =>
                    values.length > 0 &&
                    values.every((value) => rolesSet.has(value)),
                {
                    message:
                        "Este campo es obligatorio, por favor indica una o ambas opciones",
                },
            )
            .catch(["secreatery"]),
    })
    .superRefine((input, context) => {
        if (input.roles.includes("doctor") && input.specialties) {
            if (input.specialties.length === 0)
                context.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["specialties"],
                    message:
                        "Si atiendes pacientes, debes indicar una especialidad. Elije la especialidad que más se adecúe",
                });
        }

        return true;
    });

export type RegisterPracticeSchema = z.infer<typeof registerSchema>;
