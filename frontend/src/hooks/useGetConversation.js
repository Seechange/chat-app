import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/users')
                const data = await res.json()
                if (data.errCode) {
                    throw new Error(data.errCode)
                }
                setConversations(data)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversation()
    }, [])
    return { loading, conversations }
}

export default useGetConversation
