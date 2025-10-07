import express from 'express'
import mongoose from 'mongoose'
import User from './models/User.js';
const app= express();

app.use(express.json())



const connectDb = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://lakshikabourai_db_user:OwgMQtE90zsJH5TK@lakshika-cluster.qy6jmlv.mongodb.net/?retryWrites=true&w=majority&appName=Lakshika-Cluster")
        console.log("🚀 database connect successfully")
    }
    catch(error){
        console.error("❌ connection failed",error)
    }
}
connectDb();

app.post("/signup", async (req,res)=>{
    try {
        const {name , email ,password} = req.body;
        console.log("Data Received:", name, email, password);
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        // Create a new user 
        const newuser = new User({name,email,password});
        await newuser.save();

        res.status(201).json({message:"User created Successfully"})
    } catch (error) {
        console.error("Error during signup:",error)
        res.status(500).json({message:"Internal Server Error"})
    }
})

app.post("/login",async (req, res)=>{
    try{
        const {email, password}= req.body;
        const user = await User.findOne({email, password});
        if(!user){
            return res.status(500).json({message:"User nhi mila"});
        }
        res.status(200).json({message:"Login Successfully",user})
    }catch(error){

        console.error("Error during Login:", error)
        res.status(500).json({message:"Internal Server Error"})
    }
})


app.listen(5000,()=>{
    console.log("server is running on 5000 port");
})