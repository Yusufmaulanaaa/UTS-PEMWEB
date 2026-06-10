import express from "express";
import cors from "cors";
import "dotenv/config";

import eventRoute from "./routes/eventRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import pembicaraRoute from "./routes/pembicaraRoute.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://uts-backend-chi.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/event", eventRoute);
app.use("/category", categoryRoute);
app.use("/pembicara", pembicaraRoute);

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
