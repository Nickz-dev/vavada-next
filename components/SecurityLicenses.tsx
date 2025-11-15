import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface BadgeItem {
  text: string;
  dotColor?: string;
}

interface SectionItem {
  title: string;
  content: string;
  badges?: BadgeItem[];
  bullets?: string[];
  certificate?: string;
}

interface StatItem {
  label: string;
  value: string;
  hint?: string;
}

interface SecurityLicensesProps {
  templateData?: {
    securityLicenses?: {
      sections?: SectionItem[];
      stats?: StatItem[];
      badges?: BadgeItem[];
      styles?: Partial<typeof defaultStyles>;
    };
  };
  lang: string;
}

const defaultSections = (lang: string): SectionItem[] =>
  lang === "ru"
    ? [
        {
          title: "Лицензия Curacao eGaming",
          content:
            "Vavada ведёт деятельность по лицензии Curacao eGaming №8048/JAZ2014-006. Все игровые провайдеры работают с проверенными RNG и проходят ежегодный аудит.",
          badges: [
            { text: "Curacao eGaming" },
            { text: "RNG Certified" },
            { text: "eCOGRA" },
          ],
          bullets: [
            "Контроль регулятора 24/7",
            "Ежегодное подтверждение статуса",
            "Публичный номер лицензии в footer",
          ],
          certificate: "№8048/JAZ2014-006",
        },
        {
          title: "Шифрование и защита платежей",
          content:
            "Персональные данные и транзакции пользователей защищены TLS 1.3 + 256-bit SSL. Касса соответствует PCI DSS, а карты проходят через Visa Secure и Mastercard SRC.",
          badges: [
            { text: "TLS 1.3" },
            { text: "PCI DSS" },
            { text: "Visa Secure" },
            { text: "Mastercard SecureCode" },
          ],
          bullets: [
            "Аппаратный HSM для ключей",
            "Мониторинг антифрода 24/7",
            "Двухфакторная авторизация в кассе",
          ],
        },
      ]
    : [
        {
          title: "Curacao eGaming License",
          content:
            "Vavada operates under Curacao eGaming license №8048/JAZ2014-006. Game providers rely on certified RNGs and pass yearly audits.",
          badges: [
            { text: "Curacao eGaming" },
            { text: "RNG Certified" },
            { text: "eCOGRA" },
          ],
          bullets: [
            "24/7 regulator oversight",
            "License status renewed annually",
            "Public license number in the footer",
          ],
          certificate: "№8048/JAZ2014-006",
        },
        {
          title: "Encryption & Secure Payments",
          content:
            "Player data and payments are protected with TLS 1.3 + 256-bit SSL. The cashier is PCI DSS compliant and uses Visa Secure / Mastercard SRC flows.",
          badges: [
            { text: "TLS 1.3" },
            { text: "PCI DSS" },
            { text: "Visa Secure" },
            { text: "Mastercard SecureCode" },
          ],
          bullets: [
            "Hardware HSM key storage",
            "24/7 anti-fraud monitoring",
            "Two-factor auth inside cashier",
          ],
        },
      ];

const defaultStats = (lang: string): StatItem[] =>
  lang === "ru"
    ? [
        { label: "Лет на рынке", value: "10+", hint: "Работаем с 2015 года" },
        { label: "Провайдеров", value: "60+", hint: "Все — сертифицированы" },
        { label: "Команда Anti-Fraud", value: "24/7", hint: "Ответ менее 2 мин" },
      ]
    : [
        { label: "Years online", value: "10+", hint: "Operating since 2015" },
        { label: "Providers", value: "60+", hint: "All certified" },
        { label: "Anti-fraud team", value: "24/7", hint: "Under 2 min response" },
      ];

const defaultBadges = (lang: string): BadgeItem[] =>
  lang === "ru"
    ? [
        { text: "Responsible Gaming" },
        { text: "18+ Only" },
        { text: "Fair Play" },
      ]
    : [
        { text: "Responsible Gaming" },
        { text: "18+ Only" },
        { text: "Fair Play" },
      ];

const defaultStyles = {
  section:
    "bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10 space-y-8",
  badge: "inline-flex items-center text-xs uppercase tracking-[0.4em] text-white/60",
  card: "bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-4",
  statCard: "bg-[#1c1c2d] rounded-2xl border border-white/5 p-4",
  bullet:
    "flex items-start gap-3 text-sm text-white/80 border border-white/5 rounded-xl px-3 py-2",
};

export const SecurityLicenses: React.FC<SecurityLicensesProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = lang === "ru" ? ru : en;
  const translations = (locale.securityLicenses || {}) as Record<string, any>;

  const settings = templateData.securityLicenses || {};
  const styles = { ...defaultStyles, ...(settings.styles || {}) };

  const sections: SectionItem[] =
    settings.sections || translations.sections || defaultSections(lang);
  const stats: StatItem[] =
    settings.stats || translations.stats || defaultStats(lang);
  const badges: BadgeItem[] =
    settings.badges || translations.badges || defaultBadges(lang);

  return (
    <section id="security" className={styles.section}>
      <div className="space-y-3">
        <span className={styles.badge}>
          {lang === "ru" ? "лицензии и безопасность" : "licenses & security"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.title ||
            (lang === "ru"
              ? "Лицензии, протоколы шифрования и контроль Fair Play"
              : "Licenses, encryption protocols and fair play control")}
        </h2>
        <p className="text-sm text-white/70 max-w-3xl">
          {translations.subtitle ||
            (lang === "ru"
              ? "Подтверждаем юридическую легальность Vavada и рассказываем, как мы защищаем ваши данные, депозиты и игровой прогресс."
              : "Proof of Vavada legal status plus the tools we use to protect your data, deposits, and gameplay.")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, idx) => (
          <div key={`${stat.label}-${idx}`} className={styles.statCard}>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold text-white mt-2">{stat.value}</p>
            {stat.hint && (
              <p className="text-xs text-white/50 mt-1">{stat.hint}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {badges.map((badge, idx) => (
          <span
            key={`${badge.text}-${idx}`}
            className="px-4 py-2 rounded-full border border-white/10 bg-[#1c1c2d]/80 text-sm text-white/70"
          >
            {badge.text}
          </span>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, idx) => (
          <article key={`${section.title}-${idx}`} className={styles.card}>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {section.certificate
                  ? section.certificate
                  : lang === "ru"
                    ? "официальный документ"
                    : "official document"}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {section.title}
              </h3>
              <p className="text-sm text-white/70">{section.content}</p>
            </div>
            {section.badges && (
              <div className="flex flex-wrap gap-2">
                {section.badges.map((badge, badgeIdx) => (
                  <span
                    key={`${badge.text}-${badgeIdx}`}
                    className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/70"
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            )}
            {section.bullets && (
              <div className="space-y-2">
                {section.bullets.map((bullet, bulletIdx) => (
                  <div key={`${bullet}-${bulletIdx}`} className={styles.bullet}>
                    <span className="text-[#4CAF50] text-lg leading-none">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};