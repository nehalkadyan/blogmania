const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");
// const fs = require("fs");

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  // const { originalname, path } = req.file;
  // const parts = originalname.split(".");
  // const ext = parts[parts.length - 1];
  // const newPath = path + "." + ext;
  // fs.renameSync(path, newPath);
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if (req.file) {
    //   user.image = newPath;
    // } else {
    //   user.image = image;
    // }

    if (username) {
      user.username = username;
    }

    if (password) {
      const hashedPass = await bcryptjs.hash(password, 10);
      user.password = hashedPass;
    }

    await user.save();
    const { password: pass, ...rest } = user._doc;

    res.json({ message: "User updated successfully", rest });
  } catch (error) {
    console.log("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
