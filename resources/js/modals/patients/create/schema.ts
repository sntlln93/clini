import { z } from "zod";

const ALLOWED_NAME_CHARACTERS =
    "Sólo se permiten letras mayúsculas y minúsculas, letras acentuadas y el signo apostrófe";
const NAME_PATTERN = /^[a-zA-ZÀ-ÿ\s']+$/;

// Define el esquema con los mensajes de error personalizados
export const createPatientSchema = z.object({
    dni: z
        .string()
        .min(7)
        .refine(
            (value) => /^[0-9]+$/.test(value),
            "Ingresa un número de documento válido sin puntos ni espacios",
        ),
    names: z
        .string()
        .min(4)
        .refine((value) => NAME_PATTERN.test(value), ALLOWED_NAME_CHARACTERS),
    lastname: z
        .string()
        .min(4)
        .refine((value) => NAME_PATTERN.test(value), ALLOWED_NAME_CHARACTERS),
    date_of_birth: z.date(),
    sex: z.enum(["F", "M", "U"]),
    healthcare: z.string().optional(),
    address_line: z
        .string()
        .refine(
            (value) => value === "" || value.length >= 5,
            "La dirección debe tener al menos 5 caracteres",
        ),
    city: z
        .string()
        .refine(
            (value) => value === "" || value.length >= 5,
            "La ciudad debe tener al menos 5 caracteres",
        ),
});

export type CreatePatientForm = z.infer<typeof createPatientSchema>;

export const createPatientInitialValues = {
    dni: "",
    names: "",
    lastname: "",
    address_line: "",
    city: "La Rioja",
};
