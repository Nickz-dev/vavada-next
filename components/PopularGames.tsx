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
  linkColor?: string;
  linkHoverColor?: string;
  gameCard?: {
    titleColor?: string;
    providerColor?: string;
    buttonBg?: string;
    buttonText?: string;
  };
  items?: GameItem[];
}

interface PopularGamesProps {
  templateData?: {
    popularGames?: PopularGamesData;
  };
  lang: string;
}

export const PopularGames: React.FC<PopularGamesProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.popularGames : en.popularGames;
  const { game } = useIds();

  const defaultGames = {
    bgColor: "bg-[#232338]",
    titleColor: "text-white",
    linkColor: "text-[#ff424d]",
    linkHoverColor: "hover:text-[#ff2c39]",
    gameCard: {
      titleColor: "text-white",
      providerColor: "text-gray-400",
      buttonBg: "bg-[#ff424d]",
      buttonText: "text-white",
    },
    items: [
      {
        name: "Sweet Bonanza",
        provider: "Pragmatic Play",
        image: "/images/games/sweet-bonanza.jpg",
        gradient: "from-pink-500 to-purple-600",
      },
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
        gradient: "from-pink-500 to-purple-600",
      },
      {
        name: "The Dog House",
        provider: "Pragmatic Play",
        image: "/images/games/the-dog-house.jpg",
        gradient: "from-pink-500 to-purple-600",
      },
      {
        name: "Fire in the Hole 3",
        provider: "Nolimit City",
        image: "/images/games/fire-in-the-hole-3.jpg",
        gradient: "from-pink-500 to-purple-600",
      },
    ],
  };

    // Безопасное извлечение данных
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

  // Объединение с переводами
  const items = popularGames.items.map((item, index) => {
    const translatedItem = t?.items?.[index] || {};
    return {
      ...item,
      name: translatedItem.name || item.name,
      provider: translatedItem.provider || item.provider,
    };
  });


   return (
    <div className={`${popularGames.bgColor} p-4 sm:p-8`}>
      {/* Остальная разметка без изменений */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className={`text-xl sm:text-3xl font-bold ${popularGames.titleColor}`}>
            {t?.title || "Popular Games"}
          </h2>
          <Link
            href={`/${lang}/slots`}
            className={`text-sm sm:text-base ${popularGames.linkColor} ${popularGames.linkHoverColor} transition-colors`}
          >
            {t?.viewAll || "View All →"}
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((gameItem, index) => (
            <div key={index} className="group relative">
              <div className="relative aspect-square rounded-lg overflow-hidden">
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
                    unoptimized={true}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />
                )}

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <Link href={`/${lang}/game/${game}`}>
                    <button
                      className={`opacity-0 group-hover:opacity-100 ${popularGames.gameCard.buttonBg} ${popularGames.gameCard.buttonText} px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm`}
                    >
                      {t?.playButton || "Play"}
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
    </div>
  );
};