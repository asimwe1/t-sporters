import User from "../models/user.models.js";
export const getUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    };
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({ message : 'Server error' });
  }
}