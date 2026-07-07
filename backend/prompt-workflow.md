# Prompt Workflow & Strategy

## 1. System Prompt Design
Each AI feature uses a dedicated system prompt (see `backend/prompts/systemPrompts.js`)
rather than one generic prompt, so the model's tone and output format matches
the task:

- **Civic Assistant** — persona-based ("Bharat Mitra"), instructed to
  simplify jargon, respond in the selected language, and admit uncertainty
  rather than inventing rules on schemes/fees/deadlines.
- **Document Helper** — structured output prompt: returns relevant service(s),
  a bullet list of documents, and where to process them.
- **Complaint Categorizer** — strict JSON-only output prompt used
  programmatically (not shown to the user) to auto-tag complaints by
  category and priority.

## 2. Honesty & Safety Constraints
All prompts explicitly instruct the model to say "I'm not certain" rather
than fabricate specific government rules, fees, or deadlines — since
incorrect civic information could mislead citizens.

## 3. Multilingual Handling
Language is passed as a parameter into every prompt template
(e.g. `Respond in ${language}`). Gemini natively handles Hindi output in
Devanagari script without needing separate translation calls.

## 4. Context Injection
For the Document Helper, the user's free-text need (e.g. "I want to start
a business") is passed directly to Gemini, which reasons over its own
knowledge of Indian government schemes rather than a fixed lookup table —
kept intentionally simple for the hackathon scope.

## 5. Example Interactions

**Query:** "How do I apply for a ration card?"
**Response:** Simplified explanation + eligibility note + suggestion to
check with local Public Distribution System office.

**Query:** "I want to open a small shop"
**Response:** Recommends Shop & Establishment registration + GST
registration (if applicable) + required documents (ID proof, address
proof, shop photographs).

**Complaint:** "Garbage has been piling up near the market for 3 days"
**AI Output (JSON):** `{"category": "Sanitation", "priority": "Medium", "summary": "..."}`
