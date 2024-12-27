import { Product } from "../models/cart.models.js";

export const createProduct = async (req, res) => {
  const { name, price, priceBeforeDiscount, description, ratingStars, ratingCount } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ message: "Name, price, and description are required." });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      priceBeforeDiscount: priceBeforeDiscount || null,
      description,
      ratingStars: ratingStars || 0,
      ratingCount: ratingCount || 0,
    });

    if (req.file) {
      newProduct.image = req.file.buffer;
      newProduct.imageContentType = req.file.mimetype;
    }

    await newProduct.save();

    return res.status(201).json({ message: "Product created successfully.", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ message: "Product updated successfully.", product });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};
