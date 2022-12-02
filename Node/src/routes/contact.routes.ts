import { Router } from "express";
import { createContactController } from "../controllers/contact/createContact.controller";
import { deleteContactController } from "../controllers/contact/deleteContact.controller";
import { getContactController } from "../controllers/contact/getContact.controller";
import { retriveContactController } from "../controllers/contact/retriveContact.controller";
import { updateContactController } from "../controllers/contact/updateContact.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";


const routeContact = Router()

routeContact.get("",getContactController)
routeContact.post("",authenticationMiddleware, createContactController)
routeContact.get("/:id",retriveContactController)
routeContact.patch("/:id",authenticationMiddleware, updateContactController)
routeContact.delete("/:id",authenticationMiddleware, deleteContactController)

export default routeContact