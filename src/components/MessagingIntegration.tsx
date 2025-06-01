import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertTriangle, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

interface MessagingPlatform {
  name: string;
  connected: boolean;
  requiresPro: boolean;
}

const MessagingIntegration: React.FC = () => {
  const [platforms, setPlatforms] = useState<MessagingPlatform[]>([
    { name: 'WhatsApp', connected: false, requiresPro: false },
    { name: 'Telegram', connected: false, requiresPro: true },
    { name: 'Instagram', connected: false, requiresPro: true }
  ]);

  useEffect(() => {
    // Simulate receiving suspicious messages
    const interval = setInterval(() => {
      const connectedPlatforms = platforms.filter(p => p.connected);
      if (connectedPlatforms.length > 0) {
        const randomPlatform = connectedPlatforms[Math.floor(Math.random() * connectedPlatforms.length)];
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Bell className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Suspicious Message Detected
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Potential scam detected in your {randomPlatform.name} messages.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                View
              </button>
            </div>
          </div>
        ), { duration: 5000 });
      }
    }, 30000); // Show notification every 30 seconds

    return () => clearInterval(interval);
  }, [platforms]);

  const handleConnect = (platformName: string) => {
    setPlatforms(platforms.map(platform => 
      platform.name === platformName 
        ? { ...platform, connected: !platform.connected }
        : platform
    ));

    if (!platforms.find(p => p.name === platformName)?.connected) {
      toast.success(`Connected to ${platformName} successfully!`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Messaging Platforms</h2>
      <div className="space-y-4">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <h3 className="font-medium">{platform.name}</h3>
                <p className="text-sm text-gray-500">
                  {platform.connected ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            
            {platform.requiresPro ? (
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-sm text-orange-500">Pro Plan Required</span>
              </div>
            ) : (
              <button
                onClick={() => handleConnect(platform.name)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  platform.connected
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {platform.connected ? 'Disconnect' : 'Connect'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagingIntegration;