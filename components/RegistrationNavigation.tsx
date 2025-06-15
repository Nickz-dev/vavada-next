import React from 'react';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

interface RegistrationNavigationProps {
  lang: string;
  templateData?: any;
}

const RegistrationNavigation: React.FC<RegistrationNavigationProps> = ({ 
  lang, 
  templateData 
}) => {
  // Получаем переводы
  const ruTranslations = ru as any;
  const enTranslations = en as any;
  
  const t = lang === 'ru' 
    ? ruTranslations.registrationNavigation || {}
    : enTranslations.registrationNavigation || {};

  // Значения по умолчанию
  const defaultItems = [
    { id: 'steps', text: lang === 'ru' ? 'Как зарегистрироваться' : 'How to register' },
    { id: 'benefits', text: lang === 'ru' ? 'Преимущества' : 'Benefits' },
    { id: 'verification', text: lang === 'ru' ? 'Верификация' : 'Verification' },
    { id: 'faq', text: lang === 'ru' ? 'Вопросы' : 'FAQ' }
  ];

  // Стиль по умолчанию
  const defaultStyle = {
    nav: 'bg-[#2a2a42] p-6  sticky top-2 z-10 shadow-lg',
    link: 'flex items-center text-[#ff424d] hover:text-[#ff2c39] font-medium transition-colors',
    icon: 'w-5 h-5 mr-2'
  };

  // Стили из шаблона или по умолчанию
  const styles = templateData?.registrationNavigation?.styles || defaultStyle;

  return (
    <nav className={styles.nav}>
      <ul className="flex flex-wrap gap-4 md:gap-6 justify-center">
        {defaultItems.map((item, index) => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`} 
              className={styles.link}
            >
              <svg 
                className={styles.icon} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {t[item.id] || item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RegistrationNavigation;