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
        try {
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
            this.createAuthCookie(token, res)
    
            return res.status(200).json({
                success: true,
                message: "User signed in with success"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }

    signUp = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields must be completed"
                })
            }

            const user = await this.UserService.getUserByEmail(email)
            if (user) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists"
                })
            }

            const userId = await this.UserService.createUser(name, email, password)          
            const token = this.AuthService.authenticate(userId, name)

            this.createAuthCookie(token, res)

            return res.status(201).json({
                success: true,
                message: "User created with success",
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }

    logout = async (req: Request, res: Response) => {
        try {
            const token = req.cookies.Token
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "There isn't any token",
                })
            }
            res.clearCookie("Token")
            return res.status(200).json({
                success: true,
                message: "User loged out",
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }

    private createAuthCookie(token: string, res: Response) {
        return res.cookie("Token", token, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            httpOnly: true 
        })
    }
}