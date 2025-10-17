import express from 'express';
import { addTodo, deleteTodo, getTodo, updateTodo } from '../controllers/Todo.controller';


const router = express.Router();

router.post('/add',addTodo)

router.get("/alltodos",getTodo)

router.put("/:id",updateTodo)

router.delete("/:id",deleteTodo)

export default router