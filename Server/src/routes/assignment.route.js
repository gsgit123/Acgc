import express from 'express'

const router=express.Router();

import Assignment from '../models/assignment.model.js';
import Submission from '../models/submission.model.js';

router.post('/', async (req, res) => {
  
  const { title, description, classCode, deadline, fileUrl, createdBy } = req.body;

  try {
    const assignment = await Assignment.create({
      title,
      description,
      classCode,
      deadline,
      fileUrl,
      createdBy: createdBy._id || createdBy
    });

    res.status(201).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/:classCode', async (req, res) => {
  const assignments = await Assignment.find({ classCode: req.params.classCode }).sort({ createdAt: -1 });
  res.json(assignments);
});


router.post('/submit', async (req, res) => {
  const { assignmentId, studentId, fileUrl } = req.body;
  try{
    const existing = await Submission.findOne({ assignmentId, studentId });
  if (existing) return res.status(400).json({ message: 'Already submitted.' });

  const submission = await Submission.create({ assignmentId, studentId, fileUrl });
  res.status(201).json(submission);
  }catch(error){
    console.log(error)
  }
});

router.get('/submissions/:assignmentId', async (req, res) => {
  const submissions = await Submission.find({ assignmentId: req.params.assignmentId }).populate('studentId', 'fullName');
  res.json(submissions);
});

router.delete('/:assignmentId',async(req,res)=>{
  try{
    const {assignmentId}=req.params;
    await Submission.deleteMany({assignmentId});
    await Assignment.findByIdAndDelete(assignmentId);
    res.status(200).json({ message: 'Assignment and its submissions deleted' });


  }
  catch(error){
    console.log(error, "delete fail");
    res.status(500).json({error:"failed to delete"})
  }
})

export default router;
