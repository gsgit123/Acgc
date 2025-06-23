import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    fileUrl: String,
    submittedAt: { type: Date, default: Date.now },
    feedback: String
})

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;