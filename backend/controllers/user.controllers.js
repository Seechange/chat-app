import User from "../models/user.model.js"

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

        return res.status(200).json(filterdUsers)
    } catch (error) {
        console.log('Error from getusersidebar !!!', error.message)
        return res.status(400).json({
            errMesage: "Internal Server Error"
        })
    }
}