import { z } from "zod";

export const validationMessages: z.ZodErrorMap = (error, _ctx) => {
    switch (error.code) {
        case z.ZodIssueCode.invalid_type:
            if (error.received === "undefined") {
                return { message: "Este campo es obligatorio" };
            }
            break;
        case z.ZodIssueCode.too_small:
            return {
                message: `Este campo debe tener al menos ${error.minimum} caracteres`,
            };
        case z.ZodIssueCode.invalid_string:
            if (error.validation === "email") {
                return { message: "Correo electrónico no válido" };
            }

            return {
                message: `Error de validación`,
            };
        case z.ZodIssueCode.custom:
            return { message: error.message ?? "Error de validación" };
    }
    return { message: "Error de validación" };
};
