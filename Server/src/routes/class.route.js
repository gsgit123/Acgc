import express from 'express';
import { createClass, getClass, getStudentClasses, joinClass } from '../controllers/class.controller.js';
import { protectTRoute } from '../middleware/tclass.middleware.js'; 
import { protectSRoute } from '../middleware/sauth.middleware.js';

const router=express.Router();

router.get("/",protectTRoute,getClass)

router.post("/create",protectTRoute,createClass);

router.post("/join",protectSRoute,joinClass);

router.get("/student", protectSRoute, getStudentClasses);



export default router;