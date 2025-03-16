const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/update.controller");
const upload = require("../middlewares/multer/multer");
const uploadSingle = require("../middlewares/upload/uploadSingle");
const { verifyUser } = require("../utils/verifyUser");


router.put("/users/update", verifyUser,  upload.single("image"), uploadSingle,  updateUser);

module.exports = router;
