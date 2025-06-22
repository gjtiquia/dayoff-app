import { useQuery } from "@tanstack/react-query"
import { authClient } from "@/lib/auth"
import { QUERY_KEYS } from "../keys"

export const useSession = () => useQuery({
    queryKey: [QUERY_KEYS.session],
    queryFn: async () => {
        const response = await authClient.getSession()
        if (response.error) {
            return null
        }
        return response.data
    }
})

export const AUTH_QUERIES = {
    useSession,
} as const 