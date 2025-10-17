import Todo from '../models/Todo.js';

const addTodo = async(req,res)=>{
   try {
    const{title,description}=req.body;
    if(!title || !description){
        return res.status(500).json({message:"title and description not found"})
    }
    const newTodo = new Todo({title,description})
    await newTodo.save();
    res.status(201).json({message:"todo added successfully",newTodo})
   } catch (error) {
    res.status(500).json({message:"internal server error"})
   }
}

const getTodo =async(req,res)=>{
  const todos= await Todo.find()
  res.status(201).json({message:"successfully fetched",todos})
}

const updateTodo=async(req,res)=>{
  const {id}= req.params
  const updateTodo=await Todo.findByIdAndUpdate(id,req.body,{new:true})
  res.status(201).json({message:"updated successfully",updateTodo})
}


const deleteTodo = async(req,res)=>{
  await Todo.findByIdAndDelete(req.params.id)
  res.status(201).json({message:"deleted successfully"})
}

export {addTodo,getTodo,updateTodo,deleteTodo};