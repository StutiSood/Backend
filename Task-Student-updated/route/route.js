const express = require('express')
const controller = require("../controller/apiMethods")
const router = express.Router();

router.get("/getDetails",controller.getDetails);
router.get("/getOneStudent/:_id", controller.getOneStudent);
router.post("/postDetails", controller.postDetails);
router.post("/addSubMarks", controller.addSubMarks);
router.put("/updateDetails/:_id", controller.updateDetails);
router.delete("/deleteDetail/:_id", controller.deleteDetail);

module.exports = router;