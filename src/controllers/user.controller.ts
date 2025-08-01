import { Request, Response } from "express"
import UserService from "../services/user.service"

export default class UserController {
    private UserService: UserService

    constructor() {
        this.UserService = new UserService()
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
            await this.UserService.createUser(name, email, password)

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