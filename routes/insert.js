const express = require("express");
const students = require("../models/students");
const validateStudent = require("../middlewares/studentValidator");
const router = express.Router();
const multer = require("multer");
// const mongoose = require("mongoose");
const glow = require("notify-send");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.Enroll + ".jpeg");
  },
});

const upload = multer({ storage: storage });

//===================== pre transfer to models ================

router.post("/", upload.single("Adhaar"), validateStudent, async (req, res) => {
  try {
    // const students = mongoose.model("students", studentSchema);
    let data = req.body;
    await students.insertMany([data]);
    res.redirect("/");
  } catch (error) {
    // console.error("Error writing to students.json:", error);
    glow.notify(error.message);
    res.status(404).redirect("/");
  }
});

module.exports = router;

// Middleware to check if student ID exists
// async function checkId(req, res, next) {
//   let rid = req.body.Enroll;

//   let flag = false;
//   let arr = await students.find({});
//   arr.forEach((obj) => {
//     if (obj.Enroll == Number(rid)) {
//       flag = true;
//     }
//   });

//   if (!flag) {
//     next();
//   } else {
//     arr.forEach(async (obj) => {
//       if (obj.Enroll == Number(rid)) {
//         await students.findOneAndReplace({ Enroll: rid }, req.body);
//       }
//     });
//     return res.redirect("/");
//   }
// }
