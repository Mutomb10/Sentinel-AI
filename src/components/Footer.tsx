import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ScamShield</h3>
            <p className="text-gray-300">
              Protecting you from online scams with advanced AI detection tools.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Report a Scam</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Scam Database</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-gray-300 mb-2">
              Stay up to date with the latest scam alerts.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ScamShield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;