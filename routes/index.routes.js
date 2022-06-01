const router = require("express").Router();

router.use("/", require("./message.routes"));

module.exports = router;
