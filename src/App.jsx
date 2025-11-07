


import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import Footer from './components/Footer';

import SettingsBar from './components/SettingsBar';

import OfflineBanner from './components/OfflineBanner';

import HomePage from './pages/HomePage';

import AlertsPage from './pages/AlertsPage';

import VaccinesPage from './pages/VaccinesPage';

import AdvisoriesPage from './pages/AdvisoriesPage';

import ResourcesPage from './pages/ResourcesPage';

import useSettingsStore from './store/settingsStore';



const App = () => {

  const { textSize, highContrast } = useSettingsStore();



  return (

    <Router>

      <div

        style={{ fontSize: `${textSize}px` }}

        className={`flex flex-col min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>

        <Header />

        <SettingsBar />

        <OfflineBanner />

        <main className="flex-grow container mx-auto p-4">

          <Routes>

            <Route path="/" element={<HomePage />} />

            <Route path="/alerts" element={<AlertsPage />} />

            <Route path="/vaccines" element={<VaccinesPage />} />

            <Route path="/advisories" element={<AdvisoriesPage />} />

            <Route path="/resources" element={<ResourcesPage />} />

          </Routes>

        </main>

        <Footer />

      </div>

    </Router>

  );

};



export default App;
