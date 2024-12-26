import express from 'express';
import { login, logout, register } from '../controllers/auth.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { createPost, deletePost, getPosts, getUser } from '../controllers/post.controllers.js';
import multer, { memoryStorage } from 'multer';

const router = express.Router();
const upload = multer({ storage : memoryStorage() });

// Authentication

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

// User controllers

router.get('/user/profile', authorize, getUser);

// Posts controllers

router.post('/post/create', authorize, upload.single('file'), createPost);
router.post('/post/delete/:id', authorize, deletePost);
router.get('/posts', authorize, getPosts);

export default router