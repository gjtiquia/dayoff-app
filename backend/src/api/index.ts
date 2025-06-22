import { Hono } from "hono";
import item from "@/api/item"
import sandbox from "@/api/sandbox"
import auth from "@/api/auth"

const app = new Hono()
    .route("/sandbox", sandbox)
    .route("/item", item)
    .route("/auth", auth)

export default app;