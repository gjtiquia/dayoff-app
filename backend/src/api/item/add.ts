import { z } from "zod";

export const addItemFormSchema = z.object({
    // === Basic ===
    itemName: z.string().min(1, {
        message: "Item name must be at least 1 character.",
    }),
    price: z.coerce.number().gt(0),
    priceUnit: z.enum(["each", "per pack", "per kg", "per lb", "per g", "per oz", "per mL", "per L"]),
    origin: z.string().optional(),

    // === Advanced ===

    // Show if unit === "per pack"
    packCount: z.coerce.number().gte(0).optional(),

    // Show if unit === "each" || unit === "per pack"
    totalWeightOrVolume: z.coerce.number().gte(0).optional(),
    totalWeightOrVolumeUnit: z.enum(["kg", "lb", "oz", "g", "mL", "L"]).optional(),

    // Show always
    aliases: z.array(z.string().min(1)).optional(),
    discountReason: z.string().optional(),

    // TODO : upload image handling

})

