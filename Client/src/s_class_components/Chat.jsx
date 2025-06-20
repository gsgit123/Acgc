import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { useChatStore } from "../store/useChatStore";
import { useSAuthStore } from "../store/useSAuthStore";

const Chat = () => {
  const { messages, fetchMessages, sendMessage, isLoadingMessages } = useChatStore();
  const { classCode } = useParams();
  const currentUser = useSAuthStore((state) => state.authUser);
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
    <div className="h-full pt-10 px-4 bg-[#0b0f19] text-white font-['Nunito']">
      <div className="max-w-4xl mx-auto mb-10 flex flex-col h-[80vh] rounded-xl shadow-2xl bg-[#0f172a] border border-gray-700">
        
        {/* Header */}
        <div className="text-center text-3xl font-bold text-sky-400 py-4 border-b border-gray-700">
          Ask Your Doubts 💬
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#1e293b]">
          {isLoadingMessages ? (
            <div className="text-center text-gray-400">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400">No messages yet.</div>
          ) : (
            messages.map((msg, idx) => {
              const senderId = msg.sender;
              const isSelf = senderId === currentUser._id;
              const isTeacher = msg.senderModel === "Teacher";

              return (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[75%] ${
                    isSelf ? "ml-auto items-end" : "items-start"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold mb-1 ${
                      isTeacher ? "text-emerald-400" : "text-sky-400"
                    }`}
                  >
                    {msg.fullName || "Unknown Sender"}
                  </span>
                  <div
                    className={`px-4 py-2 rounded-lg text-white break-words ${
                      isSelf ? "bg-sky-600" : "bg-gray-700"
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

        {/* Input */}
        <div className="p-4 bg-[#0f172a] border-t border-gray-700 flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-[#1e293b] border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
