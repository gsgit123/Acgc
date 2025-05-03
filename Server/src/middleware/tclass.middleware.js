import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.model.js";

export const protectTRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized - No Token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decoded.userId).select("-password");

    if (!teacher) return res.status(401).json({ message: "Unauthorized - No User Found" });

    req.user = teacher;
    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
