import express from 'express';
import Message from '../models/message.model.js';
import Teacher from '../models/teacher.model.js';
import Student from '../models/student.model.js';

const router = express.Router();

router.post('/:classCode/send',async(req,res)=>{
    try{
        const {classCode}=req.params;
        const {content, senderId, senderModel} = req.body;

        let fullName;
        if (senderModel === 'Teacher') {
            const teacher = await Teacher.findById(senderId);
            if (!teacher) throw new Error('Teacher not found');
            fullName = teacher.fullName;
        } else if (senderModel === 'Student') {
            const student = await Student.findById(senderId);
            if (!student) throw new Error('Student not found');
            fullName = student.fullName;
        } else {
            throw new Error('Invalid sender model');
        }

        const message=new Message({
            content,
            sender: senderId,
            senderModel,
            fullName,
            classId: classCode
        });
        await message.save();
        res.status(201).json({message: "Message sent successfully", message});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "fail to send message", error: err.message});
    }
})

router.get('/:classCode',async (req,res)=>{
    try{
        const {classCode} = req.params;

        const messages= await Message.find({classId: classCode})
            .sort({createdAt: 1})

        res.status(200).json(messages);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "fail to fetch messages", error: err.message});
    }
})

export default router;