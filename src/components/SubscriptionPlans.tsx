import React from 'react';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: {
      'Basic Text Analysis': true,
      'URL Checker': true,
      'Email Analysis': true,
      'WhatsApp Integration': false,
      'Telegram Integration': false,
      'Instagram Integration': false,
      'Detailed Reports': false,
      'Priority Support': false,
      'API Access': false
    }
  },
  {
    name: 'Basic',
    price: '$2/month',
    features: {
      'Basic Text Analysis': true,
      'URL Checker': true,
      'Email Analysis': true,
      'WhatsApp Integration': true,
      'Telegram Integration': false,
      'Instagram Integration': false,
      'Detailed Reports': true,
      'Priority Support': false,
      'API Access': false
    }
  },
  {
    name: 'Pro',
    price: '$5/month',
    features: {
      'Basic Text Analysis': true,
      'URL Checker': true,
      'Email Analysis': true,
      'WhatsApp Integration': true,
      'Telegram Integration': true,
      'Instagram Integration': true,
      'Detailed Reports': true,
      'Priority Support': true,
      'API Access': true
    }
  }
];

const SubscriptionPlans: React.FC = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-all hover:scale-105"
            >
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-center text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-4 text-center">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                </p>
                <ul className="mt-8 space-y-4">
                  {Object.entries(plan.features).map(([feature, included]) => (
                    <li key={feature} className="flex items-center">
                      {included ? (
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-3" />
                      )}
                      <span className={included ? 'text-gray-900' : 'text-gray-400'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button
                    className={`w-full px-4 py-2 rounded-md font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan.name === 'Free'
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.name === 'Free' ? 'Get Started' : 'Subscribe Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;