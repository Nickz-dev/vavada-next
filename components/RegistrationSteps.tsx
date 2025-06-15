import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface RegistrationStepsProps {
  templateData?: any;
  lang: string;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  templateData,
  lang,
}) => {
  // Получаем переводы
  const ruTranslations = ru as any;
  const enTranslations = en as any;

  const t =
    lang === "ru"
      ? ruTranslations.registrationSteps || {}
      : enTranslations.registrationSteps || {};

  // Значения по умолчанию
  const defaultSteps = [
    {
      id: 1,
      title: lang === "ru" ? "Заполнение данных" : "Fill in details",
      items: [
        lang === "ru" ? "Введите действующий email" : "Enter a valid email",
        lang === "ru"
          ? "Придумайте надежный пароль"
          : "Create a strong password",
        lang === "ru"
          ? "Выберите удобную валюту"
          : "Select your preferred currency",
      ],
    },
    {
      id: 2,
      title: lang === "ru" ? "Подтверждение email" : "Email verification",
      items: [
        lang === "ru" ? "Проверьте входящие письма" : "Check your inbox",
        lang === "ru"
          ? "Найдите письмо от Vavada Casino"
          : "Find email from Vavada Casino",
        lang === "ru"
          ? "Перейдите по ссылке подтверждения"
          : "Click the verification link",
      ],
    },
    {
      id: 3,
      title: lang === "ru" ? "Активация бонуса" : "Bonus activation",
      items: [
        lang === "ru"
          ? "Пополните счет на любую сумму"
          : "Make your first deposit",
        lang === "ru"
          ? "Получите 100% бонус до 100 000₽"
          : "Get 100% bonus up to €1000",
        lang === "ru"
          ? "Используйте фриспины в выбранных слотах"
          : "Use free spins in selected slots",
      ],
    },
  ];

  // Стили по умолчанию
  const defaultStyles = {
    section: "bg-[#2a2a42] p-8 md:p-10 mb-12",
    title: "text-3xl p-6 font-bold text-white mb-8 text-center",
    step: "bg-[#1c1c2d]  p-6 border border-[#383856] hover:border-[#ff424d]/50 transition-colors",
    stepHeader: "flex items-center mb-4",
    stepNumber:
      "flex-shrink-0 w-12 h-12 rounded-full bg-[#ff424d]/10 flex items-center justify-center text-2xl font-bold text-[#ff424d]",
    stepTitle: "ml-4 text-xl font-semibold text-white",
    stepContent: "text-gray-400",
    item: "flex items-start",
    icon: "flex-shrink-0 w-5 h-5 text-[#ff424d] mt-0.5",
    itemText: "ml-2",
  };

  // Стили из шаблона или по умолчанию
  const styles = templateData?.registrationSteps?.styles || defaultStyles;
  const steps = templateData?.registrationSteps?.steps || defaultSteps;

  return (
    <section
      id="steps"
      className={styles.section}
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <h2 className={styles.title} itemProp="name">
        {t.title ||
          (lang === "ru"
            ? "3 простых шага для регистрации в Vavada"
            : "3 simple steps to register at Vavada")}
      </h2>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step: any) => (
            <div
              key={step.id}
              className={styles.step}
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>{step.id}</div>
                <h3 className={styles.stepTitle} itemProp="name">
                  {step.title}
                </h3>
              </div>
              <div className={styles.stepContent} itemProp="text">
                <ul className="space-y-3">
                  {step.items.map((item: string, index: number) => (
                    <li key={index} className={styles.item}>
                      <svg
                        className={styles.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className={styles.itemText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationSteps;
