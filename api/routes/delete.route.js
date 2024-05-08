const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controllers/delete.controller");

router.delete("/user/:id", deleteUser);

module.exports = router;
