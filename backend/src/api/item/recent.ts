
// TODO : once type is finalized should put into postgresDB
// TODO : type (schema) should think from the perspective of what information does one input, one row, one transaction
// TODO : everything else is queriable anyways and can be manipulated and cached
export const dummyItems: RecentItems = {
    items: [
        {
            name: "small pumpkin",
            aliases: ["kalabasa", "kabocha squash", "mama squash", "japanese pumpkin"],
            recentReportedPrice: {
                price: 1.99,
                unit: { type: "per kg" },
                origin: "C&C (Don Mills)",
            },
            lowestReportedPrice: {
                price: 1.58,
                unit: { type: "per kg" },
                origin: "C&C (Don Mills)",
                discountReason: "Special Offer",
            },
        }
    ]
}

export type RecentItems = {
    items: Item[];
};

type Item = {
    name: string,
    aliases?: string[],
    recentReportedPrice: Price,
    lowestReportedPrice: Price,
};

type Price = {
    price: number,
    unit: PriceUnit,
    origin: string,
    discountReason?: string,
    imageUrls?: string[],
}

type PriceUnit = {
    type: "each",
    weightOrVolume?: WeightOrVolume,
} | {
    type: "per kg" | "per lb" | "per oz" | "per g" | "per mL" | "per L",
} | {
    type: "per pack",
    packCount?: number,
    weightOrVolume?: WeightOrVolume,
}

type WeightOrVolume = {
    value: number,
    unit: WeightUnit | VolumeUnit
}

type WeightUnit = "kg" | "lb" | "g" | "oz"
type VolumeUnit = "mL" | "L"
