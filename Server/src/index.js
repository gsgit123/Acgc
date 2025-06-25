import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import sauthRoutes from "./routes/sauth.route.js"
import tauthRoutes from "./routes/tauth.route.js"
import classRoutes from "./routes/class.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import attendanceRoutes from './routes/attendance.route.js';
import chatRoutes from "./routes/chat.route.js"
import AssignmentRoutes from "./routes/assignment.route.js"
import { fileURLToPath } from 'url';
import path from "path"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use('/api/attendance', attendanceRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/assignments",AssignmentRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
