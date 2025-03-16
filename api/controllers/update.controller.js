const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");
// const fs = require("fs");

module.exports.updateUser = async (req, res) => {
  const id = req.user.id;
  const { username, password } = req.body;

  const imageUrl = req.imageUrl;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if the username is already taken

    if (username) {
      const existingUser = await User.aggregate([
        {
          $match: {
            username: username, 
            _id: { $ne: user._id } 
          }
        },
        {
          $limit: 1 
        }
      ]);

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Username already taken. Try a different username." });
      }

      user.username = username;
    }


    if (username) {
      user.username = username;
    }

    if (password) {
      const hashedPass = await bcryptjs.hash(password, 10);
      user.password = hashedPass;
    }

    if(imageUrl){
      user.image = imageUrl;
    }

    await user.save();
    const { password: pass, ...rest } = user._doc;

    res.json({ message: "User updated successfully", rest });
  } catch (error) {
    console.log("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
