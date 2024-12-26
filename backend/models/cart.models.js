import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  products : { type : [mongoose.Schema.Types.ObjectId], ref : 'Product' },
  user : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  price : { type : Number, default : 0.0 }
});
