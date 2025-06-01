import React from 'react';
import { Shield } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import ScamDetectorTabs from './components/ScamDetectorTabs';
import SubscriptionPlans from './components/SubscriptionPlans';
import MessagingIntegration from './components/MessagingIntegration';
import LandingShowcase from './components/LandingShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Sentinel AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced AI protection against scams, powered by real-time monitoring and multi-platform integration.
          </p>
        </div>
        
        <LandingShowcase />
        <ScamDetectorTabs />
        <div className="mt-12">
          <MessagingIntegration />
        </div>
        <div className="mt-12">
          <SubscriptionPlans />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;