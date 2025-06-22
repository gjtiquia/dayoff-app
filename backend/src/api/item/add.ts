import { z } from "zod";

export const addItemFormSchema = z.object({
    startDate: z.string().min(1, {
        message: "Start date is required.",
    }),
    endDate: z.string().min(1, {
        message: "End date is required.",
    }),
    description: z.string().min(1, {
        message: "Description is required.",
    }).max(500, {
        message: "Description must be less than 500 characters.",
    }),
}).refine((data) => {
    // Validate that end date is after start date
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end >= start;
}, {
    message: "End date must be on or after start date.",
    path: ["endDate"],
})

