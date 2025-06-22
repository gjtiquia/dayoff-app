import { Hono } from "hono";
import item from "@/api/item"
import sandbox from "@/api/sandbox"
import auth from "@/api/auth"
import account from "@/api/account"

const app = new Hono()
    .route("/sandbox", sandbox)
    .route("/item", item)
    .route("/auth", auth)
    .route("/account", account)

export default app;