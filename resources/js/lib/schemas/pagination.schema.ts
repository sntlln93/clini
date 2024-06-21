import { z } from "zod";

export const paginationSchema = z.object({
    page: z.number().optional(),
    sort_column: z.string().optional(),
    sort_order: z.string().optional(),
    filter: z.string().optional(),
    last_page: z.number().optional(),
});
