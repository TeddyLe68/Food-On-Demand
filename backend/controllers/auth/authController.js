import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../../lib/utils/generateToken.js";

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
    );
    // console.log(isPasswordCorrect);
    // check email exist or not
    if (!isPasswordCorrect || !user) {
      return res.json({ message: "Invalid email or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      message: "You logged in successfully",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server" });
  }
};

// register user
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // check format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    // check user exist or not
    const checkEmailExist = await User.findOne({ email });
    if (checkEmailExist) {
      return res.json({
        success: false,
        message: "Email is already taken, please try again",
      });
    }
    // strong password
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 character long",
      });
    }
    // hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    // console.log(newUser);
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "You registered successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user" });
    }
  } catch (error) {
    console.log("Erorr in register controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// logout
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // destroy cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { loginUser, registerUser, logoutUser };
