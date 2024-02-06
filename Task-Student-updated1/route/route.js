const express = require('express')
const controller = require("../controller/apiMethods")
const auth = require("../auth/auth")
const router = express.Router();

router.get("/getDetails",controller.getDetails);
router.get("/getOneStudent/:_id", controller.getOneStudent);
router.post("/postDetails", controller.postDetails);
router.post("/addSubMarks/:_id", controller.addSubMarks);
router.put("/updateDetails/:_id", controller.updateDetails);
router.delete("/deleteDetail/:_id", controller.deleteDetail);

//router.post("/login/:_id", auth.login);
router.post("/login", auth.login)
router.post("/verify", auth.verify, auth.verifyToken)

module.exports = router;