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
  bonusesData,
}) => {
  const isRu = lang === "ru";
  const localeSection =
    bonusesData ||
    (isRu ? ru.bonusesSection : en.bonusesSection) || {
      title: isRu ? "Бонусы Vavada" : "Vavada Bonuses",
      items: [],
    };
  const typedLocale = localeSection as {
    title?: string;
    subtitle?: string;
    highlights?: string[];
    items?: BonusItem[];
  };

  const defaultBonuses = {
    bgColor: "bg-[#1f1f33]",
    cardBg: "bg-[#2a2a42]",
    titleColor: "text-white",
    subtitleColor: "text-gray-300",
    bonusColor: "text-[#ff9f68]",
    amountColor: "text-white",
    descriptionColor: "text-gray-300",
    chipBg: "bg-white/10",
    chipText: "text-white",
    cta: {
      bg: "bg-[#ff424d]",
      hoverBg: "hover:bg-[#ff2c39]",
      text: "text-white",
    },
    items: [
      {
        title: isRu ? "Welcome + фриспины" : "Welcome + free spins",
        amount: "100% + 100FS",
        description: isRu
          ? "Первый депозит, слот недели и стартовая страховка"
          : "First deposit, slot of the week and starter insurance",
        ctaText: isRu ? "Забрать" : "Claim now",
        link: "/registration",
      },
      {
        title: isRu ? "Кэшбэк понедельника" : "Monday cashback",
        amount: isRu ? "до 10%" : "up to 10%",
        description: isRu
          ? "Возврат чистого проигрыша с вейджером x5"
          : "Refund on net losses with x5 wager",
        ctaText: isRu ? "Подробнее" : "Details",
        link: "/bonuses/#cashback",
      },
      {
        title: isRu ? "Reload пятницы" : "Friday reload",
        amount: "50% + FS",
        description: isRu
          ? "Промокоды на повторные депозиты и турниры"
          : "Promo codes for reload deposits and tournaments",
        ctaText: isRu ? "Активировать" : "Activate",
        link: "/bonuses/#reload",
      },
    ],
  };

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

  const combinedItems = bonuses.items.map((bonus, index) => {
    const translatedBonus = typedLocale?.items?.[index];
    return {
      ...bonus,
      ...(translatedBonus || {}),
    };
  });

  const subtitle =
    typedLocale?.subtitle ||
    (isRu
      ? "Выбирайте бонус под стратегию: welcome для старта, кэшбэк для защиты банка и reload для турнирных недель."
      : "Pick a bonus for every phase: welcome for launch, cashback for bankroll safety and reload for tournament weeks.");

  const highlights =
    typedLocale?.highlights ||
    (isRu
      ? ["Mirror-safe", "VIP support", "Push о новых акциях"]
      : ["Mirror safe", "VIP support", "Push alerts"]);

  return (
    <section className={`${bonuses.bgColor} py-10 px-4`}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            {isRu ? "акции vavada" : "vavada promos"}
          </p>
          <h2 className={`text-3xl md:text-4xl font-bold ${bonuses.titleColor}`}>
            {typedLocale?.title || (isRu ? "Актуальные бонусы" : "Current bonuses")}
          </h2>
          <p className={`${bonuses.subtitleColor} text-base md:text-lg`}>
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {highlights.map((item: string, idx: number) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${bonuses.chipBg} ${bonuses.chipText}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {combinedItems.map((bonus, index) => (
            <div
              key={`${bonus.title}-${index}`}
              className={`${bonuses.cardBg} rounded-2xl p-6 flex flex-col gap-4 border border-white/5`}
            >
              <div className="space-y-2">
                <p className={`text-sm uppercase tracking-widest ${bonuses.bonusColor}`}>
                  {bonus.title}
                </p>
                <p className={`text-3xl font-bold ${bonuses.amountColor}`}>
                  {bonus.amount}
                </p>
                <p className={`${bonuses.descriptionColor} text-sm`}>
                  {bonus.description}
                </p>
              </div>

              <Link
                href={`/${lang}${bonus.link}`}
                className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-semibold transition-colors ${bonuses.cta.bg} ${bonuses.cta.text} ${bonuses.cta.hoverBg}`}
              >
                {bonus.ctaText}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center md:text-left text-sm text-white/70">
          {isRu ? (
            <>
              Хотите больше? Загляните в{" "}
              <Link href={`/${lang}/bonuses`} className="text-[#ff9f68] underline">
                полный каталог акций
              </Link>{" "}
              — там свежие промокоды и VIP-программы.
            </>
          ) : (
            <>
              Need more? Open the{" "}
              <Link href={`/${lang}/bonuses`} className="text-[#ff9f68] underline">
                full promo hub
              </Link>{" "}
              for fresh promo codes and VIP programs.
            </>
          )}
        </div>
      </div>
    </section>
  );
};