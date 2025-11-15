// components/HeroSignUp.tsx
import React, { useContext } from "react";
import { IdContext } from "@/contexts/IdContext";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import Link from "next/link";

interface SignUpChecklistItem {
  title: string;
  text: string;
}

interface HeroSignUpProps {
  templateData?: {
    registrationHero?: {
      bgColor?: string;
      gradient?: string;
      stats?: Array<{ value: string; key: string }>;
      checklist?: Record<string, SignUpChecklistItem[]>;
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
    };
  };
  lang: string;
}

const defaultStats = [
  { value: "1 мин", key: "time" },
  { value: "100%", key: "bonusPercent" },
  { value: "24/7", key: "support" },
];

const defaultChecklist: Record<string, SignUpChecklistItem[]> = {
  ru: [
    { title: "Зеркало + VPN-free", text: "Регистрация проходит на актуальном зеркале — вход сохранится даже при смене домена." },
    { title: "KYC по запросу", text: "Паспорт нужны только для крупных выплат; проверка занимает до 30 минут." },
    { title: "Приветственный пакет", text: "100% + фриспины активируются автоматически после депозита." },
  ],
  en: [
    { title: "Mirror + VPN-free", text: "Sign up via live mirror — your login persists even if the domain rotates." },
    { title: "KYC on demand", text: "Docs are needed only for big cashouts; verification takes up to 30 minutes." },
    { title: "Welcome bundle", text: "100% + free spins activate automatically right after your first deposit." },
  ],
};

export const HeroSignUp: React.FC<HeroSignUpProps> = ({
  templateData,
  lang,
}) => {
  const ruTranslations = ru as any;
  const enTranslations = en as any;
  const t =
    lang === "ru"
      ? ruTranslations.registrationHero || {}
      : enTranslations.registrationHero || {};

  const { register } = useContext(IdContext);

  const heroSettings = templateData?.registrationHero || {};
  const stats = heroSettings.stats || defaultStats;
  const checklist =
    heroSettings.checklist?.[lang] ||
    defaultChecklist[lang as keyof typeof defaultChecklist] ||
    [];

  const ctaDefaults = {
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
  };

  const cta = {
    primary: {
      ...ctaDefaults.primary,
      ...heroSettings.cta?.primary,
    },
    secondary: {
      ...ctaDefaults.secondary,
      ...heroSettings.cta?.secondary,
    },
  };

  const titleFallback =
    lang === "ru"
      ? 'Станьте игроком Vavada Casino <span class="text-[#ff424d]">за 1 минуту</span>'
      : 'Become a Vavada Casino player <span class="text-[#ff424d]">in 1 minute</span>';

  const descriptionFallback =
    lang === "ru"
      ? "Зарегистрируйтесь и получите 100% бонус до 100 000₽ + фриспины. Доступ ко всем зеркалам и приложениям без VPN."
      : "Register to get a 100% bonus up to €1000 + free spins. Gain access to all mirrors and apps without VPN.";

  return (
    <section
      className={`relative overflow-hidden p-8 ${heroSettings.bgColor || "bg-gradient-to-br from-[#1c1c2d] to-[#2a2a42]"}`}
      itemScope
      itemType="https://schema.org/Casino"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10 space-y-8">
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: t.title || titleFallback }}
                itemProp="name"
              />

              <p className="text-xl text-gray-300" itemProp="description">
                {t.description || descriptionFallback}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
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

            <div className="bg-[#1c1c2d]/60 border border-white/5 rounded-2xl p-5 space-y-4">
              {checklist.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff424d]" />
                  <div>
                    <p className="text-white text-sm font-semibold uppercase tracking-[0.3em]">
                      {item.title}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/go/${register}`}
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white ${cta.primary.bg} ${cta.primary.hoverBg} transition-all ${cta.primary.shadow} hover:shadow-[#ff424d]/50`}
              >
                {t.cta?.primary ||
                  (lang === "ru" ? "Перейти к регистрации" : "Go to registration")}
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
                  (lang === "ru" ? "Смотреть бонусы" : "See bonuses")}
              </Link>
            </div>
          </div>

          <div className="relative z-10">
            <div className="bg-[#111122]/70 border border-white/10 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  {lang === "ru" ? "аккаунт" : "account"}
                </p>
                <span className="text-xs text-white/60">
                  {lang === "ru" ? "защищено SSL" : "SSL secured"}
                </span>
              </div>
              <div className="bg-gradient-to-br from-[#ff424d]/10 to-[#2a2a42]/40 rounded-2xl p-6 text-center">
                <div className="text-5xl font-bold text-white mb-2">100%</div>
                <div className="text-2xl text-gray-300">
                  {lang === "ru"
                    ? "Бонус за регистрацию"
                    : "Registration bonus"}
                </div>
                <div className="text-[#ff424d] font-medium mt-2">
                  {lang === "ru" ? "До 100 000₽ + 100 FS" : "Up to €1000 + 100 FS"}
                </div>
              </div>
              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  {lang === "ru"
                    ? "После регистрации вы получите письмо с подтверждением. Нажмите на ссылку внутри, чтобы активировать бонус и открыть доступ ко всем зеркалам."
                    : "After signing up you’ll get a confirmation email. Click the link inside to activate the bonus and unlock full mirror access."}
                </p>
                <p className="text-xs text-white/50">
                  {lang === "ru"
                    ? "Регистрация доступна только игрокам 18+, подтверждая аккаунт вы соглашаетесь с правилами Vavada."
                    : "Registration is available only to players 18+. By confirming your account you accept Vavada terms."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute inset-0 ${heroSettings.gradient || "bg-gradient-to-r from-[#ff424d]/5 via-transparent to-[#2a2a42]/10"}`} />
    </section>
  );
};
