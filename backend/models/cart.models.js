import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  products : { type : [mongoose.Schema.Types.ObjectId], ref : 'Product' },
  user : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  price : { type : Number, default : 0.0 }
});

const productSchema = mongoose.Schema({
  name : { type : String, required : true },
  
  discount : { type : Number, default : 0.0 },
  rating : { type : Number, default : 0.0 },
  ratingCount : { type : Number, default : 0 },

  description : { type : String, required : true },
  image : { type : Buffer, required : true },
  imageContentType : { type : String, required : true },
  price : { type : Number, default : 0.0 }
}, { timestamps : true });

export const Product = mongoose.model('products', productSchema);
export const Cart = mongoose.model('carts', cartSchema);

export default { Product, Cart };
