import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      settings: {
        title: 'Settings',
        sensitivity: {
          title: 'Detection Sensitivity',
          low: 'Low - Fewer alerts, only high-confidence threats',
          medium: 'Medium - Balanced detection',
          high: 'High - Maximum protection, may include false positives'
        },
        language: {
          title: 'Language'
        },
        notifications: {
          title: 'Notifications',
          enable: 'Enable real-time threat alerts'
        }
      }
    }
  },
  fr: {
    translation: {
      settings: {
        title: 'Paramètres',
        sensitivity: {
          title: 'Sensibilité de détection',
          low: 'Faible - Moins d\'alertes, menaces à haute confiance uniquement',
          medium: 'Moyenne - Détection équilibrée',
          high: 'Élevée - Protection maximale, peut inclure des faux positifs'
        },
        language: {
          title: 'Langue'
        },
        notifications: {
          title: 'Notifications',
          enable: 'Activer les alertes de menaces en temps réel'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;