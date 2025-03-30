import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";
import { config } from "../src/config/config";

const testToken = jwt.sign(
  { id: "testInvestorId", role: "investor" },
  config.jwtSecret,
  { expiresIn: "1h" }
);

const adminToken = jwt.sign(
  { id: "adminId", role: "admin" },
  config.jwtSecret,
  { expiresIn: "1h" }
);

describe("Feedback Endpoints", () => {
  it("should reject unauthorized requests to GET /api/feedback", async () => {
    const res = await request(app).get("/api/feedback");
    expect(res.statusCode).toEqual(401);
  });

  it("should accept valid feedback and return analyzed output", async () => {
    const sampleFeedback = {
      feedbackText:
        "The form builder is super flexible, but the AI scoring didn’t really match my thesis priorities.",
    };

    const res = await request(app)
      .post("/api/feedback")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send(sampleFeedback);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("userId", "testInvestorId");
    expect(res.body).toHaveProperty(
      "feedbackText",
      sampleFeedback.feedbackText
    );
    expect(res.body).toHaveProperty("sentiment");
    expect(res.body).toHaveProperty("themes");
    expect(res.body).toHaveProperty("moduleTags");
    expect(res.body).toHaveProperty("confidence");
  });

  it("should return 400 when feedbackText is missing", async () => {
    const res = await request(app)
      .post("/api/feedback")
      .set("Authorization", `Bearer ${testToken}`)
      .set("Content-Type", "application/json")
      .send({}); // No feedbackText

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors[0]).toHaveProperty("message", "Required");
  });
});

describe("Admin Endpoints", () => {
  it("should return admin analytics summary", async () => {
    const res = await request(app)
      .get("/api/admin/summary")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("totalFeedback");
    expect(res.body).toHaveProperty("sentimentDistribution");
    expect(res.body).toHaveProperty("commonThemes");
    expect(res.body).toHaveProperty("feedbackByModule");
    expect(res.body).toHaveProperty("avgConfidence");
    expect(res.body).toHaveProperty("feedbackByTime");
  });
});
