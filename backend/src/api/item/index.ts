import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { type RecentItems, dummyItems } from "@/api/item/recent";
import { addItemFormSchema } from "@/api/item/add";
import { auth } from "@/lib/auth";

const app = new Hono()
    .get("/recent", (c) => c.json<RecentItems>(dummyItems))

    // For some weird reason "form" only accepts strings in client side RPC, so having a number type screws everything up
    // Solution: use json
    // .post("/add", zValidator("form", addItemFormSchema), (c) => {
    //     const form = c.req.valid("form");
    //     console.log(`${c.req.url}: ${JSON.stringify(form)}`)
    //     return c.body(null);
    // })
    .post("/add", zValidator("json", addItemFormSchema), async (c) => {

        // TODO : refactor this nicely
        const session = await auth.api.getSession({ headers: c.req.raw.headers })
        if (session === null) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const json = c.req.valid("json");

        console.log(`${c.req.url}`)
        console.log("user:", session.user.email);
        console.log("json:", json);

        // TODO : add to database, together with created_at / modified_at

        return c.json({
            message: `Added "${json.itemName}" at $${json.price} ${json.priceUnit}${json.origin ? ` from ${json.origin}` : ''}`,
            item: {
                ...json,
                created_at: new Date().toISOString(),
                modified_at: new Date().toISOString()
            }
        });
    })

export default app;