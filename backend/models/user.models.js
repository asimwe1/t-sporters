import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  names : { type : String, required : true },
  email : { type : String, required : true },
  password : { type : String, required : true }
}, { timestamps : true });

export const User = mongoose.model('user', userSchema);

export default User;