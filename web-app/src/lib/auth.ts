import { createAuthClient } from "better-auth/react"

// export const authClient = createAuthClient({
//     baseURL: "http://localhost:3000" // the base url of your auth server
// })

// Not specifying the baseURL, because it will default to using /api/**, which is correct in production, and in development it will be proxied anyways, no need to deal with CORS issues
export const authClient = createAuthClient();