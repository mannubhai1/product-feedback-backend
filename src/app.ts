import express from "express";
import feedbackRoutes from "./routes/feedbackRoutes";
import adminRoutes from "./routes/adminRoutes";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Feedback API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Feedback: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            feedbackText: { type: "string" },
            sentiment: { type: "string" },
            themes: {
              type: "array",
              items: { type: "string" },
            },
            moduleTags: {
              type: "array",
              items: { type: "string" },
            },
            confidence: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"], // path to the API docs annotations
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();

app.use(express.json());
app.use(limiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

export default app;
