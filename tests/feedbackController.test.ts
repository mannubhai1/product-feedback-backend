import request from "supertest";
import app from "../src/app";

describe("Feedback Endpoints", () => {
  it("should reject unauthorized requests to GET /api/feedback", async () => {
    const res = await request(app).get("/api/feedback");
    expect(res.statusCode).toEqual(401);
  });
});
