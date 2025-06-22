import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch, useFieldArray } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { MUTATIONS } from "@/lib/tanstack"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { addItemFormSchema } from "../../../backend/src/api/item/add"

export function AddItemForm() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof addItemFormSchema>>({
        resolver: zodResolver(addItemFormSchema),
        defaultValues: {
            // === Basic ===
            itemName: "",
            price: 0,
            priceUnit: "each",
            origin: "",

            // === Advanced ===
            packCount: 0,
            totalWeightOrVolume: 0,
            aliases: [],
            discountReason: "",
        },
    })

    // Add useFieldArray hook for aliases
    const fieldArray = useFieldArray<z.infer<typeof addItemFormSchema>>({
        control: form.control,
        // @ts-expect-error -- // TODO: Fix type error properly
        name: "aliases"
    })

    // Subscribe to the value of "priceUnit", rerender if changes (cuz we do conditional rendering with this)
    const priceUnit = useWatch({ control: form.control, name: "priceUnit" })

    const addItemMutation = MUTATIONS.ITEM.useAddItem()

    function onSubmit(values: z.infer<typeof addItemFormSchema>) {
        addItemMutation.mutate(values, {
            onSuccess: (data) => {
                form.reset()
                toast({
                    title: "Item Added Successfully",
                    description: data.message,
                    variant: "default"
                })
            },
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to add item. Please try again.",
                })
                console.error("Failed to add item:", error)
            }
        })
    }

    // Function to handle adding new alias
    const handleAddAlias = () => {
        // @ts-expect-error -- TODO: Fix type error properly
        fieldArray.append("")
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Add New Item</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Fill in the details below to add a new item to the inventory
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="itemName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. Apples" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="priceUnit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a unit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="each">each</SelectItem>
                                                <SelectItem value="per pack">per pack</SelectItem>
                                                <SelectItem value="per kg">per kg</SelectItem>
                                                <SelectItem value="per lb">per lb</SelectItem>
                                                <SelectItem value="per g">per g</SelectItem>
                                                <SelectItem value="per oz">per oz</SelectItem>
                                                <SelectItem value="per mL">per mL</SelectItem>
                                                <SelectItem value="per L">per L</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="origin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Origin</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. Costco" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Advanced</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    {
                                        priceUnit === "per pack" &&
                                        <FormField
                                            control={form.control}
                                            name="packCount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pack Count</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    }
                                    {
                                        (priceUnit === "per pack" || priceUnit === "each") &&
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="totalWeightOrVolume"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Total Weight or Volume</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="totalWeightOrVolumeUnit"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Unit</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a unit" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="kg">kg</SelectItem>
                                                                <SelectItem value="lb">lb</SelectItem>
                                                                <SelectItem value="g">g</SelectItem>
                                                                <SelectItem value="oz">oz</SelectItem>
                                                                <SelectItem value="mL">mL</SelectItem>
                                                                <SelectItem value="L">L</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    }

                                    <FormField
                                        control={form.control}
                                        name="discountReason"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Discount Reason</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="eg. Weekend Discount" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-2">
                                        <FormLabel>Aliases</FormLabel>
                                        <div className="space-y-2">
                                            {fieldArray.fields.map((field, index) => (
                                                <div key={field.id} className="flex gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name={`aliases.${index}`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormControl>
                                                                    <Input placeholder="Alternative name" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => fieldArray.remove(index)}
                                                    >
                                                        ×
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={handleAddAlias}
                                        >
                                            Add Alias
                                        </Button>
                                    </div>

                                    <div className="pb-1"></div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <div className="py-1"></div>
                        <Button
                            type="submit"
                            disabled={addItemMutation.isPending}
                        >
                            {addItemMutation.isPending ? "Adding..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
