import User from "../models/user.model.js"
import bycrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({
                errorMessage: `Password don't match`
            })
        }
        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({
                errorMessage: "Username already exists!"
            })
        }

        //băm password here
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)
        // get api picture avatar
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            return res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({
                errCode: "Invalid user data"
            })
        }
    } catch (error) {
        console.log('Error in sign up controller: ', error.message)
        return res.status(500).json({
            errorMessage: "Internal Server Error"
        })
    }
}
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName })
        const isPassword = await bycrypt.compare(password, user?.password || "")

        //check 
        if (!user || !isPassword) {
            return res.status(400).json({
                errCode: "Invalid userName or Password !!!"
            })
        }

        generateTokenAndSetCookie(user._id, res)
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log('Error in Login controller: ', error.message)
        return res.status(500).json({
            errorMessage: "Internal Server Error"
        })
    }

}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({
            errCode: "Logged out seccessfully !!!"
        })
    } catch (error) {
        console.log('Error in Logout controller: ', error.message)
        return res.status(500).json({
            errorMessage: "Internal Server Error"
        })
    }

}