import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel',
        required: true,
    },
    fullName:{
        type: String,
    },
    senderModel: {
        type: String,
        enum: ['Teacher', 'Student'],
        required: true,
    },
    classId: {
        type: String,
        ref: 'Class',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;