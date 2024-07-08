import { z } from "zod";
import {
    Specialty,
    specialties as validSpecialties,
} from "@/lib/consts/specialties";

const specialtiesSet = new Set(validSpecialties);
const rolesSet = new Set(["doctor", "secretary"]);

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, "Este campo es obligatorio"),
    names: z.string(),
    lastname: z.string(),
    practiceName: z.string(),
    specialties: z.array(z.string().trim()).refine((values) => {
        return values.every((value) => specialtiesSet.has(value as Specialty));
    }),
    roles: z
        .array(z.string().trim())
        .refine((values) => values.every((value) => rolesSet.has(value))),
});

export type RegisterPracticeSchema = z.infer<typeof registerSchema>;
