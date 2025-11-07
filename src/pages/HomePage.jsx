
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import fetchData from '../services/api';
import { speak, isSupported } from '../utils/tts';
import useSettingsStore from '../store/settingsStore';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { easyReading } = useSettingsStore();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const getAlerts = async () => {
      const data = await fetchData('alerts');
      const filteredAlerts = data.filter(item => item.language === i18n.language);
      setAlerts(filteredAlerts.slice(0, 3));
    };
    getAlerts();
  }, [i18n.language]);

  return (
    <div className="p-4">
      <div className="bg-blue-100 p-8 rounded-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('home.title')}</h1>
        <p className="text-lg">{t('home.hero_text')}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">{t('home.latest_alerts')}</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{alert.title}</h3>
            <p className="text-gray-600 mb-2">{alert.date}</p>
            <p>{easyReading ? alert.summary : alert.fullText}</p>
            {isSupported() && (
              <button
                aria-label={`Listen to ${alert.title}`}
                onClick={() => speak(`${alert.title}. ${easyReading ? alert.summary : alert.fullText}`, i18n.language)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Listen
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/alerts" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {t('home.view_all_alerts')}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
