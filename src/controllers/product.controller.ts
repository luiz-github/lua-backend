import { Request, Response } from "express"
import ProductService from "../services/product.service"

class ProductController {
    private ProductService: ProductService

    constructor() {
        this.ProductService = new ProductService()
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

          await this.ProductService.createProduct(name, description, value)

          return res.status(201).json({
                success: true,
                message: "Product created with success"       
          })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            const { name, description, value } = req.body
            const productId = Number(req.params.id)      
            const product = await this.ProductService.getProductById(productId)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                })  
            }

            await this.ProductService.updateProduct(productId, name, description, value)

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

            await this.ProductService.deleteProduct(productId)

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
            const product = await this.ProductService.getAllProduct()

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

    getProductById = async (req: Request, res: Response) => {
        try {
            const productId = Number(req.params.id)
            const product = await this.ProductService.getProductById(productId)

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