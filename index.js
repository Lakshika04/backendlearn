
import express from 'express'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
const app = express();

app.use(express.json())

const connectDb = async()=>{
    try{
        await mongoose.connect("mongodb+srv://lakshikabourai_db_user:OwgMQtE90zsJH5TK@lakshika-cluster.qy6jmlv.mongodb.net/?retryWrites=true&w=majority&appName=Lakshika-Cluster")
        console.log("database connected succesfully")
    }
    catch(error){
        console.log("connection failed",error)
    }
}

connectDb();

app.post("/signup",async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        console.log("Data Received:", name,email,password);
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create newuser
        const newuser = new User({name,email,password:hashedPassword});
        await newuser.save();
        res.status(201).json({message:"User created successfully"})
    }
    catch(error){
        console.error("error during signup:",error)
        res.status(500).json({message:"Internal server error"})
    }
})
app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(200).json({message:"User not found"});
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"})
        }
        
        const token = jwt.sign({id:user._id,email:user.email},"Khy0POz9KV5uk3zImnL/Pe2YVWaTkvJuLzWJ5Va08P2zyd2sXPin461DoTgTLpZG",{expiresIn:"1h"})

        res.status(200).json({message:"Login Successfully",user,token})
    }
    catch(error){
        console.error("error during login:", error)
        res.status(500).json({message:"Internal server error"})
    }
})
 app.listen(5000,()=>{
    console.log("server is running on 5000 port");
 })