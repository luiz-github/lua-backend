import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { UserDTO } from "../dto/user.dto";
import { StatusCodes as status } from 'http-status-codes'

export default class UserService {
    private UserRepository: Repository<User>
    private UserService: UserService

    constructor() {
        this.UserRepository =  AppDataSource.getRepository(User)
        this.UserService = new UserService()
    }

    async createUser(user: UserDTO) {
        try {
            if (!user.name || !user.email || !user.password) return { status: status.BAD_REQUEST, message: "All fields must be completed" }
    
            const userExists = await this.UserService.getUserByEmail(user.email)
            if (userExists) return { status: status.CONFLICT, message: "User already exists" }
    
            const newUser = this.UserRepository.create({
                name: user.name,
                email: user.email,
                password: user.password
            })
            const savedUser = await this.UserRepository.save(newUser)
            return { status: status.OK, message: "User registered with success", data: { userId: savedUser.id} }
        } catch (error) {
            return { status: status.INTERNAL_SERVER_ERROR, message: error }
        }
    }

    async updateUser(userId: number, name: string, email: string) {
        return await this.UserRepository.update(userId, {
            name: name,
            email: email
        })
    }

    async deleteUser(userId: number) {
        return await this.UserRepository.softDelete(userId)
    }

    async getUserById(userId: number) {
        return await this.UserRepository.findOne({
            where: { id: userId}
        })
    }

    async getUserByEmail(email: string) {
        return await this.UserRepository.findOne({
            where: { email: email}
        })
    }
}