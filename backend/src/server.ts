import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";

import session from "express-session";
import passport from "passport";
import "./config/passport"; // import config
import googleAuthRoutes from "./routes/googleAuthRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4005;

app.use(cors());
app.use(
  session({
    secret: "google_auth_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

connectDB();

app.get("/", (_req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/auth", googleAuthRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});
 
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({ error: message });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
