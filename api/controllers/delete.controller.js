const User = require("../models/UserModel");

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToBeDeleted = await User.findByIdAndDelete(id);

    if (!userToBeDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("Error deleting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
