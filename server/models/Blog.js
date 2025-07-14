import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,

    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        default:''
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

},{timestamps:true});

const Blog = mongoose.model("Blog",BlogSchema);
export default Blog;