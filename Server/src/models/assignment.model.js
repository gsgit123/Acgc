import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    fileUrl: String,
    classCode: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    deadline: Date,
    createdAt: { type: Date, default: Date.now }

})


const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;