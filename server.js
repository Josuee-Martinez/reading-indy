const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");
const users = require("./routes/api/user");
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const review = require("./routes/api/review");
const image = require("./routes/api/image");

const path = require("path");

connectDB();
app.use(fileUpload());
app.use(express.json({ extended: false }));

app.use("/api/user", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/review", review);
app.use("/api/image", image);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server running on port 5000"));
