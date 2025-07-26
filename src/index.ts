import { AppDataSource } from "./data-source"
import productsRoutes from "./routes/products.routes"

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.use("/product", productsRoutes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

// Initialazing AppDataSource
AppDataSource.initialize()
                .then(() => console.log('db connected!'))
                .catch((error) => console.log(error))

export default app