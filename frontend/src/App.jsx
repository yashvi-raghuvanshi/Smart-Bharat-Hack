import { useState } from "react";
import ChatAssistant from "./components/chatAssistant";
import ComplaintTracker from "./components/ComplaintTracker";
import DocumentHelper from "./components/DocumentHelper";

function App() {
  const [tab, setTab] = useState("chat");

  const tabs = [
    { id: "chat", label: "AI Assistant" },
    { id: "complaints", label: "Report an Issue" },
    { id: "documents", label: "Document Helper" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Smart Bharat</h1>
        <p className="text-gray-500 mt-1">AI-Powered Civic Companion</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === t.id ? "bg-orange-600 text-white" : "bg-white text-gray-600 border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "chat" && <ChatAssistant />}
      {tab === "complaints" && <ComplaintTracker />}
      {tab === "documents" && <DocumentHelper />}
    </div>
  );
}

export default App;