import { useState } from "react";
import { askDocumentHelper } from "../services/api";

export default function DocumentHelper() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setResult("");
    try {
      const reply = await askDocumentHelper(query, language);
      setResult(reply);
    } catch (err) {
      console.error(err);
      setResult("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Document Requirement Helper</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="English">English</option>
          <option value="Hindi">हिन्दी</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-md space-y-3">
        <input
          type="text"
          placeholder="e.g. I want to open a small shop, or I need a new passport"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Find Required Documents"}
        </button>
      </form>

      {result && (
        <div className="bg-white mt-5 p-5 rounded-xl shadow-sm border whitespace-pre-wrap text-sm text-gray-800">
          {result}
        </div>
      )}
    </div>
  );
}