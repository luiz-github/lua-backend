import { Request, Response } from "express"
import AuthService from "../services/auth.service"
import UserService from "../services/user.service"
import { SignInDTO } from "../dto/auth.dto"
import { UserDTO } from "../dto/user.dto"

export default class AuthController {
    private AuthService: AuthService
    private UserService: UserService

    constructor() {
        this.AuthService = new AuthService()
        this.UserService = new UserService()
    }

    signInUserController = async (req: Request, res: Response) => {
        try {
            const userCredentials: SignInDTO = { 
                email: req.body.email, 
                password: req.body.password 
            }
            const serviceResponse = await this.AuthService.signInUserService(userCredentials)
            return res.status(serviceResponse.status).json(serviceResponse)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }

    signUpUserController = async (req: Request, res: Response) => {
        try {
            const user: UserDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            const response = await this.UserService.createUser(user)        
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }
}