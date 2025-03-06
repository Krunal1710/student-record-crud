const express = require("express");
const router = express.Router();
const students = require("../models/students");
const validateStudent = require("../middlewares/studentValidator");
const multer = require("multer");
const glow = require("notify-send");
// const mongoose = require("mongoose");

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
router.post("/", upload.single("Adhaar"), validateStudent, async (req, res) => {
  try {
    // const students = mongoose.model("students", studentSchema);
    await students.findOneAndReplace({ Enroll: req.body.Enroll }, req.body);
    glow.notify("Student details updated!!");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(404).redirect("/");
  }
});

module.exports = router;
