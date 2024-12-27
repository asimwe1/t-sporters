import { Cart } from "../models/cart.models.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [], price: 0 });
    }

    if (cart.products.includes(productId)) {
      return res.status(400).json({ message: "Product is already in the cart." });
    }

    cart.products.push(productId);
    cart.price += product.price;

    await cart.save();

    return res.status(200).json({ message: "Product added to cart successfully.", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("products");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

// Update Cart
export const updateCart = async (req, res) => {
  const userId = req.user._id;
  const { products } = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({ message: "Products must be an array." });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const productDetails = await Product.find({ _id: { $in: products } });
    const totalPrice = productDetails.reduce((sum, product) => sum + product.price, 0);

    cart.products = products;
    cart.price = totalPrice;

    await cart.save();

    return res.status(200).json({ message: "Cart updated successfully.", cart });
  } catch (error) {
    console.error("Error updating cart:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

// Delete Cart
export const deleteCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    return res.status(200).json({ message: "Cart deleted successfully." });
  } catch (error) {
    console.error("Error deleting cart:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};
