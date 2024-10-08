import { useState } from "react"
import useConversation from "../zustand/useConversation"
import { toast } from "react-toastify"


const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { selectedConversation, messages, setMessages } = useConversation()
    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            })

            const data = await res.json()
            console.log('check data send:',data);
            if (data.errCode) {
                throw new Error(data.errCode)
            }
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, sendMessage }

}

export default useSendMessage
