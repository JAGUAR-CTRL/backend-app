import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, 
        unique:true
    },
    password: {
        type:String,
        min: 8,
        required:true
    },
}, {timestamps: true});

const user = mongoose.model("User", userSchema);
export default user;