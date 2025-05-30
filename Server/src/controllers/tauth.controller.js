import Teacher from "../models/teacher.model.js"
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs"

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try{
        if(!fullName||!email||!password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password Must be 6 characters long"});
        }
        const user=await Teacher.findOne({email})
        if(user)return res.status(400).json({message:"email already exists"});
        
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new Teacher({
            fullName,
            email,
            password:hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                message:"Teacher Created Successfully",
            });
        }
        else{
            res.status(400).json({message:"invalid user data"});
        }

    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await Teacher.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            message:"Teacher Login Successfully",
        });
    }
    catch(error){
        console.log("error in login controller ",error.message);
        res.status(500).json({message:"Internal Server error"})
    }
}
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out Successfully"})
    }
    catch(error){
        console.log("error in logout controller ",error.message);
        res.status(500).json({message:"Internal Server error"})
    }
}
export const checkAuth=async(req,res)=>{
    try{
        res.status(200).json(req.user);
        // console.log("hi")
        // console.log(req.user)
    }
    catch(error){
        console.log("error in checkauth: ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}