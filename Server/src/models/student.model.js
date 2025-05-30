import mongoose from "mongoose"

const studentSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            default: "Student", 
            immutable: true,
        },

    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;