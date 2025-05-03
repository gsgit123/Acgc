import express from 'express';
import { createClass, getClass } from '../controllers/class.controller.js';
import { protectTRoute } from '../middleware/tclass.middleware.js'; 

const router=express.Router();

router.get("/",protectTRoute,getClass)

router.post("/create",protectTRoute,createClass);


export default router;