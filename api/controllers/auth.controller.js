const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPass = await bcryptjs.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPass });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User successfully created", user: newUser });
  } catch (err) {
    console.log("Error creating user", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.json(rest);
  } catch (err) {
    console.log("Error loggin in user", err);
    res.status(500).json({ message: "Couldn't sign in" });
  }
};
