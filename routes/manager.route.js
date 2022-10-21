const express = require('express');
const managerController = require("../controller/manager.controller")
const { verifyToken } = require("../middleware/verifyToken")
const authorization = require("../middleware/authorization")

const router = express.Router();

router.get("/jobs", verifyToken, authorization("hiring-manager", "admin"), managerController.getJobs)

module.exports = router;
