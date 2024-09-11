import React, { useState } from 'react';
import axios from 'axios';
import { Moon, Sun, Download } from 'lucide-react';

const EmojiGenerator = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [generatedEmoji, setGeneratedEmoji] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const generateEmoji = async () => {
    setLoading(true);
    setError('');
    setGeneratedEmoji(''); // Clear previous emoji
    try {
      const response = await axios.get(`https://emoji-api.com/emojis`, {
        params: {
          search: prompt,
          access_key: '524ff6c6d882289e40f62de44925062599df6203' // Replace with your actual API key
        }
      });
      
      if (response.data && response.data.length > 0) {
        setGeneratedEmoji(response.data[0].character);
      } else {
        setError('No emoji found for this prompt');
      }
    } catch (error) {
      setError('Error generating emoji. Please try again.');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const downloadEmoji = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.font = '80px Arial';
    ctx.fillText(generatedEmoji, 10, 80);
    
    const link = document.createElement('a');
    link.download = 'emoji.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full max-w-md p-8 space-y-8 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Emoji Finder</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
          />
          <button
            onClick={generateEmoji}
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Generating...' : 'Generate Emoji'}
          </button>
        </div>
        <div className="text-center min-h-[100px] flex items-center justify-center">
          {error && <p className="text-red-500">{error}</p>}
          {generatedEmoji && (
            <div className="space-y-4">
              <p className="text-6xl">{generatedEmoji}</p>
              <button
                onClick={downloadEmoji}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                <Download size={20} className="mr-2" /> Download Emoji
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmojiGenerator;