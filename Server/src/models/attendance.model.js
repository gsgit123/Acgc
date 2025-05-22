import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;