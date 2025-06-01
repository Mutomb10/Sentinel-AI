import React from 'react';
import { Calendar, File, Link, Mail } from 'lucide-react';

interface HistoryItem {
  type: string;
  content: string;
  result: string;
  timestamp: Date;
}

interface HistoryProps {
  history: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-800 mb-2">No History Yet</h3>
        <p className="text-gray-600">
          Your analysis history will appear here once you've analyzed some content.
        </p>
      </div>
    );
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <File className="h-5 w-5 text-blue-500" />;
      case 'url':
        return <Link className="h-5 w-5 text-purple-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRiskBadge = (risk: string) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full";
    
    switch (risk) {
      case 'High Risk':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>{risk}</span>;
      case 'Medium Risk':
        return <span className={`${baseClasses} bg-orange-100 text-orange-800`}>{risk}</span>;
      case 'Low Risk':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{risk}</span>;
      case 'Safe':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>{risk}</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{risk}</span>;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analysis History</h2>
      <p className="text-gray-600 mb-6">
        Review your previous scam analysis results.
      </p>
      
      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="mr-3 mt-1">{getTypeIcon(item.type)}</div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    {item.type === 'text' && 'Text Analysis'}
                    {item.type === 'url' && 'URL Check'}
                    {item.type === 'email' && 'Email Analysis'}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {item.content.substring(0, 100)}{item.content.length > 100 ? '...' : ''}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                {getRiskBadge(item.result)}
                <span className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;