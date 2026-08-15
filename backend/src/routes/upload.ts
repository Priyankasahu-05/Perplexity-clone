import { Router } from "express";
import multer from "multer";
import { extractTextFromFile } from "../services/fileService.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const text = await extractTextFromFile(
      req.file.buffer,
      req.file.mimetype
    );

    return res.json({
      success: true,
      data: {
        name: req.file.originalname,
        type: req.file.mimetype,
        text,
      },
    });
  } catch (error: any) {
    console.error("File upload error:", error);

    return res.status(400).json({
      success: false,
      error: error?.message || "Failed to process file",
    });
  }
});

export default router;