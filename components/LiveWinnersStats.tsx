import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface WinnerItem {
  name: string;
  game: string;
  amount: string;
}

interface StatItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface LiveWinnersData {
  bgColor?: string;
  titleColor?: string;
  winners?: {
    itemBg?: string;
    nameColor?: string;
    gameColor?: string;
    amountColor?: string;
  };
  stats?: {
    labelColor?: string;
    valueColor?: string;
    highlightColor?: string;
  };
  winnersList?: WinnerItem[];
  statsData?: StatItem[];
}

interface LiveWinnersStatsProps {
  templateData?: {
    liveWinnersStats?: LiveWinnersData;
    [key: string]: unknown; // Allow other properties
  };
  lang: string;
}

export const LiveWinnersStats: React.FC<LiveWinnersStatsProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.liveWinnersStats : en.liveWinnersStats;

  // Значения по умолчанию
  const defaultData = {
    bgColor: "bg-[#232338]",
    titleColor: "text-white",
    winners: {
      itemBg: "bg-[#2a2a42]",
      nameColor: "text-white",
      gameColor: "text-gray-400",
      amountColor: "text-[#4CAF50]",
    },
    stats: {
      labelColor: "text-gray-400",
      valueColor: "text-white",
      highlightColor: "text-[#ff424d]",
    },
    winnersList: [
      {
        name: "Alex***",
        game: "Sweet Bonanza",
        amount: "₽156,420",
      },
      {
        name: "Maria***",
        game: "Gates of Olympus",
        amount: "₽89,750",
      },
      {
        name: "John***",
        game: "Book of Dead",
        amount: "₽112,300",
      },
    ],
    statsData: [
      {
        label: "Игроков онлайн",
        value: "2,847",
        highlight: false,
      },
      {
        label: "Выплачено за сегодня",
        value: "₽14,576,890",
        highlight: false,
      },
      {
        label: "Джекпот",
        value: "₽2,345,678",
        highlight: true,
      },
    ],
  };

  // Безопасное извлечение данных
  const liveWinnersData = templateData?.liveWinnersStats || {};
  const data = {
    ...defaultData,
    ...liveWinnersData,
    winners: {
      ...defaultData.winners,
      ...(liveWinnersData.winners || {}),
    },
    stats: {
      ...defaultData.stats,
      ...(liveWinnersData.stats || {}),
    },
    winnersList: liveWinnersData.winnersList || defaultData.winnersList,
    statsData: liveWinnersData.statsData || defaultData.statsData,
  };

  // Объединение с переводами
  const winnersList = data.winnersList.map(
    (winner: WinnerItem, index: number) => {
      const translatedWinner = t?.winnersList?.[index] || {};
      return {
        ...winner,
        name: translatedWinner.name || winner.name,
        game: translatedWinner.game || winner.game,
        amount: translatedWinner.amount || winner.amount,
      };
    }
  );

  const statsData = data.statsData.map((stat: StatItem, index: number) => {
    const translatedStat = t?.statsData?.[index] || {};
    return {
      ...stat,
      label: translatedStat.label || stat.label,
      value: translatedStat.value || stat.value,
    };
  });

  return (
    <div className="bg-[#2A2A42] p-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Winners Block */}
          <div className={`${data.bgColor} p-6 col-span-2`}>
            <h2 className={`text-2xl font-bold ${data.titleColor} mb-4`}>
              {t?.winnersTitle || "Recent Winners"}
            </h2>
            <div className="space-y-4">
              {winnersList.map((winner: WinnerItem, index: number) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 ${data.winners.itemBg} rounded`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#ff424d]"></div>
                    <div>
                      <div className={data.winners.nameColor}>
                        {winner.name}
                      </div>
                      <div className={`text-sm ${data.winners.gameColor}`}>
                        {winner.game}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold ${data.winners.amountColor}`}>
                    {winner.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Block */}
          <div className={`${data.bgColor} p-6`}>
            <h2 className={`text-2xl font-bold ${data.titleColor}`}>
              {t?.statsTitle || "Statistics"}
            </h2>
            <div className="space-y-4">
              {statsData.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className={data.stats.labelColor}>{stat.label}</span>
                  <span
                    className={
                      stat.highlight
                        ? `${data.stats.highlightColor} font-bold`
                        : `${data.stats.valueColor} font-bold`
                    }
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
