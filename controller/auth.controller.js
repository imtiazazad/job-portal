const { signupService, findUserByEmailService } = require("../services/auth.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(200).json({
            status: "Successful",
            message: "Successfully Created Account",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't Create Account",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "failed",
                error: "Please Provide All Your Credentials"
            });
        }

        const user = await findUserByEmailService(email);

        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "No User Found Please Create a Account"
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "failed",
                message: "Password Is not Valid"
            })
        }

        const token = generateToken(user);
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "Successful",
            message: "Successfully Login",
            data: {
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Couldn't Login",
            error: error.message
        })
    }
}

exports.getMe = async (req, res) => {
    try {
        const user = await findUserByEmailService(req.user?.email);

        res.status(200).json({
            status: "Successful",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Couldn't Login",
            error: error.message
        })
    }
}
