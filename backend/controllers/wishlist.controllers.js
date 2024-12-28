import { Wishlist } from '../models/cart.models.js';

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body; // The product ID will be sent in the request body
    const userId = req.user._id; 

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
      await wishlist.save();
    } else {
      // Check if product is already in the wishlist
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to add product to wishlist', error });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove product from the wishlist
    wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to remove product from wishlist', error });
  }
};

// Get wishlist of a user
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ user: userId }).populate('products');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get wishlist', error });
  }
};

// Clear wishlist (optional)
export const clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Clear the wishlist
    wishlist.products = [];
    await wishlist.save();

    res.status(200).json({ message: 'Wishlist cleared', wishlist });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to clear wishlist', error });
  }
};
