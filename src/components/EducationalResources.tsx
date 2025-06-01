import React from 'react';
import { BookOpen, ExternalLink, Shield, Lightbulb, Clock } from 'lucide-react';

const EducationalResources: React.FC = () => {
  const resources = [
    {
      title: 'Common Scam Types',
      description: 'Learn about the most prevalent scams and how to identify them.',
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      items: [
        {
          title: 'Phishing Attacks',
          description: 'Emails or messages that appear to be from reputable companies to steal personal information.',
          link: '#'
        },
        {
          title: 'Investment Scams',
          description: 'Promises of high returns with little or no risk, often involving cryptocurrency.',
          link: '#'
        },
        {
          title: 'Romance Scams',
          description: 'Creating fake relationships to gain trust and then ask for money.',
          link: '#'
        },
        {
          title: 'Tech Support Scams',
          description: 'Claiming to be from a tech company and asking for remote access to your device.',
          link: '#'
        }
      ]
    },
    {
      title: 'Warning Signs to Watch For',
      description: 'Red flags that can help you identify potential scams.',
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      items: [
        {
          title: 'Urgency and Pressure',
          description: 'Scammers often create a false sense of urgency to prevent you from thinking clearly.',
          link: '#'
        },
        {
          title: 'Poor Grammar and Spelling',
          description: 'Professional companies typically have error-free communications.',
          link: '#'
        },
        {
          title: 'Requests for Unusual Payment Methods',
          description: 'Be suspicious of requests for gift cards, wire transfers, or cryptocurrency.',
          link: '#'
        },
        {
          title: 'Too Good to Be True Offers',
          description: 'Unusually high investment returns or free prizes often indicate a scam.',
          link: '#'
        }
      ]
    },
    {
      title: 'Recent Scam Trends',
      description: 'Stay updated on the latest scam techniques being used.',
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      items: [
        {
          title: 'AI-Generated Voice Scams',
          description: 'Scammers using AI to mimic voices of loved ones claiming to be in trouble.',
          link: '#'
        },
        {
          title: 'QR Code Phishing',
          description: 'Malicious QR codes that direct to fake websites designed to steal information.',
          link: '#'
        },
        {
          title: 'Rental Listing Scams',
          description: 'Fake property listings with extremely attractive prices requiring deposits.',
          link: '#'
        },
        {
          title: 'Job Offer Scams',
          description: 'Remote job offers with high pay that require upfront payments or personal information.',
          link: '#'
        }
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Educational Resources</h2>
      <p className="text-gray-600 mb-6">
        Expand your knowledge about various scams and learn how to protect yourself.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center mb-4">
                {resource.icon}
                <h3 className="text-lg font-bold ml-2">{resource.title}</h3>
              </div>
              <p className="text-gray-600">{resource.description}</p>
            </div>
            
            <div className="p-4">
              <ul className="space-y-3">
                {resource.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href={item.link} 
                      className="group flex justify-between items-start p-2 rounded-md hover:bg-blue-50 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500 mt-1 ml-2 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                View all resources
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-2">Need More Help?</h3>
        <p className="text-gray-700 mb-4">
          If you believe you've been scammed or want to report a scam, these resources can help:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <ExternalLink className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <a href="#" className="text-blue-600 hover:underline">
              Federal Trade Commission (FTC) Scam Reporting
            </a>
          </li>
          <li className="flex items-start">
            <ExternalLink className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <a href="#" className="text-blue-600 hover:underline">
              Internet Crime Complaint Center (IC3)
            </a>
          </li>
          <li className="flex items-start">
            <ExternalLink className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <a href="#" className="text-blue-600 hover:underline">
              Consumer Financial Protection Bureau (CFPB)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EducationalResources;