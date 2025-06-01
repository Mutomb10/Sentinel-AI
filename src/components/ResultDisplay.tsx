import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Copy, Info } from 'lucide-react';

interface ResultDisplayProps {
  result: {
    score: number;
    risk: string;
    explanation: string;
    redFlags: string[];
  };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { score, risk, explanation, redFlags } = result;
  
  const getRiskColor = () => {
    switch (risk) {
      case 'High Risk':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'Medium Risk':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'Low Risk':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'Safe':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };
  
  const getRiskIcon = () => {
    switch (risk) {
      case 'High Risk':
        return <AlertCircle className="h-10 w-10 text-red-500" />;
      case 'Medium Risk':
        return <AlertTriangle className="h-10 w-10 text-orange-500" />;
      case 'Low Risk':
        return <Info className="h-10 w-10 text-yellow-500" />;
      case 'Safe':
        return <CheckCircle className="h-10 w-10 text-green-500" />;
      default:
        return <Info className="h-10 w-10 text-gray-500" />;
    }
  };

  const getRiskProgressColor = () => {
    if (score >= 7) return 'bg-red-500';
    if (score >= 4) return 'bg-orange-500';
    if (score >= 2) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden transition-all">
      <div className={`p-6 border-b ${getRiskColor()}`}>
        <div className="flex items-start">
          <div className="mr-4">
            {getRiskIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{risk}</h3>
            <p className="text-gray-800">{explanation}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Risk Score</span>
            <span className="text-sm font-medium text-gray-700">{score}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${getRiskProgressColor()}`} 
              style={{ width: `${score * 10}%` }}
            ></div>
          </div>
        </div>
        
        {redFlags.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Detected Red Flags:</h4>
            <ul className="space-y-2">
              {redFlags.map((flag, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-bold text-gray-800 mb-3">Recommendations:</h4>
          
          {risk === 'High Risk' && (
            <p className="text-red-600 mb-2">
              <strong>Do not engage with this content.</strong> It shows multiple signs of being a scam.
            </p>
          )}
          
          {risk === 'Medium Risk' && (
            <p className="text-orange-600 mb-2">
              <strong>Proceed with extreme caution.</strong> This content has several suspicious elements.
            </p>
          )}
          
          {risk === 'Low Risk' && (
            <p className="text-yellow-700 mb-2">
              <strong>Be cautious.</strong> While not definitely a scam, this content has some concerning elements.
            </p>
          )}
          
          {risk === 'Safe' && (
            <p className="text-green-600 mb-2">
              <strong>Likely safe.</strong> No obvious scam indicators were detected, but always stay vigilant.
            </p>
          )}
          
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>Never share sensitive personal information unless you are absolutely certain of the recipient's identity.</li>
            <li>Verify suspicious communications through official channels.</li>
            <li>Be wary of urgent requests or threats designed to make you act quickly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;