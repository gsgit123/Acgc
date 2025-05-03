import express from "express";
import {signup,login,logout,checkAuth} from "../controllers/tauth.controller.js"
import { protectTRoute } from "../middleware/tauth.middleware.js";
const router=express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.get("/check",protectTRoute,checkAuth);

export default router;