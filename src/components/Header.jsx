
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MultiLingual App</Link>

        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:underline">{t('header.home')}</Link>
          <Link to="/alerts" className="hover:underline">{t('header.alerts')}</Link>
          <Link to="/vaccines" className="hover:underline">{t('header.vaccines')}</Link>
          <Link to="/advisories" className="hover:underline">{t('header.advisories')}</Link>
          <Link to="/resources" className="hover:underline">{t('header.resources')}</Link>
          <LanguageSwitcher />
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden mt-4">
          <Link to="/" className="block py-2 hover:underline">{t('header.home')}</Link>
          <Link to="/alerts" className="block py-2 hover:underline">{t('header.alerts')}</Link>
          <Link to="/vaccines" className="block py-2 hover:underline">{t('header.vaccines')}</Link>
          <Link to="/advisories" className="block py-2 hover:underline">{t('header.advisories')}</Link>
          <Link to="/resources" className="block py-2 hover:underline">{t('header.resources')}</Link>
          <LanguageSwitcher />
        </div>
      )}
    </header>
  );
};

export default Header;
