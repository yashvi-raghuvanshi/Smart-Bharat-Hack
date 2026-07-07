const request = require("supertest");
const express = require("express");
const chatRoutes = require("../routes/chat");

const app = express();
app.use(express.json());
app.use("/api/chat", chatRoutes);

describe("POST /api/chat", () => {
  it("returns 400 if message is missing", async () => {
    const res = await request(app).post("/api/chat").send({});
    expect(res.statusCode).toBe(400);
  });
});