import { Router } from "express";
import { createContactController } from "../controllers/contact/createContact.controller";
import { deleteContactController } from "../controllers/contact/deleteContact.controller";
import { getContactController } from "../controllers/contact/getContact.controller";
import { retriveContactController } from "../controllers/contact/retriveContact.controller";
import { updateContactController } from "../controllers/contact/updateContact.controller";


const routeContact = Router()

routeContact.get("",getContactController)
routeContact.get("",createContactController)
routeContact.get("/:id",retriveContactController)
routeContact.get("/:id",updateContactController)
routeContact.get("/:id",deleteContactController)

export default routeContact