const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { COMPLAINT_CATEGORIZER_PROMPT } = require("../prompts/systemPrompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let complaints = [];
let idCounter = 1;

router.get("/", (req, res) => {
  res.json(complaints);
});

router.post("/", async (req, res) => {
  try {
    const { description, location = "" } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({ error: "Description is required" });
    }

    let category = "Other";
    let priority = "Medium";

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: COMPLAINT_CATEGORIZER_PROMPT,
      });
      const result = await model.generateContent(description);
      const text = result.response.text().replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      category = parsed.category || category;
      priority = parsed.priority || priority;
    } catch (aiErr) {
      console.error("AI categorization failed, using defaults:", aiErr.message);
    }

    const newComplaint = {
      id: idCounter++,
      description,
      category,
      priority,
      location,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    complaints.push(newComplaint);
    res.status(201).json(newComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit complaint" });
  }
});

module.exports = router;