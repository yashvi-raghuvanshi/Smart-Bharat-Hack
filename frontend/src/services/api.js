import axios from "axios";

const API_BASE = "https://smart-bharat-hack.onrender.com";

export const sendChatMessage = async (message, language, history) => {
  const res = await axios.post(`${API_BASE}/chat`, { message, language, history });
  return res.data.reply;
};

export const submitComplaint = async (complaint) => {
  const res = await axios.post(`${API_BASE}/complaints`, complaint);
  return res.data;
};

export const getComplaints = async () => {
  const res = await axios.get(`${API_BASE}/complaints`);
  return res.data;
};

export const askDocumentHelper = async (query, language) => {
  const res = await axios.post(`${API_BASE}/documents`, { query, language });
  return res.data.reply;
};