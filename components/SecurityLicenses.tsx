import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface BadgeItem {
  text: string;
  dotColor: string;
}

interface SectionItem {
  title: string;
  content: string;
  badges: BadgeItem[];
}

interface SecurityLicensesProps {
  templateData?: {
    securityLicenses?: {
      bgColor?: string;
      titleColor?: string;
      cardBg?: string;
      textColor?: string;
      badgeTextColor?: string;
      sections?: SectionItem[];
    };
    [key: string]:  unknown; // Allow other properties
  };
  lang: string;
}

export const SecurityLicenses: React.FC<SecurityLicensesProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.securityLicenses : en.securityLicenses;

  // Default values
  const defaultData = {
    bgColor: "bg-[#232338]",
    titleColor: "text-white",
    cardBg: "bg-[#1c1c2d]",
    textColor: "text-gray-400",
    badgeTextColor: "text-gray-300",
    sections: [
      {
        title: "Лицензия и сертификаты",
        content:
          "VAVADA работает по лицензии Curacao eGaming №8048/JAZ2014-006...",
        badges: [
          { text: "Curacao Licensed", dotColor: "bg-green-500" },
          { text: "RNG Certified", dotColor: "bg-blue-500" },
          { text: "eCOGRA Approved", dotColor: "bg-purple-500" },
        ],
      },
      {
        title: "Безопасные платежи",
        content: "Все транзакции защищены современным SSL-шифрованием...",
        badges: [
          { text: "Visa Secure", dotColor: "bg-[#ff424d]" },
          { text: "Mastercard SecureCode", dotColor: "bg-[#ff424d]" },
          { text: "SSL Encryption", dotColor: "bg-[#ff424d]" },
          { text: "PCI DSS Compliant", dotColor: "bg-[#ff424d]" },
        ],
      },
    ],
  };

  // Safely extract data
  const securityLicensesData = templateData?.securityLicenses || {};
  const data = {
    ...defaultData,
    ...securityLicensesData,
    sections: securityLicensesData.sections || defaultData.sections,
  };

  // Merge with translations
  const sections = t?.sections || data.sections;

  return (
    <div className={`${data.bgColor} p-4 sm:p-8`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <h2
          className={`text-xl sm:text-3xl font-bold ${data.titleColor} mb-4 sm:mb-6`}
        >
          {t?.title || "Security & Reliability"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3
                className={`text-lg sm:text-xl font-bold ${data.titleColor} mb-3 sm:mb-4`}
              >
                {section.title}
              </h3>
              <p className={`text-sm sm:text-base ${data.textColor} mb-4`}>
                {section.content}
              </p>
              <div className="flex flex-wrap gap-3">
                {section.badges.map((badge, badgeIndex) => (
                  <div
                    key={badgeIndex}
                    className={`${data.cardBg} rounded-lg px-4 py-2 text-xs sm:text-sm ${data.badgeTextColor} flex items-center`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${badge.dotColor}`}
                    ></span>
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};