import express from 'express';
import Attendance from '../models/attendance.model.js';
import Class from '../models/class.model.js';
import Student from '../models/student.model.js';

const router = express.Router();


router.get('/class/:classId/date/:date', async (req, res) => {
  try {
    const { classId, date } = req.params;
    const attendance = await Attendance.find({ class: classId, date: new Date(date) })
      .populate('student', 'fullName email');
    res.json({ attendance });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch attendance' });
  }
});


router.post('/class/:classId/date/:date', async (req, res) => {
  try {
    const { classId, date } = req.params;
    const { attendance } = req.body; 
    await Attendance.deleteMany({ class: classId, date: new Date(date) });

    const records = attendance.map(a => ({
      class: classId,
      student: a.studentId,
      date: new Date(date),
      status: a.status
    }));
    await Attendance.insertMany(records);
    res.json({ message: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark attendance' });
  }
});

export default router;
