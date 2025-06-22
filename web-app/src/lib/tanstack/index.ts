import { QueryClient } from "@tanstack/react-query"
import { AUTH_QUERIES } from "./queries/auth"
import { AUTH_MUTATIONS } from "./mutations/auth"
import { ITEM_MUTATIONS } from "./mutations/item"
export { QUERY_KEYS } from "./keys"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
})

export const QUERIES = {
    AUTH: AUTH_QUERIES,
} as const

export const MUTATIONS = {
    AUTH: AUTH_MUTATIONS,
    ITEM: ITEM_MUTATIONS,
} as const 