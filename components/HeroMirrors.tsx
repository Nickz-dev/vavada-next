import Link from "next/link";
import { IdContext } from "@/contexts/IdContext";
import { useContext } from "react";

type Highlight = {
  title: string;
  text: string;
};

export const HeroMirrors = ({ templateData, lang }: any) => {
  const { mirror } = useContext(IdContext);
  const heroData = templateData?.mirrors?.hero;

  const title =
    heroData?.title?.[lang] ||
    (lang === "ru" ? "Актуальные зеркала VAVADA" : "Live VAVADA mirror access");

  const subtitle =
    heroData?.subtitle?.[lang] ||
    (lang === "ru"
      ? "Рабочие зеркала Vavada, вход без VPN и мгновенный доступ к аккаунту."
      : "Working Vavada mirrors, VPN-free login, and instant account access.");

  const lead =
    heroData?.lead?.[lang] ||
    (lang === "ru"
      ? "Мы обновляем домены каждые 3–5 минут, тестируем пропускную способность и сразу отправляем пуш о новом зеркале."
      : "We refresh domains every 3–5 minutes, test throughput, and instantly push notifications about the new mirror.");

  const highlightsSource = heroData?.highlights?.[lang];
  const highlights: Highlight[] = Array.isArray(highlightsSource)
    ? highlightsSource
    : lang === "ru"
      ? [
          { title: "Автосмена", text: "Сервис сам подменяет зеркало в момент блокировки." },
          { title: "Мониторинг 24/7", text: "Команда и боты следят за доступностью из разных регионов." },
          { title: "Без VPN", text: "Зеркала адаптированы под мобильных операторов и Wi‑Fi." }
        ]
      : [
          { title: "Auto switch", text: "Service swaps the mirror as soon as a block appears." },
          { title: "24/7 monitoring", text: "Team and bots track availability across regions." },
          { title: "VPN-free", text: "Mirrors are tuned for mobile carriers and Wi-Fi." }
        ];

  const checklistSource = heroData?.checklist?.[lang];
  const checklist: string[] = Array.isArray(checklistSource)
    ? checklistSource
    : lang === "ru"
      ? ["Ссылки для ПК и мобилы", "Проверка SSL и скорости", "Push о промокодах"]
      : ["Desktop & mobile links", "SSL and speed verified", "Promo push alerts"];

  const stepsSource = heroData?.steps?.[lang];
  const steps: string[] = Array.isArray(stepsSource)
    ? stepsSource
    : lang === "ru"
      ? ["Откройте зеркало и авторизуйтесь", "Добавьте его в закладки и включите уведомления", "При блокировке повторите шаг — пришлём новый домен"]
      : ["Open the mirror and log in", "Bookmark it and enable notifications", "If blocked, repeat the step — we'll send a new domain"];

  return (
    <section className="relative bg-gradient-to-b from-[#1c1c2d] to-[#0d0d1a] py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-[#ff424d] opacity-30 blur-xl" />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-[#8a2be2] opacity-20 blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#4e54c8] opacity-15 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              {lang === "ru" ? "актуальные ссылки" : "live links"}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{title}</h1>
            <p className="text-lg md:text-xl text-gray-300">{subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-white/80">
            {checklist.map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-sm max-w-3xl mx-auto">{lead}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/go/${mirror}`}
              className="group relative inline-flex items-center px-10 py-4 rounded-2xl font-semibold text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-all duration-500" />
              <span className="relative z-10 flex items-center gap-2 text-lg">
                {lang === "ru" ? "Перейти на зеркало" : "Go to mirror"}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
            <Link
              href={`/${lang}/go/${mirror}?mode=test`}
              className="inline-flex items-center px-10 py-4 rounded-2xl border border-white/20 text-white/80 hover:text-white transition-colors"
            >
              {lang === "ru" ? "Проверить скорость" : "Test speed"}
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {highlights.map((highlight, idx) => (
            <div
              key={`${highlight.title}-${idx}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-2 backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-[#ff727f]">{`0${idx + 1}`}</p>
              <h3 className="text-white text-xl font-semibold">{highlight.title}</h3>
              <p className="text-gray-300 text-sm">{highlight.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-md">
          <p className="text-white text-lg font-semibold">
            {lang === "ru" ? "Как закрепить рабочее зеркало" : "How to lock the working mirror"}
          </p>
          <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-200">
            {steps.map((step, idx) => (
              <div key={`${step}-${idx}`} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">{`0${idx + 1}`}</p>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60">
            {lang === "ru"
              ? "Если домен внезапно недоступен — обновите страницу или включите пуш-уведомления, мы мгновенно пришлём новое зеркало."
              : "If the domain suddenly fails, refresh the page or enable push alerts — we’ll instantly send a new mirror."}
          </p>
        </div>
      </div>
    </section>
  );
};

