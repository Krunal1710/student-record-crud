const express = require("express");
const students = require("../models/students");
const router = express.Router();

// router.use(common_task.router);
router.get("/", async (req, res) => {
  try {
    let arr = await students.find({});
    res.render("home", { students: arr });
  } catch (err) {
    console.log("ERROR while rendering home page");
  }
});

module.exports = router;
