import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  names : { type : String, required : true },
  email : { type : String, required : true },
  password : { type : String, required : true },
  whatsappNumber : { type : String, required : true, default: '+250 735 461 543' },
}, { timestamps : true });

export const User = mongoose.model('user', userSchema);

export default User;