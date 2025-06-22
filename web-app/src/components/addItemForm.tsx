import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MUTATIONS } from "@/lib/tanstack/"

import { addItemFormSchema } from "../../../backend/src/api/item/add"

export function AddItemForm() {
    const { toast } = useToast()
    const addItemMutation = MUTATIONS.ITEM.useAddItem()

    const form = useForm<z.infer<typeof addItemFormSchema>>({
        resolver: zodResolver(addItemFormSchema),
        defaultValues: {
            startDate: "",
            endDate: "",
            description: "",
        },
    })

    function onSubmit(values: z.infer<typeof addItemFormSchema>) {
        addItemMutation.mutate(values, {
            onSuccess: (data) => {
                form.reset()
                toast({
                    title: "Date Range Submitted Successfully",
                    description: `Selected dates: ${values.startDate} to ${values.endDate}`,
                    variant: "default"
                })
            },
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message || "Failed to submit date range. Please try again.",
                })
                console.error("Failed to submit:", error)
            }
        })
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Select Date Range</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Choose your date range and add a description
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <textarea
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter a description for this date range..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={addItemMutation.isPending}
                                className="w-full md:w-auto"
                            >
                                {addItemMutation.isPending ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
