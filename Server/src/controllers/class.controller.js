import Class from "../models/class.model.js";


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
        console.log(teacherId)
    
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