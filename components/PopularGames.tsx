import React from "react";
import Image from "next/image";
import Link from "next/link";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import { useIds } from "@/contexts/IdContext";

interface GameItem {
  name: string;
  provider: string;
  image: string;
  gradient?: string;
}

interface PopularGamesData {
  bgColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  linkColor?: string;
  linkHoverColor?: string;
  gameCard?: {
    titleColor?: string;
    providerColor?: string;
    buttonBg?: string;
    buttonText?: string;
  };
  items?: GameItem[];
  subtitle?: string;
}

interface PopularGamesProps {
  templateData?: {
    popularGames?: PopularGamesData;
  };
  lang: string;
}

const fallbackItems = (lang: string): GameItem[] =>
  lang === "ru"
    ? [
        {
          name: "Sweet Bonanza",
          provider: "Pragmatic Play",
          image: "/images/games/sweet-bonanza.jpg",
          gradient: "from-pink-500 to-purple-600",
        },
        {
          name: "Gates of Olympus",
          provider: "Pragmatic Play",
          image: "/images/games/gates-of-olympus.jpg",
          gradient: "from-blue-500 to-indigo-600",
        },
        {
          name: "Big Bass Splash",
          provider: "Pragmatic Play",
          image: "/images/games/big-bass-splash.jpg",
          gradient: "from-green-500 to-teal-600",
        },
        {
          name: "Ice Princess",
          provider: "Belatra",
          image: "/images/games/ice-princess.jpg",
          gradient: "from-violet-500 to-purple-600",
        },
        {
          name: "The Dog House",
          provider: "Pragmatic Play",
          image: "/images/games/the-dog-house.jpg",
          gradient: "from-amber-500 to-orange-600",
        },
        {
          name: "Fire in the Hole 3",
          provider: "Nolimit City",
          image: "/images/games/fire-in-the-hole-3.jpg",
          gradient: "from-gray-600 to-yellow-600",
        },
      ]
    : [
        {
          name: "Sweet Bonanza",
          provider: "Pragmatic Play",
          image: "/images/games/sweet-bonanza.jpg",
          gradient: "from-pink-500 to-purple-600",
        },
        {
          name: "Gates of Olympus",
          provider: "Pragmatic Play",
          image: "/images/games/gates-of-olympus.jpg",
          gradient: "from-blue-500 to-indigo-600",
        },
        {
          name: "Big Bass Splash",
          provider: "Pragmatic Play",
          image: "/images/games/big-bass-splash.jpg",
          gradient: "from-green-500 to-teal-600",
        },
        {
          name: "Ice Princess",
          provider: "Belatra",
          image: "/images/games/ice-princess.jpg",
          gradient: "from-violet-500 to-purple-600",
        },
        {
          name: "The Dog House",
          provider: "Pragmatic Play",
          image: "/images/games/the-dog-house.jpg",
          gradient: "from-amber-500 to-orange-600",
        },
        {
          name: "Fire in the Hole 3",
          provider: "Nolimit City",
          image: "/images/games/fire-in-the-hole-3.jpg",
          gradient: "from-gray-600 to-yellow-600",
        },
      ];

export const PopularGames: React.FC<PopularGamesProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = lang === "ru" ? (ru as Record<string, unknown>) : (en as Record<string, unknown>);
  const t = (locale.popularGames as Record<string, unknown>) || {};
  const { game } = useIds();

  const defaultGames = {
    bgColor: "bg-[#0f0f1e]",
    titleColor: "text-white",
    subtitleColor: "text-white/70",
    linkColor: "text-[#ff424d]",
    linkHoverColor: "hover:text-[#ff2c39]",
    gameCard: {
      titleColor: "text-white",
      providerColor: "text-gray-400",
      buttonBg: "bg-[#ff424d]",
      buttonText: "text-white",
    },
    items: fallbackItems(lang),
    subtitle:
      lang === "ru"
        ? "Топ-игры Vavada: лицензионные слоты и live-шоу с моментальными выплатами."
        : "Top Vavada picks: licensed slots and live shows with instant payouts.",
  };

  const popularGamesData = templateData?.popularGames || {};
  const popularGames = {
    ...defaultGames,
    ...popularGamesData,
    gameCard: {
      ...defaultGames.gameCard,
      ...(popularGamesData.gameCard || {}),
    },
    items: popularGamesData.items || defaultGames.items,
  };

  const items = popularGames.items.map((item, index) => {
    const translatedItem = (t?.items as Array<Record<string, string>>)?.[index] || {};
    return {
      ...item,
      name: translatedItem.name || item.name,
      provider: translatedItem.provider || item.provider,
    };
  });

  return (
    <section className={`${popularGames.bgColor} rounded-3xl border border-white/5 p-4 sm:p-8`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              {lang === "ru" ? "выбор игроков" : "players choice"}
            </p>
            <h2 className={`text-2xl sm:text-3xl font-bold ${popularGames.titleColor}`}>
              {(t?.title as string) || "Popular Games"}
            </h2>
            <p className={`text-sm ${popularGames.subtitleColor}`}>
              {(t?.subtitle as string) || popularGames.subtitle}
            </p>
          </div>
          <Link
            href={`/${lang}/slots`}
            className={`text-sm sm:text-base ${popularGames.linkColor} ${popularGames.linkHoverColor} transition-colors`}
          >
            {(t?.viewAll as string) || "View All →"}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((gameItem, index) => (
            <div key={gameItem.name + index} className="group relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    gameItem.gradient || "from-gray-600 to-gray-800"
                  }`}
                />

                {gameItem.image && (
                  <Image
                    src={gameItem.image}
                    alt={gameItem.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />
                )}

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <Link href={`/${lang}/game/${game}`}>
                    <button
                      className={`opacity-0 group-hover:opacity-100 ${popularGames.gameCard.buttonBg} ${popularGames.gameCard.buttonText} px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm`}
                    >
                      {(t?.playButton as string) || "Play"}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="mt-2">
                <h3 className={`font-medium text-sm sm:text-base ${popularGames.gameCard.titleColor}`}>
                  {gameItem.name}
                </h3>
                <p className={`text-xs sm:text-sm ${popularGames.gameCard.providerColor}`}>
                  {gameItem.provider}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};