import { AppDataSource } from "./data-source"
import productRoutes from "./routes/product.routes"
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"

const cookieParser = require('cookie-parser');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/product", productRoutes)
app.use("/user", userRoutes)
app.use("/auth", authRoutes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

// Initialazing AppDataSource
AppDataSource.initialize()
                .then(() => console.log('db connected!'))
                .catch((error) => console.log(error))

export default app