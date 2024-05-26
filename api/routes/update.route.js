const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/update.controller");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.put("/users/:id", updateUser);

module.exports = router;
