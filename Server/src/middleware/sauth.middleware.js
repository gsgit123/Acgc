import jwt from "jsonwebtoken"
import Student from "../models/student.model.js"

export const protectSRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt

        if(!token){
            return res.status(401).json({message:"Unauthorized-No Token Provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"Unauthorized-Invalid Token"})
        }
        const user=await Student.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        req.user=user
        next()
    }
    catch(error){
        console.log("error in protect middleware: ",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}