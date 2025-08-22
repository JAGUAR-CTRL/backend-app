import { Router } from "express";
import { updateTodo, deleteTodo, addTodo, getTodos } from "../controllers/todo.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();

router.get("/get/all", verifyToken, getTodos);
router.post("/add", verifyToken, addTodo);
router.put("/update/:id", verifyToken, updateTodo);
router.delete("/delete/:id", verifyToken, deleteTodo);

export default router;