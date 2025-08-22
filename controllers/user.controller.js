import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const registerUser = async (req, res)=> {
try {
        const {firstname,lastname, email, password} = req.body;
        const possibleUser = await User.findOne({email});
        if(possibleUser) return res.json({message:"There is a user under this email address"})
       
        const hashedPassword =await bcrypt.hash(password, await bcrypt.genSalt(10));
        const user = new User({firstname, lastname, email, password:hashedPassword});
        const savedUser = await user.save();
        
        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })
        return res.status(201).json({token});
} catch (error) {
    res.status(200).json({message:error.message});
    console.log(error);
}
}

export const loginUser = async (req, res)=> {
    try {
        const {email, password} = req.body;
        const user  = await User.findOne({email});
        if(!user) return res.status(200).json({message:"No user found. Try again or create an account"})
        const doesPasswordMatch = await bcrypt.compare(password, user.password);
            if(!doesPasswordMatch){
                return res.status(200).json({message:"Invalid user credentials"});
        }
    
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })
    
     return res.status(201).json({token});
    } catch (error) {
        console.log('Error:', error);
        res.json({message: error.message})
    }
    }


    export const getAllUsers = async(req, res) => {
        const users = await User.find();
        return res.status(200).json(users);
    }

    export const getUser = async(req,res) => {
        const user = await User.findById(req.user.id);
        return res.json(user);
    }

    export const getSpecificUser = async (req,res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user) return res.json({message:"There is no user with this ID"})
        return res.json(user)

    }