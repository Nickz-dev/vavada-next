import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

type Highlight = {
  title: string;
  text: string;
  tag?: string;
};

type Stat = {
  label: string;
  value: string;
};

interface WhyChooseUsProps {
  templateData?: {
    whyChooseUs?: {
      title?: string;
      subtitle?: string;
      paragraphs?: string[];
      advantages?: string[];
      highlights?: Highlight[];
      stats?: Stat[];
    };
  };
  lang: string;
}

const fallbackContent = (lang: string) =>
  lang === "ru"
    ? {
        title: "Почему выбирают Vavada",
        subtitle:
          "Лицензированное онлайн казино с сетью зеркал, моментальными выплатами и живой поддержкой. Одна учётка работает в браузере, приложении и мобильной версии.",
        paragraphs: [
          "Мы обновили весь контент и зеркала, чтобы вы получали чистые результаты поиска по запросам Vavada, «вход», «актуальное зеркало» и «промокоды».",
          "Каждое зеркало синхронизируется с основной БД — статистика, кэшбэк, статусы и турниры всегда под рукой.",
        ],
        advantages: [
          "5000+ слотов, лайв-шоу и crash-игры",
          "Комиссия 0% на депозиты и выводы",
          "Кэшбэк до 14% + еженедельные промокоды",
          "Антифрод-мониторинг и защита TLS 1.3",
          "Поддержка на русском и английском 24/7",
        ],
        highlights: [
          {
            title: "Без блокировок",
            text: "Зеркала обновляются несколько раз в день, доступ без VPN.",
            tag: "mirrors",
          },
          {
            title: "Деньги под контролем",
            text: "Visa/Mastercard, P2P и крипто с проверкой PCI DSS и multi–sig.",
            tag: "payments",
          },
          {
            title: "Честная игра",
            text: "RTP публикуется в кабинете, RNG проверяют GLI и iTechLabs.",
            tag: "fair play",
          },
        ],
        stats: [
          { label: "Лет на рынке", value: "10+" },
          { label: "Провайдеров", value: "60+" },
          { label: "Игроков онлайн", value: "25K+" },
        ],
      }
    : {
        title: "Why players stick with Vavada",
        subtitle:
          "Licensed casino with mirror network, instant payouts and multilingual support. One account works in browser, app and mobile site.",
        paragraphs: [
          "We rewrote every block so Google treats it as fresh Vavada content for queries like “login”, “mirror” and “promo codes”.",
          "Mirrors sync with the core database — cashback, tournaments and history stay intact on any domain.",
        ],
        advantages: [
          "5K+ slots, live dealers and crash games",
          "0% fee on deposits and withdrawals",
          "Cashback up to 14% + weekly promo codes",
          "TLS 1.3 encryption & 24/7 anti-fraud",
          "Support in RU/EN round the clock",
        ],
        highlights: [
          {
            title: "Mirror uptime",
            text: "Working URLs update multiple times per day so you never need a VPN.",
            tag: "mirrors",
          },
          {
            title: "Payment trust",
            text: "Cards, P2P and crypto with PCI DSS compliance and multi-sig storage.",
            tag: "payments",
          },
          {
            title: "Fair play",
            text: "RTP stats published inside the profile, RNG audited by GLI/iTechLabs.",
            tag: "fair play",
          },
        ],
        stats: [
          { label: "Years online", value: "10+" },
          { label: "Providers", value: "60+" },
          { label: "Players online", value: "25K+" },
        ],
      };

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = lang === "ru" ? ru : en;
  const translations = locale.whyChooseUs || {};
  const fallback = fallbackContent(lang);
  const customData = templateData.whyChooseUs || {};

  const title = translations.title || customData.title || fallback.title;
  const subtitle = customData.subtitle || fallback.subtitle;
  const paragraphs =
    translations.content?.paragraphs ||
    customData.paragraphs ||
    fallback.paragraphs;
  const advantages =
    translations.content?.advantages ||
    customData.advantages ||
    fallback.advantages;
  const highlights = customData.highlights || fallback.highlights;
  const stats = customData.stats || fallback.stats;

  return (
    <section className="bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10 space-y-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "о бренде" : "about vavada"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <p className="text-sm text-white/70 max-w-4xl">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1c1c2d] rounded-2xl border border-white/5 px-4 py-5 text-center"
          >
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
            <p className="text-xs text-white/60 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 text-sm text-white/80">
        {paragraphs?.map((paragraph, idx) => (
          <p key={`${paragraph}-${idx}`}>{paragraph}</p>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-5 space-y-2"
          >
            {item.tag && (
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                {item.tag}
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-white/70">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {lang === "ru" ? "Наши преимущества" : "Our advantages"}
        </h3>
        <ul className="grid gap-3 md:grid-cols-2 text-sm text-white/80">
          {advantages?.map((advantage, idx) => (
            <li key={`${advantage}-${idx}`} className="flex gap-2">
              <span className="text-[#4CAF50]">✓</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};