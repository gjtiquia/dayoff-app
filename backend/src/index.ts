import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import api from "@/api"

const app = new Hono()
    .route("/api", api)
    .get("*", serveStatic({ root: "../web-app/dist" })) // Catch all for serving static .css and .js files
    .get("*", serveStatic({ root: "../web-app/dist", path: "index.html" })) // Catch all for serving index.html (eg. /add, /search, or Not Found pages)

export type AppType = typeof app;

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
    fetch: app.fetch,
    port
})

