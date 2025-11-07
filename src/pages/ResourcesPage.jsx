
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fetchData from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ResourcesPage = () => {
  const { t, i18n } = useTranslation();
  const [resources, setResources] = useState([]);
  const miraBhayandarCords = [19.29, 72.86]; // Mira Bhayandar coordinates

  useEffect(() => {
    const getResources = async () => {
      const data = await fetchData('resources');
      setResources(data.filter(item => item.language === i18n.language));
    };
    getResources();
  }, [i18n.language]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{t('resources.title')}</h1>

      <div className="mb-8" style={{ height: '400px', width: '100%' }}>
        <MapContainer center={miraBhayandarCords} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {resources.filter(r => r.type === 'clinic').map(resource => (
            <Marker key={resource.id} position={[resource.lat, resource.lng]}>
              <Popup>
                <b>{resource.title}</b><br />
                {resource.summary}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{resource.title}</h2>
            <p className="text-gray-600 mb-2">{resource.category}</p>
            <p>{resource.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {resource.phone && (
                <a href={`tel:${resource.phone}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Call now
                </a>
              )}
              {resource.fullText && (
                <button onClick={() => copyToClipboard(resource.fullText)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Copy Address
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
