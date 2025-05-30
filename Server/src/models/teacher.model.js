import mongoose from "mongoose"

const teacherSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        role: {
            type: String,
            default: "Teacher", 
            immutable: true,
        },
    },
    {
        timestamps:true
    }
);

const Teacher=mongoose.model("Teacher",teacherSchema);
export default Teacher;