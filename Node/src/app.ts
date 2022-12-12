import "reflect-metadata"
import express from "express"
import cors from "cors"
import "express-async-errors"
import { handleErrorMiddleware } from "./middleware/handleError.middleware"
import routeContact from "./routes/contact.routes"
import routeUser from "./routes/user.routes"
import routeLogin from "./routes/login.routes"

const app = express()

app.use(express.json())
app.use((req, res, next)=> {
    app.use(cors())
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")
    res.header("Access-Control-Allow-Methods","*")
    next()
})
app.use("/contact", routeContact)
app.use("/user", routeUser)
app.use("/", routeLogin)

app.use(handleErrorMiddleware)


export default app