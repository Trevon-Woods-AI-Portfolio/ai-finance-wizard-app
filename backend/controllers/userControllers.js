import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndCookie from "../utils/generateTokenAndCookies.js";

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    generateTokenAndCookie(newUser._id, res);

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in signupUser", details: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username: username });

    if (!userExists) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const userInfo = {
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
      tickerCards: userExists.tickerCards,
      watchlist: userExists.watchlist,
      analysis: userExists.analysis,
    };

    generateTokenAndCookie(userExists._id, res);

    res.status(200).json({ message: "Login successful", user: userInfo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in loginUser", details: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { userData } = req.body;

    const user = await User.findById(userData.id);
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    user.tickerCards = {
      tickerCard1: userData.tickerCard1,
      tickerCard2: userData.tickerCard2,
      tickerCard3: userData.tickerCard3,
      tickerCard4: userData.tickerCard4,
      tickerCard5: userData.tickerCard5,
    };
    user.watchlist = userData.watchlist;
    user.analysis = userData.analysisTicker;
    await user.save();

    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logout:", error);
  }
};

export { signupUser, loginUser, logoutUser };
