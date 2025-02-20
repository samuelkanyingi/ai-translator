import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.CHROME_AI_API_KEY;
console.log("CHROME_AI_API_KEY:", process.env.CHROME_AI_API_KEY);
const summarizeText = async (text) => {
  try {
    const res = await axios.post(
        "https://chrome-ai.googleapis.com/v1/summarize",
        { prompt: { text } },
        { headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } }
      );
      
    return res.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

// Test API call
summarizeText("This is a test request").then(console.log);
