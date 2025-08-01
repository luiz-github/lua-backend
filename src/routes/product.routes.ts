import { Router } from "express"
import ProductController from "../controllers/product.controller"

const router = Router();
const productsController = new ProductController();

// API routes
router.get("/", productsController.getProduct)
router.get("/:id", productsController.getProductById)
router.put("/:id", productsController.updateProduct)
router.post("/", productsController.createProduct)
router.delete("/:id", productsController.deleteProduct)

export default router;