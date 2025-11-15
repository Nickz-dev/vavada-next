import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface ReviewItem {
  initial: string;
  name: string;
  date: string;
  stars: number;
  text: string;
  source?: string;
}

interface ReviewStats {
  label: string;
  value: string;
  hint?: string;
}

interface TrustBadge {
  label: string;
  value: string;
}

interface ReviewsStyles {
  section?: string;
  headBadge?: string;
  ratingCard?: string;
  statCard?: string;
  card?: string;
  name?: string;
  text?: string;
  meta?: string;
}

interface ReviewsSectionProps {
  templateData?: {
    reviews?: {
      rating?: number;
      totalReviews?: string;
      items?: ReviewItem[];
      stats?: ReviewStats[];
      badges?: TrustBadge[];
      styles?: ReviewsStyles;
    };
  };
  lang: string;
}

const fallbackReviews = (lang: string): ReviewItem[] =>
  lang === "ru"
    ? [
        {
          initial: "А",
          name: "Анна • Москва",
          date: "2 дня назад",
          stars: 5,
          source: "Telegram",
          text: "Регистрация через актуальное зеркало заняла меньше минуты. Деньги вывела на карту за 20 минут, поддержка отвечает моментально.",
        },
        {
          initial: "Д",
          name: "Дмитрий • Уфа",
          date: "неделю назад",
          stars: 5,
          source: "Trustpilot",
          text: "Большой выбор слотов и честный кэшбэк. Понравилось, что не требуют KYC до первого крупного вывода и приходят уведомления о зеркалах.",
        },
        {
          initial: "С",
          name: "Светлана • СПб",
          date: "10 дней назад",
          stars: 4,
          source: "App Store",
          text: "Приложение стабильно открывает рабочий домен. Хотелось бы больше промокодов, но бонусы обновляются каждую неделю.",
        },
      ]
    : [
        {
          initial: "A",
          name: "Alice • Warsaw",
          date: "2 days ago",
          stars: 5,
          source: "Telegram",
          text: "Signing up via the live mirror took seconds. Withdrawals hit my card within 20 minutes and support really is 24/7.",
        },
        {
          initial: "M",
          name: "Mark • Prague",
          date: "last week",
          stars: 5,
          source: "Trustpilot",
          text: "Huge slot catalogue and transparent cashback. Love that KYC is only required for large payouts and mirrors update automatically.",
        },
        {
          initial: "L",
          name: "Laura • Berlin",
          date: "10 days ago",
          stars: 4,
          source: "App Store",
          text: "The app instantly finds a working domain. Would enjoy more promo codes, but bonuses rotate every week anyway.",
        },
      ];

const fallbackStats = (lang: string): ReviewStats[] =>
  lang === "ru"
    ? [
        { label: "Отзывов за 30 дней", value: "428", hint: "Проверено вручную" },
        { label: "Средняя оценка", value: "4.9/5", hint: "на основе 8 500 отзывов" },
        { label: "Позитивных отзывов", value: "94%", hint: "про быстрые выплаты" },
      ]
    : [
        { label: "Reviews in 30 days", value: "428", hint: "Manually verified" },
        { label: "Average score", value: "4.9/5", hint: "based on 8,500 reviews" },
        { label: "Positive feedback", value: "94%", hint: "about fast payouts" },
      ];

const fallbackBadges = (lang: string): TrustBadge[] =>
  lang === "ru"
    ? [
        { label: "Trustpilot", value: "4.8" },
        { label: "App Store", value: "4.7" },
        { label: "Google Play", value: "4.6" },
      ]
    : [
        { label: "Trustpilot", value: "4.8" },
        { label: "App Store", value: "4.7" },
        { label: "Google Play", value: "4.6" },
      ];

const defaultStyles: Required<ReviewsStyles> = {
  section: "bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10",
  headBadge: "inline-flex items-center px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/60",
  ratingCard:
    "bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 flex flex-col gap-4 justify-between",
  statCard: "bg-[#1c1c2d] rounded-2xl border border-white/5 p-4",
  card: "bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-4",
  name: "text-base font-semibold text-white",
  text: "text-sm text-white/80",
  meta: "text-xs uppercase tracking-[0.2em] text-white/40",
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = lang === "ru" ? ru : en;
  const translations = (locale.reviews || {}) as Record<string, any>;

  const settings = templateData.reviews || {};
  const styles: ReviewsStyles = {
    ...defaultStyles,
    ...settings.styles,
  };

  const reviews: ReviewItem[] =
    settings.items || translations.items || fallbackReviews(lang);
  const stats: ReviewStats[] =
    settings.stats || translations.stats || fallbackStats(lang);
  const badges: TrustBadge[] =
    settings.badges || translations.badges || fallbackBadges(lang);

  const ratingValue =
    settings.rating ?? translations.rating ?? 4.9;
  const totalReviews =
    settings.totalReviews ||
    translations.totalReviews ||
    (lang === "ru" ? "8 500+ отзывов" : "8,500+ reviews");

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, idx) => (
      <span key={idx} className={idx < count ? "text-[#FFD54F]" : "text-white/20"}>
        ★
      </span>
    ));

  return (
    <section id="reviews" className={styles.section}>
      <div className="space-y-3 mb-8">
        <span className={styles.headBadge}>
          {lang === "ru" ? "мнение игроков" : "player trust"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.title ||
            (lang === "ru"
              ? "Отзывы о Vavada: выплаты, зеркала, поддержка"
              : "Vavada reviews: payouts, mirrors, support")}
        </h2>
        <p className="text-sm text-white/70 max-w-3xl">
          {translations.subtitle ||
            (lang === "ru"
              ? "Собрали живые комментарии игроков о регистрации через зеркало, приложении и скорости выплат на карты/крипту."
              : "Real player comments about registering via mirror, the mobile app, and how fast withdrawals land on cards or crypto.")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className={styles.ratingCard}>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">
              {lang === "ru" ? "средняя оценка" : "average rating"}
            </p>
            <div className="flex items-end gap-3 mt-3">
              <span className="text-4xl font-bold text-white">{ratingValue}</span>
              <span className="text-white/60 text-sm">{totalReviews}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">{renderStars(5)}</div>
          <p className="text-xs text-white/50">
            {lang === "ru"
              ? "Проверяем каждый отзыв вручную, чтобы исключить дубликаты."
              : "Each review is checked manually to remove duplicates."}
          </p>
        </div>

        <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div key={`${stat.label}-${idx}`} className={styles.statCard}>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-white mt-2">
                {stat.value}
              </p>
              {stat.hint && (
                <p className="text-xs text-white/50 mt-1">{stat.hint}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {badges.map((badge, idx) => (
          <div
            key={`${badge.label}-${idx}`}
            className="px-4 py-2 rounded-full border border-white/5 bg-[#1c1c2d]/80 text-sm text-white/80 flex items-center gap-2"
          >
            <span className="text-white font-semibold">{badge.label}</span>
            <span className="text-[#4CAF50] font-bold">{badge.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <article key={`${review.name}-${index}`} className={styles.card}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff424d] to-[#ff2c39] flex items-center justify-center text-white text-lg font-semibold">
                {review.initial}
              </div>
              <div>
                <p className={styles.name}>{review.name}</p>
                <p className={styles.meta}>
                  {review.date}
                  {review.source ? ` • ${review.source}` : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-1">{renderStars(review.stars)}</div>
            <p className={styles.text}>{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};