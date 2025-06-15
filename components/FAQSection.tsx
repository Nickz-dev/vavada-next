import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  templateData?: {
    faq?: {
      bgColor?: string;
      titleColor?: string;
      cardBg?: string;
      questionColor?: string;
      answerColor?: string;
      linkColor?: string;
      linkHoverColor?: string;
      items?: FAQItem[];
    };
    [key: string]: unknown; // Allow additional properties
  };
  lang: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.faq : en.faq;

  // Default values
  const defaultData = {
    bgColor: "bg-[#232338]",
    titleColor: "text-white",
    cardBg: "bg-[#2a2a42]",
    questionColor: "text-white",
    answerColor: "text-gray-400",
    linkColor: "text-[#ff424d]",
    linkHoverColor: "hover:text-[#ff2c39]",
    items: [
      {
        question: "Как начать играть в VAVADA?",
        answer: "Для начала игры достаточно зарегистрироваться на сайте...",
      },
      {
        question: "Какие способы вывода средств доступны?",
        answer: "Мы поддерживаем все популярные способы вывода...",
      },
      {
        question: "Как получить приветственный бонус?",
        answer: "Приветственный бонус начисляется автоматически...",
      },
    ],
  };

  // Safely extract data
  const faqData = templateData?.faq || {};
  const data = {
    ...defaultData,
    ...faqData,
    items: faqData.items || defaultData.items,
  };

  // Merge with translations
  const items = t?.items || data.items;

  return (
    <div className={`${data.bgColor} p-8`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <h2 className={`text-3xl font-bold ${data.titleColor} mb-6`}>
          {t?.title || "Frequently Asked Questions"}
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className={`${data.cardBg} rounded-xl p-6`}>
              <h3 className={`text-xl font-bold ${data.questionColor} mb-2`}>
                {item.question}
              </h3>
              <p className={data.answerColor}>{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href={`/${lang}/faq`}
            className={`${data.linkColor} ${data.linkHoverColor} transition-colors`}
          >
            {t?.linkText || "Смотреть все вопросы →"}
          </Link>
        </div>
      </div>
    </div>
  );
};