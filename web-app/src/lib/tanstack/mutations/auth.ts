import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authClient } from "@/lib/auth"
import { QUERY_KEYS } from "../keys"

export const useSignOut = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            const response = await authClient.signOut()
            if (response.error) {
                throw new Error(response.error.message)
            }
            return response.data
        },
        onSuccess: () => {
            // Invalidate the session query to update the UI
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.session] })
        }
    })
}

export const useSignIn = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: { email: string; password: string }) => {
            const response = await authClient.signIn.email(values)
            if (response.error) {
                throw new Error(response.error.message)
            }
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.session] })
        }
    })
}

export const useSignUp = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: { email: string; password: string; firstName: string; lastName: string; passwordConfirmation: string }) => {
            const response = await authClient.signUp.email({
                email: values.email,
                password: values.password,
                name: `${values.firstName} ${values.lastName}`,
                callbackURL: "/",
            })
            if (response.error) {
                throw new Error(response.error.message)
            }
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.session] })
        }
    })
}

export const AUTH_MUTATIONS = {
    useSignOut,
    useSignIn,
    useSignUp,
} as const 