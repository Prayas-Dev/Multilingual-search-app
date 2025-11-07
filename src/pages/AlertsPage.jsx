
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fetchData from '../services/api';
import { speak, isSupported } from '../utils/tts';
import useSettingsStore from '../store/settingsStore';

const AlertsPage = () => {
  const { t, i18n } = useTranslation();
  const { easyReading } = useSettingsStore();
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterRecent, setFilterRecent] = useState(false);

  useEffect(() => {
    const getAlerts = async () => {
      const data = await fetchData('alerts');
      setAlerts(data);
    };
    getAlerts();
  }, []);

  useEffect(() => {
    let filtered = alerts.filter(item => item.language === i18n.language);

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (filterRecent) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter(item => new Date(item.date) >= sevenDaysAgo);
    }

    setFilteredAlerts(filtered);
  }, [alerts, i18n.language, searchTerm, selectedCategory, filterRecent]);

  const categories = [...new Set(alerts.filter(item => item.language === i18n.language).map(item => item.category))];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{t('alerts.title')}</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or summary"
          className="p-2 border rounded-md w-full md:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="recent"
            className="mr-2"
            onChange={(e) => setFilterRecent(e.target.checked)}
          />
          <label htmlFor="recent">Recent (last 7 days)</label>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{alert.title}</h2>
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
    </div>
  );
};

export default AlertsPage;
