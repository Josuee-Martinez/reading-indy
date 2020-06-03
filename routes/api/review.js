const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Review = require("../../models/Review");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.post("/", auth, async (req, res) => {
  const { review, book } = req.body.bookReview;
  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await await Profile.findOne({ user: req.user.id });
    console.log(profile);
    console.log(user.name);

    const bookReview = new Review({
      review,
      book,
      name: user.name,
      photo: profile.photo,
      profile,
      user: req.user.id,
    });

    const newBookReview = await bookReview.save();

    res.json(newBookReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "review not found" });
    }
    res.json(review);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "review not found" });
    }

    res.status(500).send("server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    await review.remove();

    res.json({ msg: "review removed" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "review not found" });
    }

    res.status(500).send("server error");
  }
});

router.post("/comment/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const review = await Review.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });

    const comment = {
      review: req.body.comment,
      photo: profile.photo,
      name: user.name,
      user: req.user.id,
    };

    review.comments.unshift(comment);

    await review.save();

    res.json(review.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    const comment = review.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "comment doesnt exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    const removeIndex = review.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    review.comments.splice(removeIndex, 1);

    await review.save();

    res.json(review.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
