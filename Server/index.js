import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./src/lib/db.js"
import sauthRoutes from "./src/routes/sauth.route.js"
import tauthRoutes from "./src/routes/tauth.route.js"
import classRoutes from "./src/routes/class.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import attendanceRoutes from './src/routes/attendance.route.js';
import chatRoutes from "./src/routes/chat.route.js"
import AssignmentRoutes from "./src/routes/assignment.route.js"
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

const allowedOrigins = [
  "http://localhost:5173",
  "https://acgc-nu.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.use("/api/sauth", sauthRoutes);

app.use("/api/tauth", tauthRoutes);

app.use("/api/class", classRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/chat", chatRoutes);


app.use("/api/assignments", AssignmentRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
