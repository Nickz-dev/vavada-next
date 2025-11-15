import React, { useState } from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface RegistrationFAQProps {
  templateData?: any;
  lang: string;
}

const RegistrationFAQ: React.FC<RegistrationFAQProps> = ({
  templateData,
  lang,
}) => {
  const locale = lang === "ru" ? (ru as any) : (en as any);
  const t = locale.registrationFAQ || {};

  const defaultFAQ = [
    {
      question:
        lang === "ru"
          ? "Можно ли создать второй аккаунт?"
          : "Can I create a second account?",
      answer:
        lang === "ru"
          ? "Нет, правила казино разрешают иметь только один аккаунт. Создание мультиаккаунтов запрещено."
          : "No, casino rules allow only one account per player. Creating multiple accounts is prohibited.",
    },
    {
      question:
        lang === "ru"
          ? "Когда нужно проходить верификацию?"
          : "When do I need to verify my account?",
      answer:
        lang === "ru"
          ? "Верификация требуется при первом выводе средств или при достижении определенной суммы выигрыша."
          : "Verification is required for your first withdrawal or when reaching a certain win amount.",
    },
    {
      question:
        lang === "ru"
          ? "Что делать если забыл пароль?"
          : "What to do if I forgot my password?",
      answer:
        lang === "ru"
          ? "Воспользуйтесь функцией восстановления пароля через email или обратитесь в службу поддержки."
          : "Use the password recovery function via email or contact our support team.",
    },
  ];

  const defaultStyles = {
    section: "bg-[#15152a] rounded-3xl p-6 md:p-10 border border-white/5",
    title: "text-2xl md:text-3xl font-bold text-white mb-6",
    item: "bg-[#1c1c2d] rounded-2xl border border-white/5 p-6",
    question: "text-lg font-semibold text-white",
    answer: "text-gray-300 text-sm mt-3",
  };

  const styles = templateData?.registrationFAQ?.styles || defaultStyles;
  const faqItems = templateData?.registrationFAQ?.items || t.items || defaultFAQ;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className={styles.title}>
          {t.title ||
            (lang === "ru"
              ? "Часто задаваемые вопросы"
              : "Frequently Asked Questions")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item: any, index: number) => (
            <div
              key={index}
              className={`${styles.item} cursor-pointer transition-all duration-300 ${
                openIndex === index ? "ring-2 ring-[#ff424d]" : "hover:ring-1 hover:ring-[#ff424d]/50"
              }`}
              onClick={() => toggleItem(index)}
            >
              <div className="flex justify-between items-start">
                <h3 className={styles.question}>{item.question}</h3>
                <svg
                  className={`w-5 h-5 text-[#ff424d] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
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
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationFAQ;
