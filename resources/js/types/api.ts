import { AxiosError } from "axios";

export type ApiValidationError = AxiosError<{
    message: string;
    errors: Record<string, string[]>;
}>;

export type PaginatedRequest<Data> = {
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
