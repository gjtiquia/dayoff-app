import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "@tanstack/react-router";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { MUTATIONS } from "@/lib/tanstack";

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignIn() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const signInMutation = MUTATIONS.AUTH.useSignIn();

    function onSubmit(values: SignInFormValues) {
        signInMutation.mutate(values, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Signed in successfully",
                    variant: "default"
                });
                form.reset();
                navigate({ to: "/" });
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to sign in. Please check your credentials and try again.",
                });
            }
        });
    }

    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
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
                            disabled={signInMutation.isPending}
                        >
                            {signInMutation.isPending ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="flex-col space-y-4">
                <div className="flex justify-center w-full">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
                <div className="flex justify-center w-full border-t py-4">
                    <p className="text-center text-xs text-neutral-500">
                        Powered by{" "}
                        <a
                            href="https://better-auth.com"
                            className="underline"
                            target="_blank"
                        >
                            <span className="dark:text-orange-200/90">better-auth.</span>
                        </a>
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}