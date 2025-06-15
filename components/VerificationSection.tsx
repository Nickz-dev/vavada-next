import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface VerificationSectionProps {
  templateData?: any;
  lang: string;
}

const VerificationSection: React.FC<VerificationSectionProps> = ({
  templateData,
  lang,
}) => {
  // Получаем переводы
  const ruTranslations = ru as any;
  const enTranslations = en as any;

  const t =
    lang === "ru"
      ? ruTranslations.verificationSection || {}
      : enTranslations.verificationSection || {};

  // Значения по умолчанию
  const defaultContent = {
    title: lang === "ru" ? "Верификация аккаунта" : "Account Verification",
    documents: {
      title: lang === "ru" ? "Необходимые документы" : "Required Documents",
      items: [
        lang === "ru" ? "Паспорт или ID-карта" : "Passport or ID card",
        lang === "ru" ? "Подтверждение адреса" : "Proof of address",
        lang === "ru" ? "Селфи с документом" : "Selfie with document",
      ],
    },
    timeline: {
      title: lang === "ru" ? "Сроки проверки" : "Verification Timeline",
      items: [
        lang === "ru"
          ? "Стандартная проверка: до 24 часов"
          : "Standard verification: up to 24 hours",
        lang === "ru"
          ? "Ускоренная верификация: 1-2 часа"
          : "Express verification: 1-2 hours",
      ],
    },
  };

  // Стили по умолчанию
  const defaultStyles = {
    section: "bg-[#2a2a42] p-8",
    title: "text-2xl font-bold text-white mb-6",
    card: "bg-[#1c1c2d] rounded-xl p-6",
    cardTitle: "text-xl font-semibold text-white mb-4",
    list: "space-y-3 text-gray-300",
    item: "flex items-center",
    bullet: "text-[#ff424d] mr-2",
  };

  // Стили из шаблона или по умолчанию
  const styles = templateData?.verificationSection?.styles || defaultStyles;
  const content = templateData?.verificationSection?.content || defaultContent;

  return (
    <section id="verification" className={styles.section}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className={styles.title}>{t.title || content.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Документы */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              {t.documents?.title || content.documents.title}
            </h3>
            <ul className={styles.list}>
              {(t.documents?.items || content.documents.items).map(
                (item: string, index: number) => (
                  <li key={index} className={styles.item}>
                    <span className={styles.bullet}>•</span>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Сроки */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              {t.timeline?.title || content.timeline.title}
            </h3>
            <ul className={styles.list}>
              {(t.timeline?.items || content.timeline.items).map(
                (item: string, index: number) => (
                  <li key={index} className={styles.item}>
                    <span className={styles.bullet}>•</span>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
