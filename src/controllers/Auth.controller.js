import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const signup =async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        console.log("data received",name,email,password);
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user exist"})
        }

           const salt = await bcrypt.genSalt(10);
           
            const hashedPassword = await bcrypt.hash(password,salt);


            //create new user

            const newuser = new User({name,email,password:hashedPassword});
            await newuser.save();
            res.status(201).json({message:"user created successfully"})

    }
    catch(error){
        console.error("error during signup:",error)
        res.status(500).json({message:"internal server error"})
    }
  }

  

const login =async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
           return res.status(200).json({message:"user not found"});
        }
          const isPasswordValid = await bcrypt.compare(password,user.password);
          if(!isPasswordValid){
            return res.status(400).json({message:"invalid password"})
          }

          const token = jwt.sign({id:user._id,email:user.email},"lakshika",{expiresIn:"1hr"})

          res.status(200).json({message:"login successfully",user,token})

    }
    catch(error){
        console.error("error in login:",error)
        res.status(500).json({message:"internal server error"})
    }
  }

  export {signup , login};