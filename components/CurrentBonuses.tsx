import React from "react";
import Link from "next/link";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface BonusItem {
  title: string;
  amount: string;
  description: string;
  ctaText: string;
  link: string;
}

interface BonusesSection {
  title: string;
  items: BonusItem[];
}

interface CurrentBonusesProps {
  templateData?: {
    bonuses?: {
      bgColor?: string;
      cardBg?: string;
      titleColor?: string;
      bonusColor?: string;
      amountColor?: string;
      descriptionColor?: string;
      cta?: {
        bg?: string;
        hoverBg?: string;
        text?: string;
      };
      items?: BonusItem[];
    };
  };
  lang: string;
  bonusesData?: BonusesSection; // Добавлен пропс bonusesData
}

export const CurrentBonuses: React.FC<CurrentBonusesProps> = ({
  templateData = {},
  lang,
  bonusesData // Принимаем новый пропс
}) => {
  // Значения по умолчанию
  const defaultBonuses = {
    bgColor: "bg-[#232338]",
    cardBg: "bg-[#2a2a42]",
    titleColor: "text-white",
    bonusColor: "text-[#ff424d]",
    amountColor: "text-white",
    descriptionColor: "text-gray-400",
    cta: {
      bg: "bg-[#ff424d]",
      hoverBg: "hover:bg-[#ff2c39]",
      text: "text-white",
    },
    items: [
      {
        title: "Welcome Package",
        amount: "100% up to ₽100,000",
        description: "+100 free spins for new players",
        ctaText: "Get Bonus",
        link: "/registration",
      },
      {
        title: "Cashback",
        amount: "Up to 10%",
        description: "Weekly moneyback",
        ctaText: "Details",
        link: "/bonuses/cashback",
      },
      {
        title: "Reload Bonus",
        amount: "50% on deposit",
        description: "Every Friday",
        ctaText: "Details",
        link: "/bonuses/reload",
      },
    ],
  };

  // Безопасное извлечение данных
  const bonusesFromProps = templateData?.bonuses || {};
  const bonuses = {
    ...defaultBonuses,
    ...bonusesFromProps,
    cta: {
      ...defaultBonuses.cta,
      ...(bonusesFromProps.cta || {}),
    },
    items: bonusesFromProps.items || defaultBonuses.items,
  };

  // Используем переданные данные о бонусах или получаем из переводов
  const bonusesSection = bonusesData || (lang === "ru" ? ru.bonusesSection : en.bonusesSection) || {
    title: lang === "ru" ? "Актуальные бонусы" : "Current Bonuses",
    items: []
  };

  // Объединение бонусов с переводами
  const itemsWithTranslations = bonuses.items.map((bonus, index) => {
    const translatedBonus = bonusesSection?.items?.[index] || {};
    return {
      ...bonus,
      title: translatedBonus.title || bonus.title,
      amount: translatedBonus.amount || bonus.amount,
      description: translatedBonus.description || bonus.description,
      ctaText: translatedBonus.ctaText || bonus.ctaText,
    };
  });

  return (
    <div className={`${bonuses.bgColor} p-8`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold ${bonuses.titleColor} mb-6`}>
          {bonusesSection?.title || "Current Bonuses"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {itemsWithTranslations.map((bonus, index) => (
            <div key={index} className={`${bonuses.cardBg} rounded-xl p-6`}>
              <div className={`text-xl font-bold mb-2 ${bonuses.bonusColor}`}>
                {bonus.title}
              </div>
              <div className={`text-2xl font-bold mb-4 ${bonuses.amountColor}`}>
                {bonus.amount}
              </div>
              <p className={`${bonuses.descriptionColor} mb-4`}>
                {bonus.description}
              </p>
              <Link
                href={`/${lang}${bonus.link}`}
                className={`inline-flex items-center justify-center w-full px-4 py-2 ${bonuses.cta.bg} ${bonuses.cta.text} rounded-md ${bonuses.cta.hoverBg} transition-colors`}
              >
                {bonus.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};