import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const myself = message.senderId === authUser._id;
  const classChat = myself ? "chat-end" : "chat-start";
  const profilePic = myself
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const colorChat = myself ? "bg-blue-500" : "";
  const formatTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${classChat} px-2 `}>
      <div className="chat-image avatar online">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="chat-buble" />
        </div>
      </div>
      <div className={`chat-bubble text-white  ${colorChat}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatTime}
      </div>
    </div>
  );
};

export default Message;
