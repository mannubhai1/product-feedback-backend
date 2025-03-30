# 🚀 Product Feedback Backend

A backend service for an internal feedback platform where investors can submit qualitative feedback. The feedback is analyzed by an AI module to extract **sentiment**, **themes**, **module tags**, and a **confidence score**.

---

## 📑 Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Request Validation](#request-validation)
- [Rate Limiting](#rate-limiting)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

---

## ✅ Features

- **AI Feedback Analysis:** Integrates with the **OpenAI API** to analyze investor feedback.
- **Request Validation:** Uses [Zod](https://github.com/colinhacks/zod) for schema validation.
- **JWT Authentication & Role-Based Authorization:** Protects endpoints with JWT.
- **Rate Limiting:** Implements [express-rate-limit](https://github.com/nfriedly/express-rate-limit) to prevent abuse.
- **MongoDB Integration:** Uses [Mongoose](https://mongoosejs.com/) for data storage.
- **API Documentation:** Automatically generated Swagger docs available at `/api-docs`.
- **Testing:** Integration tests with Jest and Supertest.

---

## ⚙️ Setup and Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/yourusername/product-feedback-backend.git
cd product-feedback-backend
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Build the Project:**

```bash
npm run build
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following content:

```env
PORT=3000
JWT_SECRET=supersecretkey123
MONGO_URI=mongodb://localhost:27017/product-feedback-backend-test
OPENAI_API_KEY=your_openai_api_key_here
```

✅ You can also create a `.env.example` file with placeholder values for reference.

---

## 🚀 Running the Application

### Local Development

Start the server:

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## 📚 API Documentation

After starting the server, visit:

```
http://localhost:3000/api-docs
```

✅ This will open the **Swagger API Documentation**.

---

## 🔍 Request Validation

Validation is implemented using **Zod**.

In `/src/middleware/validateFeedback.ts`:

```typescript
import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const feedbackSchema = z.object({
  feedbackText: z.string().min(1, "Feedback text is required"),
});

export const validateFeedback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = feedbackSchema.safeParse(req.body);
  if (!result.success) {
    // console.log("Validation error:", result.error.errors);
    res.status(400).json({ errors: result.error.errors });
    return;
  }
  next();
};
```

---

## ⚙️ Rate Limiting

Rate limiting is applied using `express-rate-limit` to prevent abuse.

In `app.ts`:

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});

app.use(limiter);
```

---

## 🛠️ Testing

Integration tests are written using **Jest** and **Supertest**.

To run the tests:

```bash
npm test
```

✅ Test coverage includes:

- API authentication
- MongoDB operations
- Feedback validation
- AI analysis response

---

## 🚀 Future Enhancements

- Add **pagination** for large feedback datasets.
- Implement **WebSockets** for real-time updates.
- Add **GraphQL** support alongside REST.

---

✅ **Author:** Manurbhav Arya
