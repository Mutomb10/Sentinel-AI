import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Bell, Shield } from 'lucide-react';
import { SensitivityLevels, setSensitivity } from '../services/scamDetectionService';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [sensitivity, setSensitivityLevel] = useState(SensitivityLevels.MEDIUM);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(i18n.language);

  const handleSensitivityChange = (level: number) => {
    setSensitivityLevel(level);
    setSensitivity(level);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <SettingsIcon className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">{t('settings.title')}</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Shield className="h-5 w-5 text-blue-500 mr-2" />
            {t('settings.sensitivity.title')}
          </h3>
          <div className="space-y-2">
            {Object.entries(SensitivityLevels).map(([level, value]) => (
              <button
                key={level}
                onClick={() => handleSensitivityChange(value)}
                className={`w-full px-4 py-2 rounded-lg text-left ${
                  sensitivity === value
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {t(`settings.sensitivity.${level.toLowerCase()}`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Globe className="h-5 w-5 text-green-500 mr-2" />
            {t('settings.language.title')}
          </h3>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Bell className="h-5 w-5 text-purple-500 mr-2" />
            {t('settings.notifications.title')}
          </h3>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>{t('settings.notifications.enable')}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;