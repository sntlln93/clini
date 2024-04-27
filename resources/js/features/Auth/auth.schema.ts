import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "Este campo es obligatorio"),
    password: z.string().min(1, "Este campo es obligatorio"),
});

export type UserCredentials = z.infer<typeof loginSchema>;
