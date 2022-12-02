import { Router } from "express";
import { createContactController } from "../controllers/contact/createContact.controller";
import { loginController } from "../controllers/login/login.controller";

const routeLogin = Router()

routeLogin.post("",loginController)

export default routeLogin