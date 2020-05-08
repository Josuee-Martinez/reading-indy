const { Router } = require("express");
const router = Router();
const auth = require("../../middleware/auth");

const Image = require("../../models/Image");

router.post("/upload", auth, async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;
    console.log(req.files.file.name);
    console.log(req.user);

    file.mv(`./client/public/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });

    // newImage = new Image({
    //   fileName: file.name,
    //   filePath: `/uploads/${file.name}`,
    // });
    const imageData = {};
    imageData.user = req.user.id;
    imageData.fileName = file.name;
    imageData.filePath = `/uploads/${file.name}`;

    let img = await Image.findOneAndUpdate(
      { user: req.user.id },
      { $set: imageData },
      { new: true, upsert: true }
    );
    res.json(img);
    // let img = await newImage.save();
    // res.json(img);
  } catch (error) {
    console.error(error);
  }
  // if (req.files === null) {
  //   return res.status(400).json({ msg: "No file uploaded" });
  // }

  // const file = req.files.file;

  // file.mv(`./client/public/uploads/${file.name}`, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send(err);
  //   }

  //   res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  // });
});

router.get("/myphoto", auth, async (req, res) => {
  try {
    const img = await Image.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!img) {
      return res.status(400).json({ msg: "no image for user" });
    }

    res.json(img);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const image = await Image.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);

    if (!image) return res.status(400).json({ msg: "Profile not found" });

    res.json(image);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
