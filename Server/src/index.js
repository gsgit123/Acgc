import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import sauthRoutes from "./routes/sauth.route.js"
import tauthRoutes from "./routes/tauth.route.js"



const app=express();
dotenv.config()


const PORT=process.env.PORT

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use("/api/sauth",sauthRoutes)
app.use("/api/tauth",tauthRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
