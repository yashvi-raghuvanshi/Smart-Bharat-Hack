const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { DOCUMENT_HELPER_PROMPT } = require("../prompts/systemPrompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { query, language = "English" } = req.body;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: DOCUMENT_HELPER_PROMPT(language),
    });
    const result = await model.generateContent(query);
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch document info" });
  }
});

module.exports = router;