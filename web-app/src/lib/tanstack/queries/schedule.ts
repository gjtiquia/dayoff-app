import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/hono"
import { QUERY_KEYS } from "../keys"

export const useSchedule = () => useQuery({
    queryKey: [QUERY_KEYS.schedule],
    queryFn: async () => {
        const response = await client.api.account.schedule.$get()
        if (!response.ok) {
            throw new Error('Failed to fetch schedule')
        }
        return await response.json()
    }
})

export const SCHEDULE_QUERIES = {
    useSchedule,
} as const 