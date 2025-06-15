import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('ru');
  
  useEffect(() => {
    const lang = router.pathname.split('/')[1] || 'ru';
    setCurrentLang(lang);
  }, [router.pathname]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' }
  ];

  const currentPath = router.asPath.replace(`/${currentLang}`, '') || '/';

  const switchLanguage = (lang: string) => {
    localStorage.setItem('preferredLang', lang);
  };

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}${currentPath}`}
          onClick={() => switchLanguage(lang.code)}
          className={`px-2 py-1 rounded ${
            currentLang === lang.code 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          {lang.name}
        </Link>
      ))}
    </div>
  );
};