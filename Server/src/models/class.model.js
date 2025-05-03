import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher', 
        required: true 
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }

});

const Class=mongoose.model("Class",classSchema);
export default Class;


