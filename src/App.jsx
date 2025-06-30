import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await axios.post("/api/chat", { message: userMessage.content });
      const botReply = response.data.reply;
      const botMessage = { role: "bot", content: botReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (index) => {
    setMessages([messages[index]]);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue("");
  };

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <div className="flex h-screen text-white">

      <div className={`bg-slate-950 overflow-auto transition-all duration-300 ${isNavOpen ? 'w-1/4' : 'w-0'}`}>
        {isNavOpen && (
          <Nav
            history={messages}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onToggleNav={toggleNav}
          />
        )}
      </div>
      <div className="flex-1 relative bg-slate-800 flex flex-col">
        <div className="mx-auto text-2xl">GPT</div>
        {!isNavOpen && (
          <button
            onClick={toggleNav}
            className="absolute top-4 left-4 bg-slate-950 p-2 rounded-md"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}

        <div className="flex-1 overflow-auto p-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 max-w-[70%] p-2 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-700 self-start'
              } text-white`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-[80%] absolute bottom-4 right-[10%] flex"
        >
          <input
            className="w-full bg-gray-400 rounded-2xl p-2 text-black focus:outline-none"
            placeholder="What do you want to ask?"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-2 flex items-center justify-center bg-white rounded-full p-2 text-black disabled:opacity-50"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;