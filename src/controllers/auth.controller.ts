import { Request, Response } from "express"
import AuthService from "../services/auth.service"
import UserService from "../services/user.service"
const bcrypt = require('bcryptjs');


export default class AuthController {
    private AuthService: AuthService
    private UserService: UserService

    constructor() {
        this.AuthService = new AuthService()
        this.UserService = new UserService()
    }

    signIn = async (req: Request, res: Response) => {
        const { email, password } = req.body

        const user = await this.UserService.getUserByEmail(email)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exists"
            })
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = await this.AuthService.authenticate(user.id, user.name)
        res.cookie("Token", token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true })

        return res.status(200).json({
            success: true,
            message: "User signed in with success"
        })
    }
}