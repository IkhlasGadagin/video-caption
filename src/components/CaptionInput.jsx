import { useState } from "react";

const CaptionInput = ({ onAddCaption }) => {
  const [text, setText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!text.trim()) {
      setError("Caption text is required");
      return false;
    }
    if (!timestamp) {
      setError("Timestamp is required");
      return false;
    }
    if (isNaN(timestamp) || parseFloat(timestamp) < 0) {
      setError("Please enter a valid timestamp");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (validateInputs()) {
      onAddCaption({ text: text.trim(), timestamp: parseFloat(timestamp) });
      setText("");
      setTimestamp("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Add Captions</h2>
        <div className="text-blue-400 text-sm">Step 2</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Caption Text
          </label>
          <textarea
            placeholder="Enter your caption text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-gray-900 text-white placeholder-gray-400 
                     rounded-lg px-4 py-3 border border-gray-600
                     focus:border-blue-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500/20 transition-colors duration-200
                     resize-none h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Timestamp (seconds)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="e.g., 5.5"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full bg-gray-900 text-white placeholder-gray-400 
                     rounded-lg px-4 py-3 border border-gray-600
                     focus:border-blue-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500/20 transition-colors duration-200"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm py-2 px-3 bg-red-500/10 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 
                   hover:from-green-600 hover:to-green-700 
                   text-white font-medium px-6 py-3 rounded-lg
                   transform transition-all duration-200 
                   hover:shadow-lg hover:shadow-green-500/30
                   focus:outline-none focus:ring-2 focus:ring-green-500/20
                   flex items-center justify-center space-x-2"
        >
          <span>Add Caption</span>
        </button>
      </form>
    </div>
  );
};

export default CaptionInput;
