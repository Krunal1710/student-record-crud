const express = require("express");
const router = express.Router();

//importing routes files
const home = require("./routes/home");
const deleteStud = require("./routes/delete");
// const common_task = require("./routes/common_task");
const insert = require("./routes/insert");
const update = require("./routes/update");

// router.use(common_task.router);
router.use("/", home);
router.use("/delete", deleteStud);
router.use("/insert", insert);
router.use("/update", update);

module.exports = router;
