import React, { useContext } from "react";
import Image from "next/image";
import { IdContext } from "@/contexts/IdContext";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import Link from "next/link";
interface HeroProps {
  templateData?: {
    hero?: {
      bgColor?: string;
      stats?: Array<{ value: string; key: string }>;
      cta?: {
        primary?: {
          bg?: string;
          hoverBg?: string;
          shadow?: string;
        };
        secondary?: {
          border?: string;
          hoverBg?: string;
        };
      };
      gradient?: string;
    };
    // Добавьте другие возможные свойства
    [key: string]: unknown;
  };
  lang: string;
}

export const Hero: React.FC<HeroProps> = ({ templateData, lang }) => {
  const t = lang === "ru" ? ru.hero : en.hero;
  const { register, login } = useContext(IdContext);

  // Полные значения по умолчанию
  const defaultHero = {
    bgColor: "bg-[#232338]",
    stats: [
      { value: "5000+", key: "games" },
      { value: "₽100K", key: "bonus" },
      { value: "97.8%", key: "rtp" },
      { value: "24/7", key: "support" },
    ],
    cta: {
      primary: {
        bg: "bg-[#ff424d]",
        hoverBg: "hover:bg-[#ff2c39]",
        shadow: "shadow-[#ff424d]/20",
      },
      secondary: {
        border: "border-2 border-[#ff424d]",
        hoverBg: "hover:bg-[#ff424d]/10",
      },
    },
    gradient:
      "bg-gradient-to-r from-[#ff424d]/10 via-[#ff424d]/5 to-transparent",
  };

  const hero = templateData?.hero || defaultHero;
  const stats = hero.stats || defaultHero.stats;

  // Безопасное извлечение cta с полными значениями по умолчанию
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

  return (
    <section
      className={`relative overflow-hidden ${hero.bgColor} p-8`}
      itemScope
      itemType="https://schema.org/Casino"
    >
      <meta itemProp="name" content="VAVADA Casino" />
      <meta itemProp="description" content={t.description} />

      <div
        itemProp="aggregateRating"
        itemScope
        itemType="https://schema.org/AggregateRating"
      >
        <meta itemProp="itemReviewed" content="VAVADA Casino" />
        <meta itemProp="reviewCount" content="5000" />
        <meta itemProp="ratingValue" content="4.9" />
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="worstRating" content="1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <h1
              className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
              itemProp="slogan"
            >
              {t.title || "VAVADA — официальный сайт казино"}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t.description ||
                "Лицензионные игры, моментальные выплаты и щедрые бонусы для новых игроков"}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a42]/80 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
                >
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">
                    {t?.stats?.[stat.key as keyof typeof t.stats] || stat.key}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/go/${register}`}
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${cta.primary.bg} ${cta.primary.hoverBg} ${cta.primary.shadow} transform hover:scale-105 transition-all`}
                itemProp="significantLink"
              >
                {t.cta?.register || "Регистрация"}
              </Link>
              <Link
                href={`/${lang}/go/${login}`}
                className={`inline-flex items-center justify-center px-6 py-3 ${cta.secondary.border} text-base font-medium rounded-md text-white ${cta.secondary.hoverBg} transform hover:scale-105 transition-all`}
              >
                {t.cta?.login || "Войти"}
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative z-10 transform hover:scale-105 transition-transform duration-500">
            <div className="aspect-video bg-gradient-to-br from-[#ff424d]/20 via-[#ff424d]/10 to-[#2a2a42] rounded-lg shadow-2xl">
              <div className="relative w-full h-full">
                <Image
                  src="/vavada_logo.svg" // Путь к SVG (должен быть в public/)
                  alt="Vavada Logo"
                  fill
                  className="object-contain p-4"
                  loading="lazy" // lazy loading (включен по умолчанию в Next.js Image)
                  unoptimized={true} // SVG не нужно оптимизировать (иначе Next.js попытается конвертировать в PNG)
                />
              </div>
              <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover rounded-lg opacity-20 mix-blend-overlay"></div>
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 ${hero.gradient}`}></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 mix-blend-overlay"></div>
      </div>
    </section>
  );
};
