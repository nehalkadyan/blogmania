const express = require("express");
const router = express.Router();
const { verifyUser } = require("../utils/verifyUser");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const { createPost } = require("../controllers/post.controller");
const { getUserPosts } = require("../controllers/post.controller");
const { getPost } = require("../controllers/post.controller");
const { createComment } = require("../controllers/post.controller");
const { editComment } = require("../controllers/post.controller");
const { deleteComment } = require("../controllers/post.controller");
const { postLike } = require("../controllers/post.controller");
const { updatePost } = require("../controllers/post.controller");
const { deletePost } = require("../controllers/post.controller");
const { getAllPosts } = require("../controllers/post.controller");

router.post("/create", verifyUser, createPost);
router.get("/post", verifyUser, getUserPosts);
router.put("/:postId/update", verifyUser, updatePost);
router.delete("/:postId/delete", verifyUser, deletePost);
router.get("/allposts", getAllPosts);
router.get("/post/:id", getPost);
router.post("/:postId/comments", createComment);
router.put("/:postId/:commentId", editComment);
router.delete("/delete/:postId/:commentId", deleteComment);
router.put("/:postId/like/postLike", postLike);

module.exports = router;
