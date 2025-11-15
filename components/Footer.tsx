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
    { key: 'bonusesSection', data: t.bonusesSection },
    { key: 'support', data: t.support }
  ] as const;

  return (
    <footer className={`${safeFooter.bgColor} ${safeFooter.textColor} border-t ${safeFooter.borderColor}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Верхняя зона: бренд и CTA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              {lang === "ru" ? "о проекте" : "about"}
            </p>
            <h2 className="text-3xl font-bold text-white">
              {safeFooter.brandName} Vavada Online Casino
            </h2>
            <p className="text-sm text-gray-400 max-w-xl mt-2">
              {lang === "ru"
                ? "Рабочие зеркала, быстрые выплаты и круглосуточная поддержка. Приложение и веб-версия синхронизированы, доступ к аккаунту открыт с любого устройства."
                : "Working mirrors, fast payouts and 24/7 support. The app and web version stay in sync so your account is accessible from any device."}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${lang}/registration`}
              className="px-6 py-3 rounded-xl bg-[#ff424d] text-white font-semibold hover:bg-[#ff2c39] transition-colors"
            >
              {lang === "ru" ? "Начать игру" : "Start playing"}
            </Link>
            <Link
              href={`/${lang}/mirrors`}
              className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:border-white/40 transition-colors"
            >
              {lang === "ru" ? "Зеркала" : "Mirrors"}
            </Link>
          </div>
        </div>

        {/* Основные секции */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {sections.map(({ key, data }) => (
            <div key={key}>
              {data?.title && (
                <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
                  {data.title}
                </h3>
              )}

              {data?.links && Object.keys(data.links).length > 0 && (
                <ul className="space-y-3 text-sm">
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

        {/* Платежи */}
        <div className="space-y-4">
          {t.payments?.title && (
            <h3 className="text-lg font-semibold text-white">{t.payments.title}</h3>
          )}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {["Visa", "MasterCard", "МИР", "Qiwi", "ЮMoney", "Tether"].map((method) => (
              <div
                key={method}
                className={`${safeFooter.cardBgColor} rounded-xl p-3 text-center text-sm font-medium`}
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Ответственная игра и лицензия */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
          {t.responsible && (
            <div>
              {t.responsible.title && (
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t.responsible.title}
                </h3>
              )}
              {t.responsible.text && (
                <p className="text-sm text-gray-300">
                  {translateText(t.responsible.text)}
                </p>
              )}
            </div>
          )}

          {t.license && (
            <div>
              {t.license.title && (
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t.license.title}
                </h3>
              )}
              {t.license.text && (
                <p className="text-sm text-gray-300">
                  {translateText(t.license.text)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Нижний блок */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          {t.copyright && (
            <div className="text-gray-400">
              {translateText(t.copyright)}
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-gray-400">
            {t.legal &&
              Object.entries(t.legal).map(([key, text]) => (
                <Link
                  key={key}
                  href={`/${lang}/faq#${key}`}
                  className={`${safeFooter.hoverTextColor} transition-colors`}
                >
                  {text}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;