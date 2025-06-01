import React, { useState } from 'react';
import { AlertTriangle, Link, Loader2 } from 'lucide-react';
import { analyzeUrl } from '../../services/scamDetectionService';
import ResultDisplay from '../ResultDisplay';

interface UrlAnalyzerProps {
  onAnalysisComplete: (content: string, result: string) => void;
}

const UrlAnalyzer: React.FC<UrlAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    risk: string;
    explanation: string;
    redFlags: string[];
  }>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }
    
    // Basic URL validation
    let urlToCheck = url.trim();
    if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
      urlToCheck = 'https://' + urlToCheck;
      setUrl(urlToCheck);
    }
    
    try {
      new URL(urlToCheck);
      setError('');
    } catch (e) {
      setError('Please enter a valid URL');
      return;
    }
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // Simulate analysis delay
      setTimeout(() => {
        const analysisResult = analyzeUrl(urlToCheck);
        setResult(analysisResult);
        onAnalysisComplete(urlToCheck, analysisResult.risk);
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      console.error('URL analysis error:', error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">URL Checker</h2>
      <p className="text-gray-600 mb-6">
        Check if a website URL is potentially malicious or related to scams.
      </p>
      
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-200 transition ${
              error ? 'border-red-300' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="Enter website URL (e.g., example.com)"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
      
      <div className="mb-6">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !url.trim()}
          className={`px-4 py-2 rounded-lg font-medium flex items-center ${
            isAnalyzing || !url.trim()
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin mr-2\" size={18} />
              Analyzing URL...
            </>
          ) : (
            'Check URL'
          )}
        </button>
      </div>
      
      {isAnalyzing && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Checking URL for suspicious elements...</p>
          </div>
        </div>
      )}
      
      {result && <ResultDisplay result={result} />}
      
      {!result && !isAnalyzing && url.trim() && !error && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h3 className="font-medium text-lg text-gray-800 mb-1">Ready to Check URL</h3>
          <p className="text-gray-600">
            Click the Check URL button to analyze this website for potential risks.
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlAnalyzer;