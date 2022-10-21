const jwt = require("jsonwebtoken")
const { promisify } = require("util");
const { findSpecificJobs } = require("../services/manager.service");

exports.getJobs = async (req, res) => {
    try {
        const token = req?.headers?.authorization?.split(" ")?.[1];

        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET)
        req.user = decoded;

        const managerJobs = await findSpecificJobs(req.user);

        res.status(200).json({
            status: "Successful",
            message: "Successfully Fetched Jobs",
            data: managerJobs
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't Get Jobs",
            error: error.message
        })
    }
}
