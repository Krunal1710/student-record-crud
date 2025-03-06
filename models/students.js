const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  Enroll: {
    type: Number,
    required: [true, "please enter enrollment!"],
    // unique: [true, "Student is already exist!"],
  },
  Name: { type: String },
  Email: { type: String },
  Course: { type: String },
  Adhaar: { type: String },
});

studentSchema.pre("insertMany", async (next, doc) => {
  let rid = doc[0].Enroll;
  let flag = false;
  let arr = await students.find({});
  arr.forEach((obj) => {
    if (obj.Enroll == Number(rid)) {
      flag = true;
    }
  });
  if (flag) {
    return next(new Error("Enroll is already exist!"));
  } else {
    next();
  }
});

const students = mongoose.model("students", studentSchema);

module.exports = students;
