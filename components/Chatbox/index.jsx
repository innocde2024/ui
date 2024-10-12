/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { chatCompletion } from "../../utils/openAi";

const Chatbox = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendMessage = async (message) => {
    const newChatLog = await chatCompletion(message);
    console.log(newChatLog);
    setChatLog((prevChatLog) => [...prevChatLog, newChatLog]);
    // setIsLoading(true);
  };
  // console.log(chatLog);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(inputValue);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { types: "user", message: inputValue },
    ]);
    setInputValue("");
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    // console.log(isChatOpen);
  };

  return (
    <div className="chatbox-container fixed right-0 z-30 bottom-0  ">
      {isChatOpen && (
        <div className="chatbox  bg-white rounded-3xl my-9  mr-2">
          {/* Chat Header */}
          <div className="chat-header shadow bg-customOrange  rounded-t-3xl p-2 flex justify-between">
            <span className="chat-title text-white bold">Chat With Me</span>
            <button className="close-btn text-white" onClick={toggleChat} />
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {chatLog.map((item, index) => (
              <div
                className={`  flex ${
                  item.role === "assistant"
                    ? "justify-start text-customOrange border-customOrange bg-white"
                    : "justify-end"
                }`}
                key={index}
              >
                <div
                  className={`bg-customOrange   rounded-lg p-2 text-white max-w-sm m-1 ${
                    item.content ? "w-80" : ""
                  }`}
                >
                  {item.message || item.content}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Log */}

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="chat-input flex-none p-6">
            <div className="flex rounded-lg gap-1.5">
              <input
                type="text"
                className="flex-grow px-4 py-2 rounded-3xl "
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="text-white bg-customOrange p-2 rounded-2xl">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Chat Icon */}
      <div
        className={`chat-icon bg-white rounded-3xl p-2 right  w-fit ${
          isChatOpen ? "fixed bottom-1 right-1" : "sticky bottom-1 right-1"
        }`}
        onClick={toggleChat}
      >
        <ChatIcon className={`text-customOrange `} size={30} />
      </div>

      {/* Chatbox */}
    </div>
  );
};

export default Chatbox;
