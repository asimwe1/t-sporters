import express from 'express';
import { login, logout, register } from '../controllers/auth.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { getCart, addToCart, deleteCart, updateCart } from '../controllers/cart.controllers.js';
import multer, { memoryStorage } from 'multer';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controllers.js';
import { getUser } from '../controllers/user.controllers.js';

const router = express.Router();
const upload = multer({ storage : memoryStorage() });

// Authentication

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

// User controllers

router.get('/user/profile', authorize, getUser);

// Product Routes

router.post('/post/create', upload.single('file'), createProduct);
router.post('/products/update', authorize, updateProduct)
router.post('/products/delete/:id', authorize, deleteProduct);
router.get('/products', authorize, getAllProducts);
router.get('/products/:id', authorize, getProductById);

// Cart routes

router.post('/cart/add', authorize, addToCart);
router.get('/cart', authorize, getCart);
router.post('/cart/remove/:id', authorize, deleteCart);
router.post('/cart/:id', authorize, updateCart);


export default router