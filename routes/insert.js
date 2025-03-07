const express = require("express");
const students = require("../models/students");
const validateStudent = require("../middlewares/studentValidator");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const mongoose = require("mongoose");
const glow = require("notify-send");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, req.body.Enroll + ".jpeg");
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//===================== pre transfer to models ================

router.post("/", upload.single("Adhaar"), validateStudent, async (req, res) => {
  try {
    let arr = await students.find({ Enroll: req.body.Enroll });
    // const students = mongoose.model("students", studentSchema);
    if (arr.length === 0) {
      const file = req.file;

      if (!file) {
        throw new Error("No file uploaded.");
      }

      // Assuming the file is uploaded in the "Adhaar" field
      const fileName = req.body.Enroll + ".jpeg";
      const filePath = path.join(__dirname, "../public/images", fileName);

      // Save the image to the local folder after validation
      fs.writeFileSync(filePath, file.buffer); // Save file buffer to the disk
    }

    let data = req.body;
    await students.insertMany([data]);
    res.status(200).redirect("/");
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
