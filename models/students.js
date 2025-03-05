const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  Enroll: {
    type: Number,
    require: [true, "please enter enrollment!"],
    unique: [true, "Student is already exist!"],
  },
  Name: { type: String },
  Email: { type: String },
  Course: { type: String },
  Adhaar: { type: String },
});

const students = mongoose.model("students", studentSchema);
module.exports = students;
