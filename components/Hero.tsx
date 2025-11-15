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
  type HeroConfig = {
    bgColor: string;
    stats: Array<{ value: string; key: string }>;
    highlights: string[];
    cta: {
      primary: { bg: string; hoverBg: string; shadow: string };
      secondary: { border: string; hoverBg: string };
    };
    gradient: string;
  };

  const t = lang === "ru" ? ru.hero : en.hero;
  const { register, login } = useContext(IdContext);

  const defaultHero: HeroConfig = {
    bgColor: "bg-[#1f1f33]",
    stats: [
      { value: "5000+", key: "games" },
      { value: "100% + 100FS", key: "bonus" },
      { value: "97.8%", key: "rtp" },
      { value: "24/7", key: "support" },
    ],
    highlights: lang === "ru"
      ? ["Рабочие зеркала", "Выплаты 15 минут", "Push про бонусы"]
      : ["Live mirrors", "15-min payouts", "Bonus push alerts"],
    cta: {
      primary: {
        bg: "bg-[#ff424d]",
        hoverBg: "hover:bg-[#ff2c39]",
        shadow: "shadow-[#ff424d]/30",
      },
      secondary: {
        border: "border border-white/20",
        hoverBg: "hover:bg-white/10",
      },
    },
    gradient: "bg-gradient-to-r from-[#ff424d]/15 via-[#ff424d]/5 to-transparent",
  };

  const hero = (templateData?.hero || {}) as Partial<HeroConfig>;
  const stats = hero.stats || defaultHero.stats;
  const highlights = hero.highlights || defaultHero.highlights;
  const cta = {
    primary: { ...defaultHero.cta.primary, ...hero.cta?.primary },
    secondary: { ...defaultHero.cta.secondary, ...hero.cta?.secondary },
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

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                {lang === "ru" ? "официальное зеркало" : "official mirror"}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight" itemProp="slogan">
                {t.title || (lang === "ru" ? "VAVADA — официальный сайт казино" : "VAVADA — official casino")}
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {t.description ||
                (lang === "ru"
                  ? "Вход без VPN, рабочие зеркала, моментальные выплаты и бонусы с фриспинами. Мы обновляем ссылки ежедневно и присылаем push-уведомления."
                  : "VPN-free login, live mirrors, instant payouts and bonus spins. Links refresh daily and push alerts keep you posted.")}
            </p>

            <div className="flex flex-wrap gap-2">
              {highlights.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs uppercase tracking-widest text-white/80 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a42]/80 rounded-xl p-4 text-center transition-transform hover:-translate-y-1"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400">
                    {t?.stats?.[stat.key as keyof typeof t.stats] || stat.key}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/go/${register}`}
                className={`inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg text-white ${cta.primary.bg} ${cta.primary.hoverBg} ${cta.primary.shadow} transition-transform hover:-translate-y-0.5`}
                itemProp="significantLink"
              >
                {t.cta?.register || (lang === "ru" ? "Регистрация" : "Register")}
              </Link>
              <Link
                href={`/${lang}/go/${login}`}
                className={`inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg text-white ${cta.secondary.border} ${cta.secondary.hoverBg} transition-transform hover:-translate-y-0.5`}
              >
                {t.cta?.login || (lang === "ru" ? "Войти" : "Login")}
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="aspect-video bg-gradient-to-br from-[#ff424d]/25 via-[#ff424d]/10 to-[#2a2a42] rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/vavada_logo.svg"
                  alt="Vavada Logo"
                  fill
                  className="object-contain p-6"
                  loading="lazy"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 ${hero.gradient}`}></div>
      <div className="absolute inset-0 opacity-5 mix-blend-overlay"></div>
    </section>
  );
};
