import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  title : { type : String, required : true },
  description : { type : String, required : true },
  image : { type : Buffer, required : true },
  imageContentType : { type : String, required : true }
}, { timestamps : true });

export const Post = mongoose.model('posts', postSchema);

export default Post;