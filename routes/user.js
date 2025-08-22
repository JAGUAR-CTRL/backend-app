import { Router } from "express";
import {verifyToken} from "./../middleware/verifyToken.js";
import { loginUser, registerUser, getAllUsers , getUser, getSpecificUser} from "../controllers/user.controller.js";
const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({message:"Beginning of user routes"});
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get/all",verifyToken,getAllUsers);
router.get("/get/me",verifyToken,getUser);
router.get("/get/:id",verifyToken,getSpecificUser);


export default router;