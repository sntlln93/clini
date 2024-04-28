export type Patient = {
    id: string;
    names: string;
    lastname: string;
    dni: string;
    date_of_birth: Date;
    sex: "F" | "M" | "U";
};

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

export type QueryString = {
    page?: number;
    sort_column?: string;
    sort_order?: string;
    filter?: string;
    per_page?: number;
};
