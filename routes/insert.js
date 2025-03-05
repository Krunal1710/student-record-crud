const express = require("express");
const students = require("../models/students");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.Enroll + ".jpeg");
  },
});

const upload = multer({ storage: storage });

// Middleware to check if student ID exists
async function checkId(req, res, next) {
  let rid = req.body.Enroll;

  let flag = false;
  let arr = await students.find({});
  arr.forEach((obj) => {
    if (obj.Enroll == Number(rid)) {
      flag = true;
    }
  });

  if (!flag) {
    next();
  } else {
    arr.forEach(async (obj) => {
      if (obj.Enroll == Number(rid)) {
        await students.findOneAndReplace({ Enroll: rid }, req.body);
      }
    });
    return res.redirect("/");
  }
}

router.post("/", upload.single("Adhaar"), checkId, async (req, res) => {
  try {
    let data = req.body;
    await students.insertOne(data);

    res.redirect("/");
  } catch (error) {
    console.error("Error writing to students.json:", error);
    res.status(500).send("Error while inserting data!");
  }
});

module.exports = router;
