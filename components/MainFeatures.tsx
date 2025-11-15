import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesData {
  bgColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  card?: {
    iconBg?: string;
    titleColor?: string;
    textColor?: string;
  };
  items?: FeatureItem[];
  subtitle?: string;
}

interface MainFeaturesProps {
  templateData?: {
    features?: FeaturesData;
  };
  lang: string;
}

const fallbackItems = (lang: string): FeatureItem[] =>
  lang === "ru"
    ? [
        {
          title: "Лицензированные игры",
          description: "5000+ слотов и live-столов от сертифицированных провайдеров.",
          icon: "🛡️",
        },
        {
          title: "Мгновенные выплаты",
          description: "Выводы на карты и кошельки за 5–15 минут без комиссий.",
          icon: "⚡",
        },
        {
          title: "Бонусы 24/7",
          description: "Приветственные пакеты, промокоды и кэшбэк для всех уровней.",
          icon: "🎁",
        },
      ]
    : [
        {
          title: "Licensed games",
          description: "5000+ slots and live tables from certified providers.",
          icon: "🛡️",
        },
        {
          title: "Instant payouts",
          description: "Withdrawals to cards and wallets within 5–15 minutes, no fees.",
          icon: "⚡",
        },
        {
          title: "Bonuses 24/7",
          description: "Welcome bundles, promo codes and cashback for every tier.",
          icon: "🎁",
        },
      ];

export const MainFeatures: React.FC<MainFeaturesProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = lang === "ru" ? (ru as Record<string, unknown>) : (en as Record<string, unknown>);
  const t = (locale.features as Record<string, unknown>) || {};

  const defaultFeatures = {
    bgColor: "bg-[#0f0f1e]",
    titleColor: "text-white",
    subtitleColor: "text-white/70",
    card: {
      iconBg: "bg-[#ff424d]/10 text-[#ff424d]",
      titleColor: "text-white",
      textColor: "text-gray-400",
    },
    items: fallbackItems(lang),
    subtitle:
      lang === "ru"
        ? "Почему игроки выбирают Vavada: лицензия, скорость выплат и честные акции."
        : "Why players choose Vavada: license, payout speed, and transparent promos.",
  };

  const featuresData = templateData?.features || {};
  const features = {
    ...defaultFeatures,
    ...featuresData,
    card: {
      ...defaultFeatures.card,
      ...(featuresData.card || {}),
    },
    items: featuresData.items || defaultFeatures.items,
  };

  const items = features.items.map((item, index) => {
    const translatedItem = (t?.items as Array<Record<string, string>>)?.[index] || {};
    return {
      ...item,
      title: translatedItem.title || item.title,
      description: translatedItem.description || item.description,
    };
  });

  return (
    <section className={`${features.bgColor} rounded-3xl border border-white/5 p-6 sm:p-10 space-y-6`}>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "преимущества" : "advantages"}
        </p>
        <h2 className={`text-3xl font-bold ${features.titleColor}`}>
          {(t?.title as string) || (lang === "ru" ? "Преимущества Vavada" : "Vavada Advantages")}
        </h2>
        <p className={`text-sm ${features.subtitleColor}`}>
          {(t?.subtitle as string) || features.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((feature, index) => (
          <div
            key={`${feature.title}-${index}`}
            className="bg-[#151526] rounded-2xl p-6 border border-white/5 space-y-3"
          >
            <div
              className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${features.card.iconBg}`}
            >
              {feature.icon || "•"}
            </div>
            <h3 className={`text-xl font-semibold ${features.card.titleColor}`}>
              {feature.title}
            </h3>
            <p className={`${features.card.textColor} text-sm`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

