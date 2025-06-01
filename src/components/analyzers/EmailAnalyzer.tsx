import React, { useState } from 'react';
import { AlertTriangle, Mail, Loader2 } from 'lucide-react';
import { analyzeEmail } from '../../services/scamDetectionService';
import ResultDisplay from '../ResultDisplay';

interface EmailAnalyzerProps {
  onAnalysisComplete: (content: string, result: string) => void;
}

const EmailAnalyzer: React.FC<EmailAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailSender, setEmailSender] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    risk: string;
    explanation: string;
    redFlags: string[];
  }>(null);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // Simulate analysis delay
      setTimeout(() => {
        const fullEmail = {
          sender: emailSender,
          subject: emailSubject,
          content: emailContent
        };
        const analysisResult = analyzeEmail(fullEmail);
        setResult(analysisResult);
        onAnalysisComplete(
          `From: ${emailSender || 'Unknown'}\nSubject: ${emailSubject || 'No Subject'}\n${emailContent}`, 
          analysisResult.risk
        );
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      console.error('Email analysis error:', error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Email Analysis</h2>
      <p className="text-gray-600 mb-6">
        Analyze email content for phishing attempts and other scam indicators.
      </p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="email-sender" className="block text-sm font-medium text-gray-700 mb-1">
            Sender Email (optional)
          </label>
          <input
            id="email-sender"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
            placeholder="sender@example.com"
            value={emailSender}
            onChange={(e) => setEmailSender(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 mb-1">
            Email Subject (optional)
          </label>
          <input
            id="email-subject"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
            placeholder="Enter the email subject line"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="email-content" className="block text-sm font-medium text-gray-700 mb-1">
            Email Content
          </label>
          <textarea
            id="email-content"
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition resize-none"
            placeholder="Paste the email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      <div className="mb-6">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !emailContent.trim()}
          className={`px-4 py-2 rounded-lg font-medium flex items-center ${
            isAnalyzing || !emailContent.trim()
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin mr-2\" size={18} />
              Analyzing Email...
            </>
          ) : (
            <>
              <Mail className="mr-2" size={18} />
              Analyze Email
            </>
          )}
        </button>
      </div>
      
      {isAnalyzing && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Analyzing email for phishing indicators...</p>
          </div>
        </div>
      )}
      
      {result && <ResultDisplay result={result} />}
      
      {!result && !isAnalyzing && emailContent.trim() && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h3 className="font-medium text-lg text-gray-800 mb-1">Ready to Analyze</h3>
          <p className="text-gray-600">
            Click the analyze button to check this email for phishing attempts.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailAnalyzer;