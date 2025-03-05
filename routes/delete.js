const express = require("express");
const router = express.Router();
const studentSchema = require("../models/students");
const fs = require("fs");
const mongoose = require("mongoose");

// delete using id

router.get("/:id", async (req, res) => {
  try {
    const students = mongoose.model("students", studentSchema);
    let id = req.params.id;
    await students.deleteOne({ Enroll: id });
    if (fs.existsSync(`public/images/${id}.jpeg`)) {
      fs.unlink(`public/images/${id}.jpeg`, (err) => {
        console.log(err);
      });
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error while deleting student:", error);
    res.status(500).send("Error while deleting data!");
  }
});

module.exports = router;
