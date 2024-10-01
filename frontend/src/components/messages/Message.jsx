const Message = () => {
  return (
    <div className="chat chat-end px-2 ">
      <div className="chat-image avatar online">
        <div className="w-10 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="chat-buble"
          />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500 ">
        Hi ! What supp bro !!!
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:50
      </div>
    </div>
  );
};

export default Message;
