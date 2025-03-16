const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");
// const fs = require("fs");

module.exports.createPost = async (req, res) => {
  const { title, description, category, caption } = req.body;
  console.log("body", req.body);
  const imageUrl = req.imageUrl;
  const userId = req.user.id;

  try {
    const newPost = new Post({
      title,
      description,
      category,
      image: imageUrl,
      caption,
      createdBy: userId,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.log("Error creating new post", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updatePost = async (req, res) => {
  const { title, description, category, caption } = req.body;

  console.log(title, description, category, caption);

  const { postId } = req.params;

  const imageUrl = req.imageUrl

  console.log("imageUrl", imageUrl)

  try {
    const post = await Post.findById(postId);

    if (title) {
      post.title = title;
    }

    if (description) {
      post.description = description;
    }

    if (category) {
      post.category = category;
    }

    if(imageUrl){
      post.image = imageUrl
    }

    if (caption) {
      post.caption = caption;
    }

    await post.save();
    res.status(201).json({ message: "post updated", post });
  } catch (err) {
    console.log("Error updating post", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (err) {
    console.log("Error deleting post", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new Error("User is not authorized");
    }

    const userPosts = await Post.find({ createdBy: userId });
    res.status(200).json({ posts: userPosts });
  } catch (err) {
    console.log("Error fetching posts", err);
    res.status(500).json("Internal Server Error");
  }
};

module.exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const postData = await Post.findById(id)
      .populate('createdBy') 
      .populate({
        path: 'comments',
        populate: {
          path: 'createdBy', 
          model: 'User'
        }
      });

    if (!postData) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Extract user data from comments
    const userComments = postData.comments.map(comment => ({
      text: comment.text,
      createdBy: {
        id: comment.createdBy._id,
        email: comment.createdBy.email,
        username: comment.createdBy.username
      }
    }));

    res.status(200).json({ 
      message: 'Post found', 
      post: postData, 
      userComments 
    });
  } catch (err) {
    console.error('Error fetching post', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.getAllPosts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query = { category };
    }

    const posts = await Post.find(query).populate("createdBy", [
      "email",
      "image",
    ]);
    console.log("posts",posts)

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.createComment = async (req, res) => {
  const { text, email } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findOne({email : email})

    const comment = new Comment({
      text,
      createdBy: user._id,
      post : postId,
    })

    await comment.save()

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ message: "Comment added successfully", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.editComment = async (req, res) => {
  const {commentId } = req.params;
  const { text } = req.body;
  
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.text = text;
    await comment.save();

    
    res.status(200).json({ message: "Comment edited successfully",  });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteComment = async (req, res) => {
  const {postId, commentId } = req.params;

  try {

    await Comment.deleteOne({_id : commentId});

    const post = await Post.findById(postId);

    const filteredComments = post.comments.filter((c) => c._id.toString() !== commentId);
    post.comments = filteredComments;
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.postLike = async (req, res) => {
  const { postId } = req.params;
  const { email } = req.body;

  try {
    const post = await Post.findById(postId);

    const alreadyLiked = post.likedByUsers.includes(email);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (alreadyLiked) {
      post.numberOfLikes -= 1;
      post.likedByUsers = post.likedByUsers.filter((user) => user !== email);
    } else {
      post.numberOfLikes += 1;
      post.likedByUsers.push(email);
    }

    await post.save();

    res.status(200).json({
      numberOfLikes: post.numberOfLikes,
      likedByUsers: post.likedByUsers,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
