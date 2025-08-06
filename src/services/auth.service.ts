import * as jwt from "jsonwebtoken"
import { StatusCodes as status } from 'http-status-codes'
import UserService from "./user.service"
import bcrypt = require("bcryptjs/umd/types")
import { SignInDTO } from "../dto/auth.dto"

interface PayloadJWT {
    id: number,
    name: string
}

export default class AuthService {
    private privateKey: string
    private UserService: UserService

    constructor() {
        this.privateKey = "private"
        this.UserService = new UserService()
    }

    async signInUserService(credentials: SignInDTO) {
        try {
            const user = await this.UserService.getUserByEmail(credentials.email)
            if (!user)return { status: status.NOT_FOUND, message: "User doesn't exists" }

            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) return { status: status.BAD_REQUEST, message: "Invalid credentials" }

            const payloadJWT: PayloadJWT = {
                id: user.id,
                name: user.name
            }
            
            const token = jwt.sign(payloadJWT, this.privateKey)
            return {
                status: status.OK,
                message: "User authenticated",
                data: token
            }
        } catch (error) {
            return {
                status: status.INTERNAL_SERVER_ERROR,
                message: error
            }
        }
    }

    isAuthenticated(token: string) {
        try {
            jwt.verify(token, this.privateKey)
            return {
                status: status.OK,
                message: "User is authenticated"
            }
        } catch (error) {
            return {
                status: status.UNAUTHORIZED,
                message: "User is not authenticated"
            }
        }
    }
}