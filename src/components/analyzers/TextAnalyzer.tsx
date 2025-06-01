import React, { useState } from 'react';
import { AlertTriangle, Check, ClipboardCopy, Loader2 } from 'lucide-react';
import { analyzeText } from '../../services/scamDetectionService';
import ResultDisplay from '../ResultDisplay';

interface TextAnalyzerProps {
  onAnalysisComplete: (content: string, result: string) => void;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    risk: string;
    explanation: string;
    redFlags: string[];
  }>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // Simulate analysis delay
      setTimeout(() => {
        const analysisResult = analyzeText(text);
        setResult(analysisResult);
        onAnalysisComplete(text, analysisResult.risk);
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    
    const resultText = `
Scam Analysis Result:
Risk Level: ${result.risk}
Score: ${result.score}/10
Explanation: ${result.explanation}
Red Flags:
${result.redFlags.map(flag => `- ${flag}`).join('\n')}
    `;
    
    navigator.clipboard.writeText(resultText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Text Analysis</h2>
      <p className="text-gray-600 mb-6">
        Paste suspicious text to analyze it for potential scam indicators.
      </p>
      
      <div className="relative mb-4">
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
          placeholder="Paste the text you want to analyze for scam indicators..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <div className="absolute bottom-3 right-3 flex space-x-2">
          <button 
            onClick={handlePaste}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
            title="Paste from clipboard"
          >
            <ClipboardCopy size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex space-x-3 mb-6">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !text.trim()}
          className={`px-4 py-2 rounded-lg font-medium flex items-center ${
            isAnalyzing || !text.trim()
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin mr-2\" size={18} />
              Analyzing...
            </>
          ) : (
            'Analyze Text'
          )}
        </button>
        
        {result && (
          <>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center"
            >
              {copySuccess ? (
                <>
                  <Check size={18} className="mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <ClipboardCopy size={18} className="mr-2" />
                  Copy Results
                </>
              )}
            </button>
            
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Clear
            </button>
          </>
        )}
      </div>
      
      {isAnalyzing && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Analyzing text for scam indicators...</p>
          </div>
        </div>
      )}
      
      {result && <ResultDisplay result={result} />}
      
      {!result && !isAnalyzing && text.trim() && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h3 className="font-medium text-lg text-gray-800 mb-1">Ready to Analyze</h3>
          <p className="text-gray-600">
            Click the analyze button to check this text for potential scam indicators.
          </p>
        </div>
      )}
    </div>
  );
};

export default TextAnalyzer;