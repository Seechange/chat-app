import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        //write 2 line so we can write in 1 line with promise.all .
        // await conversation.save()
        // await newMessage.save()

        // xử lý socket io tại đây 


        await Promise.all([conversation.save(), newMessage.save()])
        return res.status(200).json(newMessage)
    } catch (error) {
        console.log('Error in send message on server', error.message)
        return res.status(400).json({
            errMessage: "Internal server error"
        })
    }
}
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")
        if (!conversation) {
            return res.status(200).json([])
        }
        const messages = conversation.messages
        return res.status(200).json(messages)

    } catch (error) {
        console.log('Error in getmessage on server', error.message)
        return res.status(400).json({
            errMessage: "Internal server error"
        })
    }
}