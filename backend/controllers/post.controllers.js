import Post from "../models/post.models.js";
import User from "../models/user.models.js";

export const getUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "user not found" });
    };
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "server error" })
  }
}

export const createPost = async (req, res) => {
  const userId = req.user._id;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (req.file) {
      const post = new Post({
        user: user._id,
        title: title,
        description: description,
        image: req.file.buffer,
        imageContentType: req.file.mimetype
      });
      await post.save();
      return res.status(201).json({ message: "Post created successfully." });
    } else {
      return res.status(400).json({ message: "Image is required to create a post." });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error." });
  }
};


export const deletePost = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  try {
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({ message : "user not found" });
    };
    const post = await Post.findById(postId);
    if(!post) {
      return res.status(404).json({ message : "post not found" });
    };
    await post.remove();
    return res.status(200).json({ message : "post deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "server error" });
  }
};

export const getPosts = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({ message : "user not found" });
    };
    const posts = await Post.find();
    posts.forEach(post => {
      post.image = Buffer.from(post.image).toString('base64');
    });
    return res.status(200).json({
      message : "posts fetched successfully",
      posts
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "server error" });
  }
}