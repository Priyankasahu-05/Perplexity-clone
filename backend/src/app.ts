import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import uploadRouter from "./routes/upload.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);
app.use("/api", uploadRouter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;
