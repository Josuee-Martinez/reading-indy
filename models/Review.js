const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  review: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile",
      },
      review: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      photo: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review = mongoose.model("review", ReviewSchema);
