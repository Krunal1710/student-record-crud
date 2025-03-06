const express = require("express");
const router = express.Router();
const studentSchema = require("../models/students");
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.Enroll + ".jpeg");
  },
});
const upload = multer({ storage: storage });

// update
router.post("/", upload.single("Adhaar"), async (req, res) => {
  try {
    const students = mongoose.model("students", studentSchema);
    await students.findOneAndReplace({ Enroll: req.body.Enroll }, req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(404).redirect("/");
  }
});

module.exports = router;
