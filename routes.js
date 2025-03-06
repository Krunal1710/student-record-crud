const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");

//importing routes files
const home = require("./routes/home");
const deleteStud = require("./routes/delete");
const insert = require("./routes/insert");
const update = require("./routes/update");
const swaggerFile = require("./swagger/swagger.json");

// router.use(common_task.router);
router.use("/", home);
router.use("/delete", deleteStud);
router.use("/insert", insert);
router.use("/update", update);
router.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = router;
