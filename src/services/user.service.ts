import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { UserDTO } from "../dto/user.dto";
import { StatusCodes as status } from 'http-status-codes'

export default class UserService {
    private UserRepository: Repository<User>
    

    constructor() {
        this.UserRepository =  AppDataSource.getRepository(User)
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