
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => changeLanguage('en')} className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-700' : 'bg-blue-500'}`}>EN</button>
      <button onClick={() => changeLanguage('hi')} className={`px-3 py-1 rounded ${i18n.language === 'hi' ? 'bg-blue-700' : 'bg-blue-500'}`}>HI</button>
      <button onClick={() => changeLanguage('mr')} className={`px-3 py-1 rounded ${i18n.language === 'mr' ? 'bg-blue-700' : 'bg-blue-500'}`}>MR</button>
      <button onClick={() => changeLanguage('gu')} className={`px-3 py-1 rounded ${i18n.language === 'gu' ? 'bg-blue-700' : 'bg-blue-500'}`}>GU</button>
    </div>
  );
};

export default LanguageSwitcher;
