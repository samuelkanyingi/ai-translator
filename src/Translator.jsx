import { useState, useEffect } from "react";
import "./Translator.css";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState(null);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState("es");

  const languageMap = {
    en: "English",
    es: "Spanish",
    ja: "Japanese",
   
  };

  const getLanguageName = (code) => languageMap[code] || code;

  const detectLanguage = async (text) => {
    if (!("ai" in self) || !("languageDetector" in self.ai)) {
      setError("AI Language Detection API is not available in your browser.");
      return;
    }

    try {
      const detector = await self.ai.languageDetector.create();
      const result = await detector.detect(text);

      if (Array.isArray(result) && result.length > 0) {
        const bestResult = result.reduce((prev, current) =>
          current.confidence > prev.confidence ? current : prev
        );

        setDetectedLanguage(getLanguageName(bestResult.detectedLanguage));
        setConfidence((bestResult.confidence * 100).toFixed(1));
      } else {
        setDetectedLanguage("Unknown");
        setConfidence(null);
      }
    } catch (err) {
      setError("Language detection failed: " + err.message);
    }
  };

  const handleTranslate = async () => {
    if (!("ai" in self) || !("translator" in self.ai)) {
      setError("AI Translation API is not available in your browser.");
      return;
    }

    try {
      const translator = await self.ai.translator.create({
        sourceLanguage:
          Object.keys(languageMap).find(
            (key) => languageMap[key] === detectedLanguage
          ) || "en",
        targetLanguage,
      });

      const result = await translator.translate(inputText);
      setTranslatedText(result);
    } catch (err) {
      setError("Translation failed: " + err.message);
    }
  };

  useEffect(() => {
    if (inputText.trim()) {
      detectLanguage(inputText);
    } else {
      setDetectedLanguage("");
      setConfidence(null);
    }
  }, [inputText]);

  return (
    <div className="translator-container">
      <h2>AI Translator</h2>

      <label>Enter Text:</label>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type here..."
        className="input-textarea"
      />

      {detectedLanguage && confidence !== null && (
        <p className="language-detection">
          Detected: {detectedLanguage} ({confidence}% confidence)
        </p>
      )}

      <label>Translate to:</label>
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className="language-select"
      >
        {Object.entries(languageMap).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>

      <button onClick={handleTranslate} className="translate-btn">
        Translate
      </button>

      {translatedText && <p className="translation-result">Translation: {translatedText}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Translator;
