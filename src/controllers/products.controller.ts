import { Request, Response } from "express"
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

class ProductController {
    private ProductRepository: Repository<Product>

    constructor() {
        this.ProductRepository = AppDataSource.getRepository(Product)
    }

    createProduct = async (req: Request, res: Response) => {
        try {
          const { name, description, value } = req.body

          if (!name || !description || !value) {
                return res.status(400).json({
                    success: false,
                    message: "All fields must be completed"
                })
          }

          const newProduct = this.ProductRepository.create({
            name: name,
            description: description,
            value: value
          })

          await this.ProductRepository.save(newProduct)

          return res.status(200).json({
                success: true,
                message: "Product created with success"       
          })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Error while creating product"
            })
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            const { name, description, value } = req.body

            const productId = Number(req.params.id)          
            const product = await this.ProductRepository.findOne({
                where: {id: productId}
            })

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                })  
            }

            await this.ProductRepository.update(productId, {
                name: name || (await product).name,
                description: description || (await product).description,
                value: value || (await product).value
            })
    
            return res.status(200).json({
                success: true,
                message: "Product updated with success"
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            const productId = Number(req.params.id)
            
            await this.ProductRepository.softDelete(productId)

            return res.status(200).json({
                success: true,
                message: "Product deleted with success"
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

    getProduct = async (req: Request, res: Response) => {
        try {
            const product = await this.ProductRepository.find()

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Products not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: {
                    product
                }
            })
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
    }

    getOneProduct = async (req: Request, res: Response) => {
        try {
            const productId = req.params.id
            const product = await this.ProductRepository.findOne({
                where: {id: productId}
            })

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: {
                    product
                }
            })
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
    }
}

export default ProductController;