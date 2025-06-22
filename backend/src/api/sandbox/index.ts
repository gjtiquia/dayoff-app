import { Hono } from "hono";

// TODO : production do not allow sandbox

const app = new Hono()
    .get("/login", async (c) => {
        return c.text("Not implemented /login")
    })

export default app;