import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import sauthRoutes from "./routes/sauth.route.js"
import tauthRoutes from "./routes/tauth.route.js"
import classRoutes from "./routes/class.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"



const app=express();
dotenv.config()


const PORT=process.env.PORT

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))


app.use("/api/sauth",sauthRoutes)
app.use("/api/tauth",tauthRoutes)
app.use("/api/class",classRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
