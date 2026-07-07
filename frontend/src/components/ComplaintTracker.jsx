import { useState, useEffect } from "react";
import { submitComplaint, getComplaints } from "../services/api";

const CATEGORIES = ["Sanitation", "Water Supply", "Roads", "Electricity", "Public Safety", "Other"];

export default function ComplaintTracker() {
  const [complaints, setComplaints] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sanitation");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data.reverse()); // newest first
    } catch (err) {
      console.error("Failed to load complaints", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) return;

    setLoading(true);
    try {
      await submitComplaint({ description, location });
      setDescription("");
      setLocation("");
      await loadComplaints();
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    if (status === "Resolved") return "bg-green-100 text-green-700";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Report a Public Issue</h2>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-md space-y-3 mb-8">
        <input
        type="text"
        placeholder="Location (e.g. Ward 5, MG Road)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm"
       />
        <textarea
          placeholder="Describe the issue in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-3 text-gray-800">Your Complaints</h3>
      {fetching ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500 text-sm">No complaints reported yet.</p>
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-orange-600">{c.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColor(c.status)}`}>
                  {c.status}
                </span>
              </div>
              <p className="text-sm text-gray-800">{c.description}</p>
              <p className="text-xs text-gray-500 mt-1">📍 {c.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}