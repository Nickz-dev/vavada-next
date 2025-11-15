import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface WinnerItem {
  name: string;
  game: string;
  amount: string;
  time?: string;
}

interface StatItem {
  label: string;
  value: string;
  highlight?: boolean;
  trend?: string;
}

interface LiveWinnersData {
  bgColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  noteColor?: string;
  badgeColor?: string;
  winners?: {
    itemBg?: string;
    nameColor?: string;
    gameColor?: string;
    amountColor?: string;
    timeColor?: string;
  };
  stats?: {
    labelColor?: string;
    valueColor?: string;
    highlightColor?: string;
    trendColor?: string;
  };
  winnersList?: WinnerItem[];
  statsData?: StatItem[];
  subtitle?: string;
  badge?: string;
  note?: string;
}

interface LiveWinnersStatsProps {
  templateData?: {
    liveWinnersStats?: LiveWinnersData;
    [key: string]: unknown;
  };
  lang: string;
}

interface LiveWinnersTranslations {
  title?: string;
  subtitle?: string;
  note?: string;
  badge?: string;
  winnersTitle?: string;
  statsTitle?: string;
  winnersList?: Partial<WinnerItem>[];
  statsData?: Partial<StatItem>[];
}

const fallbackWinners: WinnerItem[] = [
  { name: "Alex***", game: "Sweet Bonanza", amount: "₽156 420", time: "1 мин назад" },
  { name: "Maria***", game: "Gates of Olympus", amount: "₽89 750", time: "3 мин назад" },
  { name: "John***", game: "Book of Dead", amount: "₽112 300", time: "5 мин назад" },
  { name: "Liu***", game: "Big Bass Bonanza", amount: "₽64 900", time: "8 мин назад" },
];

const fallbackStats: StatItem[] = [
  { label: "Игроков онлайн", value: "2 847", trend: "+6%" },
  { label: "Выплачено сегодня", value: "₽14 576 890", trend: "+12%" },
  { label: "Крупнейший выигрыш", value: "₽2 345 678", highlight: true },
];

export const LiveWinnersStats: React.FC<LiveWinnersStatsProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = lang === "ru" ? (ru as Record<string, unknown>) : (en as Record<string, unknown>);
  const translations = (locale.liveWinnersStats as LiveWinnersTranslations) || {};

  const defaultData: LiveWinnersData = {
    bgColor: "bg-[#101020]",
    titleColor: "text-white",
    subtitleColor: "text-white/70",
    noteColor: "text-white/50",
    badgeColor: "text-[#ff727f]",
    winners: {
      itemBg: "bg-[#1b1b30]",
      nameColor: "text-white",
      gameColor: "text-gray-400",
      amountColor: "text-[#4CAF50]",
      timeColor: "text-xs text-white/50",
    },
    stats: {
      labelColor: "text-gray-400",
      valueColor: "text-white",
      highlightColor: "text-[#ff424d]",
      trendColor: "text-[#4CAF50]",
    },
    winnersList: fallbackWinners,
    statsData: fallbackStats,
    subtitle:
      lang === "ru"
        ? "Мониторим реальные выигрыши Vavada и активность игроков в режиме онлайн."
        : "Tracking real Vavada wins and live player activity in real time.",
    badge: lang === "ru" ? "онлайн" : "live",
    note:
      lang === "ru"
        ? "Обновление данных каждые 30 секунд. Крупные выигрыши подтверждаются модераторами."
        : "Data refreshes every 30 seconds. Major wins are verified by moderators.",
  };

  const liveData = templateData.liveWinnersStats || {};
  const merged: LiveWinnersData = {
    ...defaultData,
    ...liveData,
    winners: { ...defaultData.winners, ...(liveData.winners || {}) },
    stats: { ...defaultData.stats, ...(liveData.stats || {}) },
    winnersList: liveData.winnersList || defaultData.winnersList,
    statsData: liveData.statsData || defaultData.statsData,
  };

  const winnersList = (merged.winnersList || []).map((winner, index) => {
    const translated = translations.winnersList?.[index] || {};
    return {
      ...winner,
      name: translated.name || winner.name,
      game: translated.game || winner.game,
      amount: translated.amount || winner.amount,
      time: translated.time || winner.time,
    };
  });

  const statsData = (merged.statsData || []).map((stat, index) => {
    const translated = translations.statsData?.[index] || {};
    return {
      ...stat,
      label: translated.label || stat.label,
      value: translated.value || stat.value,
      trend: translated.trend || stat.trend,
    };
  });

  return (
    <section className="rounded-3xl border border-white/5 bg-[#0b0b18] p-6 sm:p-10 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className={`text-xs uppercase tracking-[0.4em] ${merged.badgeColor}`}>
            {merged.badge}
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <h2 className={`text-3xl sm:text-4xl font-bold ${merged.titleColor}`}>
          {translations.title || (lang === "ru" ? "Живые выигрыши VAVADA" : "Live Vavada winners")}
        </h2>
        <p className={`text-sm ${merged.subtitleColor}`}>
          {translations.subtitle || merged.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {winnersList.map((winner, index) => (
            <div
              key={`${winner.name}-${index}`}
              className={`flex items-center justify-between p-4 rounded-2xl border border-white/5 ${merged.winners?.itemBg}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ff424d]/20 text-[#ff424d] flex items-center justify-center font-semibold">
                  {winner.name?.[0]}
                </div>
                <div>
                  <p className={`${merged.winners?.nameColor} text-base font-semibold`}>
                    {winner.name}
                  </p>
                  <p className={`${merged.winners?.gameColor} text-sm`}>{winner.game}</p>
                  {winner.time && (
                    <p className={merged.winners?.timeColor}>{winner.time}</p>
                  )}
                </div>
              </div>
              <p className={`text-lg font-semibold ${merged.winners?.amountColor}`}>
                {winner.amount}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#151526] rounded-2xl border border-white/5 p-5 space-y-4">
          {statsData.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className="border-b border-white/5 pb-4 last:border-none last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs uppercase tracking-[0.3em] ${merged.stats?.labelColor}`}>
                    {stat.label}
                  </p>
                  {stat.trend && (
                    <p className={`text-xs ${merged.stats?.trendColor}`}>
                      {stat.trend}
                    </p>
                  )}
                </div>
                <p
                  className={
                    stat.highlight
                      ? `${merged.stats?.highlightColor} text-2xl font-bold`
                      : `${merged.stats?.valueColor} text-2xl font-bold`
                  }
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className={`text-xs ${merged.noteColor}`}>
        {translations.note || merged.note}
      </p>
    </section>
  );
};

