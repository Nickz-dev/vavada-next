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
  const isRu = lang === "ru";
  const t = lang === "ru" ? ru.faq : en.faq;

  const defaultData = {
    bgColor: "bg-[#1f1f33]",
    titleColor: "text-white",
    cardBg: "bg-[#2a2a42]",
    questionColor: "text-white",
    answerColor: "text-gray-300",
    linkColor: "text-[#ff9f68]",
    linkHoverColor: "hover:text-[#ffb68a]",
    items: [
      {
        question: isRu ? "Как зайти на сайт, если основная ссылка не работает?" : "How do I access the site if the main URL is blocked?",
        answer: isRu
          ? "Используйте рабочее зеркало или приложение Vavada. Мы обновляем ссылки ежедневно и отправляем push-уведомления."
          : "Use the working mirror or the Vavada app. We update links daily and send push alerts.",
      },
      {
        question: isRu ? "Нужна ли верификация для вывода выигрыша?" : "Do I need verification to withdraw?",
        answer: isRu
          ? "Да, при первом выводе свыше 10 000₽ потребуется подтвердить личность. Это занимает до 12 часов."
          : "Yes, first withdrawals over 10 000₽/$ require identity verification. It usually takes up to 12 hours.",
      },
      {
        question: isRu ? "Как получить приветственный бонус?" : "How do I claim the welcome bonus?",
        answer: isRu
          ? "Зарегистрируйтесь, подтвердите email и сделайте депозит от 1000₽. Бонус 100% + 100FS начисляется автоматически."
          : "Sign up, verify your email and deposit from $20/€20. The 100% + 100FS bonus is credited automatically.",
      },
      {
        question: isRu ? "Можно ли играть на мобильном без VPN?" : "Can I play on mobile without a VPN?",
        answer: isRu
          ? "Да, приложение Vavada работает без VPN: оно само выбирает зеркало и держит сессию."
          : "Yes, the Vavada app doesn’t need a VPN. It picks the right mirror and keeps your session active.",
      },
    ],
  };

  const faqData = templateData?.faq || {};
  const data = {
    ...defaultData,
    ...faqData,
    items: faqData.items || defaultData.items,
  };

  const items = t?.items || data.items;

  return (
    <section className={`${data.bgColor} rounded-2xl p-6 md:p-10`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            {isRu ? "вопросы и ответы" : "questions & answers"}
          </p>
          <h2 className={`text-3xl md:text-4xl font-bold ${data.titleColor}`}>
            {t?.title || (isRu ? "Часто задаваемые вопросы" : "Frequently Asked Questions")}
          </h2>
          <p className="text-gray-300">
            {"subtitle" in (t || {}) && (t as any).subtitle
              ? (t as any).subtitle
              : isRu
                ? "Мы собрали главное про зеркала, выплаты и бонусы. Если остались вопросы — найдёте полный список в FAQ."
                : "We collected the essentials about mirrors, payouts and bonuses. Still curious? Check the full FAQ."}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={`${item.question}-${index}`}
              className={`${data.cardBg} rounded-2xl p-6 border border-white/5`}
            >
              <h3 className={`text-xl font-semibold ${data.questionColor} mb-2`}>
                {item.question}
              </h3>
              <p className={`${data.answerColor} text-sm md:text-base`}>{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href={`/${lang}/faq`}
            className={`${data.linkColor} ${data.linkHoverColor} text-sm md:text-base font-semibold transition-colors`}
          >
            {t?.linkText || (isRu ? "Смотреть все вопросы →" : "View all questions →")}
          </Link>
        </div>
      </div>
    </section>
  );
};