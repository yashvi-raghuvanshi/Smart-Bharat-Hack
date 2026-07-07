import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../services/api";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: "model", text: "Namaste! I'm Bharat Mitra, your civic assistant. Ask me about any government service, scheme, or document requirement." }
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({ role: m.role, text: m.text }));
      const reply = await sendChatMessage(userMessage.text, language, history);
      setMessages([...newMessages, { role: "model", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "model", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-xl shadow-md bg-white">
      <div className="flex items-center justify-between p-4 border-b bg-orange-600 text-white rounded-t-xl">
        <h2 className="font-semibold text-lg">Bharat Mitra — AI Civic Assistant</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-black text-sm rounded px-2 py-1"
        >
          <option value="English">English</option>
          <option value="Hindi">हिन्दी</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-orange-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-2xl text-sm">
              Typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about a government service, scheme, or document..."
          rows={1}
          className="flex-1 border rounded-full px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}