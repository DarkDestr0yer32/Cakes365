import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import cakeRouter from "./routes/cakeRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import orderRoutes from "./routes/orderRoutes.js"

// app config
const app = express();
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//api endpoints
app.use("/api/cake", cakeRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/reviews", reviewRouter)
app.use('/api/order', orderRoutes);


app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
