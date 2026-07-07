import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

function ChatInput() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm ShopAssist AI. Ask me about laptops, phones, budgets or product comparisons.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "chat-row user-row"
                : "chat-row ai-row"
            }
          >
            <div className="avatar">
              {msg.sender === "user" ? <FaUser /> : <BsRobot />}
            </div>

            <div
              className={
                msg.sender === "user"
                  ? "message user-message"
                  : "message ai-message"
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-row ai-row">
            <div className="avatar">
              <BsRobot />
            </div>

            <div className="message ai-message">
              ⏳ ShopAssist AI is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Ask about laptops, phones, accessories..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : <IoSend size={20} />}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;