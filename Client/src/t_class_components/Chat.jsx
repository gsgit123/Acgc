import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { useChatStore } from "../store/useChatStore";
import { useTAuthStore } from "../store/useTAuthStore";

const Chat = () => {
  const { messages, fetchMessages, sendMessage, isLoadingMessages } = useChatStore();
  const { classCode } = useParams();
  const currentUser = useTAuthStore((state) => state.authUser);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  if (!currentUser) {
    return <div className="text-center p-4">Loading user info...</div>;
  }

  useEffect(() => {
    if (classCode) {
      fetchMessages(classCode);
    }
  }, [classCode, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    const messageData = {
      senderId: currentUser._id,
      senderModel: currentUser.role === "teacher" ? "Teacher" : "Student",
      content: text,
    };

    sendMessage(classCode, messageData);
    setText("");
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-20 border border-gray-300 rounded-md shadow-lg flex flex-col h-[500px] bg-slate-400">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-800 mt-6">
        {isLoadingMessages ? (
          <div className="text-center text-gray-400">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet.</div>
        ) : (
          messages.map((msg, idx) => {
            const senderId = msg.sender;
            const currentUserId = currentUser?._id;
            return (
              <div
                key={idx}
                className={`flex flex-col max-w-[75%] ${senderId === currentUserId ? "ml-auto items-end" : "items-start"
                  }`}
              >
                <span
                  className={`text-sm font-semibold ${msg.senderModel === "Teacher" ? "text-green-400" : "text-white"
                    }`}
                >
                  {msg.fullName || "Unknown Sender"}
                </span>
                <div
                  className={`px-4 py-2 rounded-lg text-white ${senderId === currentUserId ? "bg-blue-600" : "bg-gray-500"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-300 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
