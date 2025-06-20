import express from 'express';
import Attendance from '../models/attendance.model.js';
import Class from '../models/class.model.js';
import Student from '../models/student.model.js';

const router = express.Router();


router.get('/class/:classCode/students', async (req, res) => {
  try {
    const { classCode } = req.params;
    const classData = await Class.findOne({ classCode }).populate('students', 'fullName email');

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const studentsWithAttendance = await Promise.all(
      classData.students.map(async (student) => {
        const totalDays = await Attendance.countDocuments({ class: classData._id, student: student._id });
        const daysPresent = await Attendance.countDocuments({ class: classData._id, student: student._id, status: 'present' });
        const attendancePercentage = totalDays > 0 ? ((daysPresent / totalDays) * 100).toFixed(2) : 'N/A';

        return {
          _id: student._id,
          fullName: student.fullName,
          email: student.email,
          totalDays,
          daysPresent,
          attendancePercentage
        };
      })
    );

    res.json({ students: studentsWithAttendance });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});



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

router.get('/summary/:classId/:studentId', async (req, res) => {
  const { classId, studentId } = req.params;
  try {
    const daysPresent = await Attendance.countDocuments({ class: classId, student: studentId, status: 'present' });
    const totalDays = await Attendance.countDocuments({ class: classId, student: studentId });

    res.json({ daysPresent, totalDays });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance summary' });
  }
});




export default router;
