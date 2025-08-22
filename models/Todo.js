import mongoose from "mongoose"
const todoSchema = new mongoose.Schema({
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    isChecked:{
        type:Boolean,
        default: false
    }
}, {timestamps: true});

const todo = mongoose.model("Todo", todoSchema);
export default todo;