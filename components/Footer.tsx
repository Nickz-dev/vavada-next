import { FC } from 'react';
import Link from 'next/link';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

interface FooterSection {
  title: string;
  links?: Record<string, string>;
}

interface FooterContent {
  about: FooterSection;
  games: FooterSection;
  bonusesSection: FooterSection;
  support: FooterSection;
  payments: {
    title: string;
  };
  responsible: {
    title: string;
    text: string;
  };
  license: {
    title: string;
    text: string;
  };
  copyright: string;
  legal: Record<string, string>;
}

interface FooterProps {
  templateData: {
    footer?: {
      bgColor?: string;
      borderColor?: string;
      textColor?: string;
      hoverTextColor?: string;
      cardBgColor?: string;
      brandName?: string;
    };
  };
  lang: string;
  footerData?: FooterContent; // Добавлен новый пропс
}

const Footer: FC<FooterProps> = ({ templateData, lang, footerData }) => {
  // Получаем переводы с безопасным доступом
  const translations = lang === 'ru' ? ru : en;
  const t = footerData || (lang === 'ru' ? ru.footer : en.footer) as FooterContent;
  
  // Значения по умолчанию
  const defaultFooter = {
    bgColor: 'bg-[#1c1c2d]',
    borderColor: 'border-[#383856]',
    textColor: 'text-gray-300',
    hoverTextColor: 'hover:text-white',
    cardBgColor: 'bg-[#232338]',
    brandName: 'Казино'
  };

  const footer = templateData?.footer || defaultFooter;
  const currentYear = new Date().getFullYear();

  const safeFooter = {
    bgColor: footer.bgColor || defaultFooter.bgColor,
    borderColor: footer.borderColor || defaultFooter.borderColor,
    textColor: footer.textColor || defaultFooter.textColor,
    hoverTextColor: footer.hoverTextColor || defaultFooter.hoverTextColor,
    cardBgColor: footer.cardBgColor || defaultFooter.cardBgColor,
    brandName: footer.brandName || defaultFooter.brandName
  };

  const translateText = (text: string) => {
    return text
      .replace(/{brandName}/g, safeFooter.brandName)
      .replace(/{year}/g, currentYear.toString());
  };

  // Секции с безопасным доступом
  const sections = [
    { key: 'about', data: t.about },
    { key: 'games', data: t.games },
    { key: 'bonusesSection', data: t.bonusesSection }, // Изменено с bonuses на bonusesSection
    { key: 'support', data: t.support }
  ] as const;

  return (
    <footer className={`${safeFooter.bgColor} ${safeFooter.textColor} border-t ${safeFooter.borderColor}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Основные секции */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {sections.map(({ key, data }) => (
            <div key={key}>
              {data?.title && (
                <h2 className="text-xl font-bold text-white mb-4">{data.title}</h2>
              )}
              
              {data?.links && Object.keys(data.links).length > 0 && (
                <ul className="space-y-3">
                  {Object.entries(data.links).map(([linkKey, text]) => (
                    <li key={linkKey}>
                      <Link 
                        href={`/${lang}/${linkKey}`} 
                        className={`${safeFooter.hoverTextColor} transition-colors block`}
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Платежные методы */}
        <div className={`border-t ${safeFooter.borderColor} pt-8 mb-8`}>
          {t.payments?.title && (
            <h3 className="text-lg font-semibold text-white mb-4">{t.payments.title}</h3>
          )}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['Visa', 'MasterCard', 'МИР', 'Qiwi', 'ЮMoney', 'Tether'].map((method) => (
              <div key={method} className={`${safeFooter.cardBgColor} rounded p-3 text-center`}>
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Ответственная игра и лицензия */}
        <div className={`border-t ${safeFooter.borderColor} pt-8 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ответственная игра */}
            {t.responsible && (
              <div>
                {t.responsible.title && (
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t.responsible.title}
                  </h3>
                )}
                {t.responsible.text && (
                  <p className="text-sm">
                    {translateText(t.responsible.text)}
                  </p>
                )}
              </div>
            )}

            {/* Лицензия */}
            {t.license && (
              <div>
                {t.license.title && (
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t.license.title}
                  </h3>
                )}
                {t.license.text && (
                  <p className="text-sm">
                    {translateText(t.license.text)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Нижняя секция */}
        <div className={`border-t ${safeFooter.borderColor} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Копирайт */}
            {t.copyright && (
              <div className="text-sm mb-4 md:mb-0">
                {translateText(t.copyright)}
              </div>
            )}
            
            {/* Правовые ссылки */}
            {t.legal && Object.keys(t.legal).length > 0 && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm text-center">
                {Object.entries(t.legal).map(([key, text]) => (
                  <Link 
                    key={key} 
                    href={`/${lang}/faq#${key}`} 
                    className={`${safeFooter.hoverTextColor} transition-colors`}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;