import express from "express"
import { config } from "dotenv"
import helmet from "helmet"
import multer from "multer"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.js"
import todoRoutes from "./routes/todo.js"






const app =express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

config();


const PORT= process.env.PORT || 4000;
const MONGO_URI= process.env.MONGO_URL;



app.get("/", (req,res) => {
    res.status(200).json({message:"Welcome to TODO app API"})
})



mongoose.connect(MONGO_URI).then(() =>console.log('Mongodb connected right now...'))
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})