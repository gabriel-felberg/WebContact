import { Request, Response } from "express"
import { IUserLogin } from "../../interfaces/login"
import { loginService } from "../../services/login/login.service"

export const loginController = async(req:Request, res:Response) => {
    const {email, password}: IUserLogin = req.body
    const token = await loginService({email, password})
    return res.status(201).json({token})
}
