import "reflect-metadata"
import express from "express"
import "express-async-errors"

import { handleErrorMiddleware } from "./middleware/handleError.middleware"
import routeContact from "./routes/contact.routes"
import routeUser from "./routes/user.routes"
import routeLogin from "./routes/login.routes"

const app = express()

app.use(express.json())
app.use("/contact", routeContact)
app.use("/user", routeUser)
app.use("/", routeLogin)

app.use(handleErrorMiddleware)


export default app