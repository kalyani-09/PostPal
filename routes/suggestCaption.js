const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Convert file to inlineData format for Gemini
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(filePath).toString("base64"),
      mimeType,
    },
  };
}

// Generate captions with Gemini
async function generateCaptions(imagePath) {
  const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 1. Describe the image
  const visionRes = await visionModel.generateContent([
    { text: "Describe this photo in a short sentence." },
    fileToGenerativePart(imagePath, "image/jpeg"),
  ]);

  const description = visionRes.response.text();

  // 2. Generate fun captions
  const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const textRes = await textModel.generateContent([
    { text: `Generate 3 short, fun Instagram-style captions for a photo of ${description}.` }
  ]);

  const text = textRes.response.text();

  return text
    .split("\n")
    .map(c => c.trim())
    .filter(c => c.length > 0);
}

// Route
router.post("/suggest-captions", upload.single("image"), async (req, res) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const suggestions = await generateCaptions(req.file.path);
    fs.unlink(req.file.path, () => {}); // cleanup

    res.json({ suggestions });
  } catch (err) {
    console.error("Caption Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
