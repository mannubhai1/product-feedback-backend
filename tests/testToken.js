import jwt from "jsonwebtoken";

const testRole = "admin";

const token = jwt.sign(
  { id: "yourInvestorId", role: testRole },
  "supersecretkey123",
  { expiresIn: "1h" }
);
console.log(token);
