import express from "express";
import {signup,login,logout,checkAuth} from "../controllers/sauth.controller.js"
import { protectSRoute } from "../middleware/sauth.middleware.js";
const router=express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.get("/check",protectSRoute,checkAuth);

export default router;