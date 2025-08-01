import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export default class UserService {
    private UserRepository: Repository<User>

    constructor() {
        this.UserRepository =  AppDataSource.getRepository(User)
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

    async getUserById(userId) {
        return await this.UserRepository.findOne({
            where: { id: userId}
        })
    }
}