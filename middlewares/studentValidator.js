const JOI = require("joi");
const { notify } = require("notify-send");

const validateStudent = (req, res, next) => {
  const schema = JOI.object({
    Enroll: JOI.number().required().min(1).max(50),
    Name: JOI.string().min(2).max(20),
    Email: JOI.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
    Course: JOI.string(),
  });
  console.log(req.body);
  
  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    
    notify(error.message);
    return res.redirect("/");
  }
  next();
};

module.exports = validateStudent;
