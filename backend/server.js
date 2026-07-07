require("dotenv").config();
const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat");
const documentRoutes = require("./routes/documents");
const complaintRoutes = require("./routes/complaints");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Smart Bharat backend running" });
});

app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));