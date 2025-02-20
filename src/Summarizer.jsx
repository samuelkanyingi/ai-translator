import { useState } from "react";
import "./Summarizer.css";

const Summarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    // Replace YOUR_HUGGING_FACE_API_KEY with your actual API key.
    const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
    //const model = "facebook/bart-large-cnn"; // Change to your preferred model if needed
    const model = "Falconsai/text_summarization";
   
   
    
    const url = `https://api-inference.huggingface.co/models/${model}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Some models return an array of results. Adjust as needed.
      const summaryText = Array.isArray(result) 
        ? result[0]?.summary_text 
        : result.summary_text;

      if (summaryText) {
        setSummary(summaryText);
      } else {
        setError("No summary was returned.");
      }
    } catch (err) {
      setError("Summarization failed: " + err.message);
    }
  };

  return (
    <div className="summarizer-container">
      <div className="summarizer-card">
        <h2>AI Summarizer</h2>
        <label>Enter Text:</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste text here..."
          className="input-textarea"
        />

        <button onClick={handleSummarize} className="summarize-btn">
          Summarize
        </button>

        {summary && <p className="summary-result">Summary: {summary}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Summarizer;
