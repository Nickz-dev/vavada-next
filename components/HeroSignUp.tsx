// components/HeroSignUp.tsx
import React, { useContext } from "react";
import { IdContext } from "@/contexts/IdContext";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import Link from "next/link";

interface HeroSignUpProps {
  templateData?: {
    registrationHero?: {
      bgColor?: string;
      stats?: Array<{ value: string; key: string }>;
      cta?: {
        primary?: {
          bg?: string;
          hoverBg?: string;
          shadow?: string;
        };
        secondary?: {
          bg?: string;
          hoverBg?: string;
          border?: string;
          hoverBorder?: string;
        };
      };
      gradient?: string;
    };
  };
  lang: string;
}

export const HeroSignUp: React.FC<HeroSignUpProps> = ({
  templateData,
  lang,
}) => {
  // Получаем переводы с защитой от отсутствия данных
  const ruTranslations = ru as any;
  const enTranslations = en as any;

  const t =
    lang === "ru"
      ? ruTranslations.registrationHero || {}
      : enTranslations.registrationHero || {};

  const { register } = useContext(IdContext);

  // Значения по умолчанию
  const defaultHero = {
    bgColor: "bg-gradient-to-br from-[#1c1c2d] to-[#2a2a42]",
    stats: [
      { value: "1 мин", key: "time" },
      { value: "100%", key: "bonusPercent" },
      { value: "24/7", key: "support" },
    ],
    cta: {
      primary: {
        bg: "bg-gradient-to-r from-[#ff424d] to-[#ff2c39]",
        hoverBg: "hover:from-[#ff2c39] hover:to-[#ff424d]",
        shadow: "shadow-[#ff424d]/30",
      },
      secondary: {
        bg: "bg-[#2a2a42]",
        hoverBg: "hover:bg-[#2a2a42]/90",
        border: "border border-[#383856]",
        hoverBorder: "hover:border-[#ff424d]/50",
      },
    },
    gradient:
      "bg-gradient-to-r from-[#ff424d]/5 via-transparent to-[#2a2a42]/10",
  };

  const hero = templateData?.registrationHero || defaultHero;
  const stats = hero.stats || defaultHero.stats;

  const cta = {
    primary: {
      ...defaultHero.cta.primary,
      ...hero.cta?.primary,
    },
    secondary: {
      ...defaultHero.cta.secondary,
      ...hero.cta?.secondary,
    },
  };

  // Заголовок по умолчанию
  const defaultTitle =
    lang === "ru"
      ? 'Станьте игроком Vavada Casino <span class="text-[#ff424d]">за 1 минуту</span>'
      : 'Become a Vavada Casino player <span class="text-[#ff424d]">in 1 minute</span>';

  return (
    <section
      className={`relative  overflow-hidden p-8 ${hero.bgColor}`}
      itemScope
      itemType="https://schema.org/Casino"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t.title || defaultTitle }}
              itemProp="name"
            />

            <p className="text-xl text-gray-300 mb-8" itemProp="description">
              {t.description ||
                (lang === "ru"
                  ? "Зарегистрируйтесь и получите эксклюзивный бонус 100% до 100 000₽ + 100 бесплатных вращений"
                  : "Register and get an exclusive 100% bonus up to €1000 + 100 free spins")}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a42]/80 backdrop-blur-sm rounded-xl p-4 text-center border border-[#383856]"
                >
                  <div className="text-2xl font-bold text-[#ff424d]">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {t.stats?.[stat.key as keyof typeof t.stats] ||
                      (lang === "ru"
                        ? {
                            time: "на регистрацию",
                            bonusPercent: "бонус",
                            support: "поддержка",
                          }[stat.key]
                        : {
                            time: "registration",
                            bonusPercent: "bonus",
                            support: "support",
                          }[stat.key])}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`#register-form`}
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white ${cta.primary.bg} ${cta.primary.hoverBg} transition-all ${cta.primary.shadow} hover:shadow-[#ff424d]/50`}
              >
                {t.cta?.primary ||
                  (lang === "ru" ? "Начать регистрацию" : "Start Registration")}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </Link>
              <Link
                href={`/${lang}/bonuses`}
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg ${cta.secondary.bg} text-gray-300 ${cta.secondary.border} ${cta.secondary.hoverBg} ${cta.secondary.hoverBorder} transition-colors hover:text-white`}
              >
                {t.cta?.secondary ||
                  (lang === "ru" ? "Все бонусы" : "All Bonuses")}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative z-10">
            <div className="aspect-square bg-gradient-to-br from-[#ff424d]/10 to-[#2a2a42]/50 rounded-xl shadow-2xl border border-[#383856] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-white mb-4">100%</div>
                <div className="text-2xl text-gray-300">
                  {lang === "ru"
                    ? "Бонус за регистрацию"
                    : "Registration Bonus"}
                </div>
                <div className="text-[#ff424d] font-medium mt-2">
                  {lang === "ru" ? "До 100 000₽" : "Up to €1000"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern.png')] bg-cover"></div>
        <div className={`absolute inset-0 ${hero.gradient}`}></div>
      </div>
    </section>
  );
};
