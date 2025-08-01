import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import AuthService from "./auth.service";

export default class UserService {
    private UserRepository: Repository<User>
    private auth: AuthService

    constructor() {
        this.UserRepository =  AppDataSource.getRepository(User)
        this.auth = new AuthService()
    }

    async createUser(name: string, email: string, password: string) {
        const newUser = this.UserRepository.create({
            name: name,
            email: email,
            password: password
        })
        const user = await this.UserRepository.save(newUser)
        return user.id
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