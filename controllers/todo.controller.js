import Todo from "../models/Todo.js";


export const getTodos = async(req, res) => {
    const todos = await Todo.find({authorId: req.user.id}).sort({isChecked: 1});
    return res.json(todos);
}

export const addTodo = async (req, res) => {
    const {title, description} = req.body;
    const newTodo = new Todo({authorId: req.user.id, title, description });
    const savedTodo = newTodo.save();
    return res.status(200).json({message:"Todo added"});
}
export const updateTodo = async(req,res) => {
    const todoId = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body,{new:true});
    return res.json({message:"Todo updated"});
}
export const deleteTodo = async(req, res) => {
    const todoId = req.params.id;
    await Todo.deleteOne({_id: todoId});
    res.status(200).json({message:"Todo deleted..."})
}