const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/update.controller");
const upload = require("../upload");

router.put("/users/:id", upload.single("image"), updateUser);

module.exports = router;
