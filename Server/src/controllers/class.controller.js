import Class from '../models/class.model.js';
import Assignment from '../models/assignment.model.js';
import Submission from '../models/submission.model.js';
import Attendance from '../models/attendance.model.js';
import Student from '../models/student.model.js';
import Message from '../models/message.model.js';



function generateClassCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase(); 
}

export const createClass=async (req, res) => {

    const {name,subject}=req.body;
    try {
        if (!name || !subject) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const classCode = generateClassCode(); 

        const newClass = new Class({
            name,
            subject,
            classCode,
            createdBy: req.user, 
        });
        await newClass.save();
        res.status(201).json({
            _id: newClass._id,
            name: newClass.name,
            subject: newClass.subject,
            classCode: newClass.classCode,
            createdBy: newClass.createdBy,
            message: "Class Created Successfully",
        });
    } catch (error) {
        console.log("Error in createClass controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

    
}

export const getClass=async(req,res)=>{
    try {
        const teacherId = req.user._id;
    
        const classes = await Class.find({ createdBy: teacherId }).populate('students', 'fullName'); // Populate student names if necessary
    
        if (!classes || classes.length === 0) {
          return res.status(404).json({ message: "No classes found for this teacher." });
        }
    
        const result = classes.map((classItem) => ({
          _id: classItem._id,
          name: classItem.name,
          subject: classItem.subject,
          students: classItem.students, 
          classCode: classItem.classCode,
        }));
    
        return res.status(200).json({ classes: result });
      } catch (error) {
        console.error("Error fetching classes:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
      }
}


export const joinClass = async (req, res) => {
  const { classCode } = req.body;
  const studentId = req.user._id;

  if (!classCode) return res.status(400).json({ message: "Class code is required" });

  try {
    const foundClass = await Class.findOne({ classCode });
    if (!foundClass) return res.status(404).json({ message: "Class not found" });

    const alreadyJoined = foundClass.students.includes(studentId);
    if (alreadyJoined) return res.status(400).json({ message: "Already enrolled in this class" });

    foundClass.students.push(studentId);
    await foundClass.save();

    return res.status(200).json({ message: "Successfully joined the class" });
  } catch (err) {
    console.error("Join class error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentClasses = async (req, res) => {
    try {
      const studentId = req.user._id;
  
      const classes = await Class.find({ students: studentId }).populate('createdBy', 'fullName');
  
      return res.status(200).json({ classes });
    } catch (err) {
      console.error("Error fetching student classes:", err.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const getClassByCode = async (req, res) => {
  const { code } = req.params;

  try {
    const classData = await Class.findOne({ classCode: code })
      .populate('createdBy', 'fullName email')
      .populate('students', 'fullName email');

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({ class: classData });
  } catch (error) {
    console.error("Error fetching class by code:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClass = async (req, res) => {
  const { code } = req.params;

  try {
    // 1. Find class by classCode
    const foundClass = await Class.findOne({ classCode: code });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const classCode = foundClass.classCode;
    const classId = foundClass._id;

    // 2. Find and delete assignments
    const assignments = await Assignment.find({ classCode });
    const assignmentIds = assignments.map(a => a._id);

    await Submission.deleteMany({ assignmentId: { $in: assignmentIds } });
    await Assignment.deleteMany({ classCode });

    // 3. Delete attendance (if referencing classId)
    await Attendance.deleteMany({ class: classId });

    // 4. Delete messages (if referencing classId)
    await Message.deleteMany({ classId });

    // 5. Remove classCode from students’ classList (if applicable)
    await Student.updateMany({}, { $pull: { classList: classCode } });

    // 6. Delete class itself
    await Class.deleteOne({ _id: classId });

    return res.status(200).json({ message: "Class and all related data deleted successfully." });
  } catch (error) {
    console.error("Error deleting class:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

  
