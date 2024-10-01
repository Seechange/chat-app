import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(400).json({
                errMessage: "Unauthorized - No Token Provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).json({
                errMessage: "Unauthorized - Invalid Token"
            })
        }

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            return res.status(400).json({
                errMessage: "User not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        return res.status(400).json({
            errMessage: "Internal server error"
        })
    }
}

export default protectRoute