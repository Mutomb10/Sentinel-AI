import React, { useState } from 'react';
import TextAnalyzer from './analyzers/TextAnalyzer';
import UrlAnalyzer from './analyzers/UrlAnalyzer';
import EmailAnalyzer from './analyzers/EmailAnalyzer';
import EducationalResources from './EducationalResources';
import History from './History';

type Tab = 'text' | 'url' | 'email' | 'resources' | 'history';

const ScamDetectorTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('text');
  const [history, setHistory] = useState<Array<{type: string; content: string; result: string; timestamp: Date}>>([]);

  const addToHistory = (type: string, content: string, result: string) => {
    const newEntry = {
      type,
      content,
      result,
      timestamp: new Date()
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  const tabClasses = "px-4 py-2 font-medium text-sm rounded-t-lg";
  const activeTabClasses = `${tabClasses} bg-white text-blue-600 border-b-2 border-blue-600`;
  const inactiveTabClasses = `${tabClasses} text-gray-600 hover:text-blue-500 hover:bg-white/50 transition-colors`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex overflow-x-auto bg-gray-100 border-b">
        <button 
          className={activeTab === 'text' ? activeTabClasses : inactiveTabClasses}
          onClick={() => setActiveTab('text')}
        >
          Text Analysis
        </button>
        <button 
          className={activeTab === 'url' ? activeTabClasses : inactiveTabClasses}
          onClick={() => setActiveTab('url')}
        >
          URL Checker
        </button>
        <button 
          className={activeTab === 'email' ? activeTabClasses : inactiveTabClasses}
          onClick={() => setActiveTab('email')}
        >
          Email Analysis
        </button>
        <button 
          className={activeTab === 'resources' ? activeTabClasses : inactiveTabClasses}
          onClick={() => setActiveTab('resources')}
        >
          Educational Resources
        </button>
        <button 
          className={activeTab === 'history' ? activeTabClasses : inactiveTabClasses}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>
      
      <div className="p-6">
        {activeTab === 'text' && <TextAnalyzer onAnalysisComplete={(content, result) => addToHistory('text', content, result)} />}
        {activeTab === 'url' && <UrlAnalyzer onAnalysisComplete={(content, result) => addToHistory('url', content, result)} />}
        {activeTab === 'email' && <EmailAnalyzer onAnalysisComplete={(content, result) => addToHistory('email', content, result)} />}
        {activeTab === 'resources' && <EducationalResources />}
        {activeTab === 'history' && <History history={history} />}
      </div>
    </div>
  );
};

export default ScamDetectorTabs;