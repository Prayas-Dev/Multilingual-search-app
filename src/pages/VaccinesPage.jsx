
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fetchData from '../services/api';
import { speak, isSupported } from '../utils/tts';
import useSettingsStore from '../store/settingsStore';

const VaccinesPage = () => {
  const { t, i18n } = useTranslation();
  const { easyReading } = useSettingsStore();
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const getVaccines = async () => {
      const data = await fetchData('vaccines');
      setVaccines(data.filter(item => item.language === i18n.language));
    };
    getVaccines();
  }, [i18n.language]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{t('vaccines.title')}</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {vaccines.map(vaccine => (
          <div key={vaccine.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{vaccine.title}</h2>
            <p className="text-gray-600 mb-2">{vaccine.date}</p>
            <p>{easyReading ? vaccine.summary : vaccine.fullText}</p>
            {isSupported() && (
              <button
                aria-label={`Listen to ${vaccine.title}`}
                onClick={() => speak(`${vaccine.title}. ${easyReading ? vaccine.summary : vaccine.fullText}`, i18n.language)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Listen
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaccinesPage;
