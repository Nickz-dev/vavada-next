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
  card?: {
    iconBg?: string;
    titleColor?: string;
    textColor?: string;
  };
  items?: FeatureItem[];
}

interface MainFeaturesProps {
  templateData?: {
    features?: FeaturesData;
  };
  lang: string;
}

export const MainFeatures: React.FC<MainFeaturesProps> = ({
  templateData = {},
  lang,
}) => {
  // Значения по умолчанию
  const defaultFeatures = {
    bgColor: "bg-[#232338]",
    titleColor: "text-white",
    card: {
      iconBg: "bg-[#ff424d]",
      titleColor: "text-white",
      textColor: "text-gray-400",
    },
    items: [
      {
        title: "Licensed Games",
        description: "5000+ slots from top providers with official license",
        icon: "✅",
      },
      {
        title: "Fast Payouts",
        description: "Instant withdrawals to cards and popular payment systems",
        icon: "⚡",
      },
      {
        title: "Generous Bonuses",
        description: "Welcome bonuses, free spins and regular promotions",
        icon: "🎁",
      },
    ],
  };

  // Безопасное извлечение данных
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

  // Переводы
  const t = lang === "ru" ? ru.features : en.features;

  // Объединение с переводами
  const items = features.items.map((item, index) => {
    const translatedItem = t?.items?.[index] || {};
    return {
      ...item,
      title: translatedItem.title || item.title,
      description: translatedItem.description || item.description,
    };
  });

  return (
    <div className={`${features.bgColor} p-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold ${features.titleColor} mb-6`}>
          {t?.title || "VAVADA Casino Advantages"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center justify-center h-12 w-12 rounded-md ${features.card.iconBg}`}
                >
                  {feature.icon || "•"}
                </span>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${features.card.titleColor}`}>
                  {feature.title}
                </h3>
                <p className={features.card.textColor}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};