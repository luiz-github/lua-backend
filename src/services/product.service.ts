import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Product } from "../entity/Product";

export default class ProductService {
    private ProductRepository: Repository<Product>

    constructor() {
        this.ProductRepository = AppDataSource.getRepository(Product)
    }

    async createProduct(name: string, description: string, value: number) {
        const newProduct = this.ProductRepository.create({
            name: name,
            description: description,
            value: value
        })

        return await this.ProductRepository.save(newProduct)
    }

    async updateProduct(productId: number, name: string, description: string, value: number) {
        return await this.ProductRepository.update(productId, {
            name: name,
            description: description,
            value: value
        })
    }

    async deleteProduct(productId: number) {
        return await this.ProductRepository.softDelete(productId)
    }

    async getAllProduct() {
        return await this.ProductRepository.find()
    }

    async getProductById(productId: number) {
        return await this.ProductRepository.findOne({
            where: {id: productId}
        })
    }
}