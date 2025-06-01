import React from 'react';
import { Shield, MessageSquare, Bell, Lock } from 'lucide-react';

const LandingShowcase: React.FC = () => {
  const features = [
    {
      title: "Real-time Protection",
      description: "Get instant alerts when suspicious messages are detected across your connected platforms.",
      image: "https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg",
      icon: <Bell className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Multi-Platform Integration",
      description: "Connect your favorite messaging apps for comprehensive protection.",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
      icon: <MessageSquare className="h-8 w-8 text-green-500" />
    },
    {
      title: "Advanced AI Detection",
      description: "Our AI analyzes patterns and content to identify potential scams before they can harm you.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      icon: <Shield className="h-8 w-8 text-purple-500" />
    },
    {
      title: "Secure & Private",
      description: "Your data is encrypted and protected, ensuring your privacy while keeping you safe.",
      image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
      icon: <Lock className="h-8 w-8 text-red-500" />
    }
  ];

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="relative group">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="mb-3 bg-white/10 backdrop-blur-sm rounded-full w-fit p-2">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingShowcase;