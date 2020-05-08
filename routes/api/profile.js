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
    const profiles = await Profile.find().populate("user", ["name"]);
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
    console.error(err.meassage);
    res.status(500).send("server error");
  }
});

router.get("/goodreads/:id", (req, res) => {
  try {
    const options = {
      uri: `https://www.goodreads.com/user/show/${req.params.id}.xml?key=1dQ8N8cVpCf406mkHQgclQ`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "no user found" });
      }

      res.json(body);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
