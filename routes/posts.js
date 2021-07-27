/** @format */

const express = require("express");
const router = express.Router();
//importing model
const Post = require("../models/Post");

//get all the post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

//adds new post to the post collection
router.post("/addPost", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
    });

    const savedPost = await post.save();
    res.json({ success: true, savedPost });
  } catch (error) {
    res.json({ success: false, msg: "couldn't save post to DB" });
  }
});

// GET SPECIFIC POST BY ID
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json({ success: true, post });
  } catch (error) {
    res.json({ success: false, msg: "failed to fetch post" });
  }
});

// DELETING A POST
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId });
    res.json({ success: true, removedPost });
  } catch (error) {
    res.json({ success: false, msg: "failed to delete post" });
  }
});

// UPDATE A POST
router.patch("/:postId", async (req, res) => {
  try {
    updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json({ success: true, updatedPost });
  } catch (error) {
    res.json({ message: "failed to delete post" });
  }
});

module.exports = router;
