import { AxiosError } from "axios";

export type ApiValidationError = AxiosError<{
    message: string;
    errors: Record<string, string[]>;
}>;
