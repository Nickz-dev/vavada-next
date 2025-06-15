import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface ReviewItem {
  initial: string;
  name: string;
  date: string;
  stars: number;
  text: string;
}

interface ReviewsSectionProps {
  templateData?: {
    reviews?: {
      bgColor?: string;
      titleColor?: string;
      ratingColor?: string;
      cardBg?: string;
      textColor?: string;
      metaColor?: string;
      rating?: number;
      items?: ReviewItem[];
    };
    [key: string]: unknown; // Allow additional properties
  };
  lang: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.reviews : en.reviews;

  // Default values
  const defaultData = {
    bgColor: "bg-[#232338]",
    titleColor: "text-white",
    ratingColor: "text-[#ff424d]",
    cardBg: "bg-[#2a2a42]",
    textColor: "text-gray-300",
    metaColor: "text-gray-400",
    rating: 4.9,
    items: [
      {
        initial: "М",
        name: "Максим",
        date: "2 дня назад",
        stars: 5,
        text: "Быстрые выплаты, отличная поддержка...",
      },
      {
        initial: "А",
        name: "Анна",
        date: "неделю назад",
        stars: 5,
        text: "Отличные бонусы и большой выбор игр...",
      },
      {
        initial: "В",
        name: "Владимир",
        date: "месяц назад",
        stars: 5,
        text: "Играю больше года, всё честно и прозрачно...",
      },
    ],
  };

  // Safely extract data
  const reviewsData = templateData?.reviews || {};
  const data = {
    ...defaultData,
    ...reviewsData,
    items: reviewsData.items || defaultData.items,
  };

  // Merge with translations
  const items = t?.items || data.items;

  // Function to render stars
  const renderStars = (count: number) => {
    return "★".repeat(count).padEnd(5, "☆");
  };

  return (
    <div className={`${data.bgColor} p-8`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold ${data.titleColor}`}>
            {t?.title || "Player Reviews"}
          </h2>
          <div className="flex items-center">
            <div className={`${data.ratingColor} text-2xl font-bold`}>
              {data.rating}
            </div>
            <div className={`flex ${data.ratingColor} ml-2`}>
              {renderStars(5)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((review, index) => (
            <div key={index} className={`${data.cardBg} rounded-xl p-6`}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#ff424d] flex items-center justify-center text-white font-bold">
                  {review.initial}
                </div>
                <div className="ml-3">
                  <div className={`${data.titleColor} font-medium`}>
                    {review.name}
                  </div>
                  <div className={`${data.metaColor} text-sm`}>
                    {review.date}
                  </div>
                </div>
              </div>
              <div className={`${data.ratingColor} mb-2`}>
                {renderStars(review.stars)}
              </div>
              <p className={data.textColor}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};