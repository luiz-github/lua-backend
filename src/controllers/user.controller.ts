import { Request, Response } from "express"
import UserService from "../services/user.service"
import AuthService from "../services/auth.service"

export default class UserController {
    private UserService: UserService
    private AuthService: AuthService

    constructor() {
        this.UserService = new UserService()
        this.AuthService = new AuthService()
    }

    createUser = async (req: Request, res: Response) => {
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

            res.cookie("Token", token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true })

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

    updateUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const { name, email } = req.body
            const user = await this.UserService.getUserById(userId)

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
            await this.UserService.updateUser(userId, name, email)

            return res.status(200).json({
                success: true,
                message: "User updated with success",
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const user = await this.UserService.getUserById(userId)

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
            await this.UserService.deleteUser(userId)

            return res.status(200).json({
                success: true,
                message: "User deleted with success",
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id

            const user = await this.UserService.getUserById(userId)

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }

            return res.status(200).json({
                success: true,
                data: user
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }
}