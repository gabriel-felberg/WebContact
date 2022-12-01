import { Router } from "express";
import { createUserController } from "../controllers/user/createUser.controller";
import { deleteUserController } from "../controllers/user/deleteUser.controller";
import { getAllUsersController } from "../controllers/user/getAllUsers.controller";
import { retriveUserController } from "../controllers/user/retriveUser.controller";
import { updateUserController } from "../controllers/user/updateUser.controller";

const routeUser = Router()

routeUser.get("",getAllUsersController)
routeUser.post("",createUserController)
routeUser.get("/:id",retriveUserController)
routeUser.patch("/:id",updateUserController)
routeUser.delete("/:id",deleteUserController)

export default routeUser