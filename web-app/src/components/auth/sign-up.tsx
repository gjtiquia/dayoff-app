import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { MUTATIONS } from "@/lib/tanstack";

const signUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUp() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const signUpMutation = MUTATIONS.AUTH.useSignUp();

    function onSubmit(values: SignUpFormValues) {
        signUpMutation.mutate(values, {
            onSuccess: (data) => {
                toast({
                    title: "Success",
                    description: `Account ${data.user.name} created successfully`,
                    variant: "default"
                });
                form.reset();
                navigate({ to: "/" });
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to create account. Please try again.",
                });
            }
        });
    }

    return (
        <Card className="z-50 rounded-md max-w-md">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4 items-start">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <FormControl>
                                            <Input
                                                id="first-name"
                                                placeholder="Max"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <FormControl>
                                            <Input
                                                id="last-name"
                                                placeholder="Robinson"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <Label htmlFor="password-confirmation">Confirm Password</Label>
                                    <FormControl>
                                        <Input
                                            id="password-confirmation"
                                            type="password"
                                            placeholder="Confirm Password"
                                            autoComplete="new-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={signUpMutation.isPending}
                        >
                            {signUpMutation.isPending ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                "Create an account"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className="flex justify-center w-full border-t py-4">
                    <p className="text-center text-xs text-neutral-500">
                        Secured by <span className="text-orange-400">better-auth.</span>
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}