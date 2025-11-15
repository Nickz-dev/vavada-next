import Link from "next/link";
import { useIds } from "@/contexts/IdContext";

export const HeroBonuses = ({ templateData, lang }: any) => {
  const { register } = useIds();

  const title =
    templateData?.bonuses?.hero?.title?.[lang] ||
    (lang === "ru" ? "Бонусы VAVADA" : "VAVADA Bonuses");

  const subtitle =
    templateData?.bonuses?.hero?.subtitle?.[lang] ||
    (lang === "ru"
      ? "Актуальные предложения: welcome-пакет, кэшбэк и промокоды для постоянных игроков."
      : "Current offers: welcome pack, cashback and promo codes for loyal players.");

  const highlight =
    templateData?.bonuses?.hero?.highlight?.[lang] ||
    (lang === "ru"
      ? "Обновляем условия бонусов ежедневно, пушим промокоды через приложение и показываем реальные лимиты."
      : "Bonus terms refresh daily, promo codes arrive via the app, and limits stay transparent.");

  return (
    <section className="relative bg-gradient-to-b from-[#1c1c2d] to-[#0d0d1a] py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-[#ff424d] opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-[#8a2be2] opacity-15 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#4e54c8] opacity-10 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            {lang === "ru" ? "премиальные акции" : "premium promos"}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            {highlight}
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href={`/${lang}/go/${register}`}
            className="group relative inline-flex items-center px-10 py-4 rounded-full font-semibold text-white overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-500"></span>
            <span className="relative z-10 flex items-center">
              <span className="mr-3">{lang === "ru" ? "Получить бонус" : "Get Bonus"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};