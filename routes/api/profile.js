const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.get("/me", auth, async (req, res) => {
  try {
    console.log(req.user);
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!profile) {
      return res.status(400).json({ msg: "no profile for user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/", auth, async (req, res) => {
  const { location, bio, favoriteGenre, favoriteAuthor } = req.body;

  const profileData = {};
  profileData.user = req.user.id;
  if (location) profileData.location = location;
  if (bio) profileData.bio = bio;
  if (favoriteGenre) profileData.favoriteGenre = favoriteGenre;
  if (favoriteAuthor) profileData.favoriteAuthor = favoriteAuthor;

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileData },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.meassage);
    res.status(500).send("server error");
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "this user was removed from our records" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.put("/photo", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) return res.status(400).json({ msg: "Profile not found" });

  if (!req.files) {
    return res.status(400).json({ msg: "nomfile" });
  }

  const file = req.files.file;

  file.mv(`./client/public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }

    await Profile.findOneAndUpdate({ user: req.user.id }, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

module.exports = router;
