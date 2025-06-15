import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface WhyChooseUsProps {
  templateData?: {
    whyChooseUs?: {
      bgColor?: string;
      titleColor?: string;
      proseColor?: string;
      content?: {
        paragraphs?: string[];
        advantages?: string[];
      };
    };
    [key: string]:  unknown; // Allow other properties like colorClass, header, footer
  };
  lang: string;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.whyChooseUs : en.whyChooseUs;

  // Values by default
  const defaultData = {
    bgColor: "bg-[#232338]",
    titleColor: "text-white",
    proseColor: "prose-invert",
    content: {
      paragraphs: [
        "Онлайн казино VAVADA — это лицензированная игровая платформа...",
        "Наши преимущества:",
      ],
      advantages: [
        "Более 5000 лицензионных слотов от топовых провайдеров",
        "Щедрая бонусная программа с приветственным пакетом до 100,000₽",
        "Моментальные выплаты на все популярные платежные системы",
        "Круглосуточная поддержка на русском языке",
        "Регулярные турниры с крупными призовыми фондами",
      ],
    },
  };

  // Safely extract data
  const whyChooseUsData = templateData?.whyChooseUs || {};
  const data = {
    ...defaultData,
    ...whyChooseUsData,
    content: {
      ...defaultData.content,
      ...(whyChooseUsData.content || {}),
    },
  };

  // Merge with translations
  const content = {
    paragraphs: t?.content?.paragraphs || data.content.paragraphs,
    advantages: t?.content?.advantages || data.content.advantages,
  };

  return (
    <div className={`${data.bgColor} p-8`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <h2 className={`text-3xl font-bold ${data.titleColor} mb-6`}>
          {t?.title || "Why Choose Us?"}
        </h2>
        <div className={`prose ${data.proseColor} max-w-none`}>
          {content.paragraphs?.map((paragraph, index) => (
            <p key={`p-${index}`} className="mb-4">
              {paragraph}
            </p>
          ))}

          <ul className="space-y-2">
            {content.advantages?.map((advantage, index) => (
              <li key={`li-${index}`}>{advantage}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};