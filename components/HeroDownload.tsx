import Link from "next/link";
import { IdContext } from "@/contexts/IdContext";
import { useContext } from "react";

type Benefit = {
  title: string;
  text: string;
};

export const HeroDownload = ({ templateData, lang }: any) => {
  const { download } = useContext(IdContext);

  const title =
    templateData?.download?.hero?.title?.[lang] ||
    (lang === "ru" ? "Скачайте приложение VAVADA" : "Download the VAVADA app");

  const subtitle =
    templateData?.download?.hero?.subtitle?.[lang] ||
    (lang === "ru"
      ? "Приложение само подбирает актуальное зеркало, держит аккаунт онлайн и присылает push-уведомления о бонусах."
      : "The app auto-selects a fresh mirror, keeps you online, and sends push alerts about bonuses.");

  const chipsFallback =
    lang === "ru"
      ? ["Официальный APK и App Store", "Вход без VPN", "Push о зеркалах и промокодах"]
      : ["Official APK & App Store", "VPN-free login", "Mirror & promo push alerts"];
  const chipsSource = templateData?.download?.hero?.checklist?.[lang];
  const chips: string[] = Array.isArray(chipsSource) ? chipsSource : chipsFallback;

  const benefitsFallback: Benefit[] =
    lang === "ru"
      ? [
          {
            title: "Автозеркала",
            text: "Клиент обновляет домены каждые несколько минут и подменяет зеркало без вашего участия."
          },
          {
            title: "Защищённый вход",
            text: "Токены авторизации шифруются, поэтому баланс и документы остаются в безопасности."
          },
          {
            title: "Push о кэшбэке",
            text: "Получайте уведомления о рейкбеке, турнирах и промокодах первыми."
          }
        ]
      : [
          {
            title: "Auto mirrors",
            text: "The client refreshes domains every few minutes and swaps mirrors automatically."
          },
          {
            title: "Secure login",
            text: "Encrypted tokens keep your balance and ID documents safe inside the app."
          },
          {
            title: "Cashback alerts",
            text: "Be the first to get push notifications about rakeback, tournaments, and promo codes."
          }
        ];
  const benefitsSource = templateData?.download?.hero?.benefits?.[lang];
  const benefits: Benefit[] = Array.isArray(benefitsSource) ? benefitsSource : benefitsFallback;

  const lead =
    templateData?.download?.hero?.lead?.[lang] ||
    (lang === "ru"
      ? "Установите официальное приложение Vavada, чтобы мгновенно попадать на рабочее зеркало, запускать турниры без VPN и держать кэшбэк под контролем."
      : "Install the official Vavada app to hop onto a live mirror instantly, join tournaments without VPN, and keep cashback under control.");

  return (
    <section className="relative bg-gradient-to-b from-[#1c1c2d] to-[#0d0d1a] py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-[#ff424d] opacity-20 blur-xl" />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-[#8a2be2] opacity-15 blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#4e54c8] opacity-10 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              {lang === "ru" ? "мобильный доступ" : "mobile access"}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{title}</h1>
            <p className="text-lg md:text-xl text-gray-300">{subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-white/80">
            {chips.map((chip, idx) => (
              <span
                key={`${chip}-${idx}`}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="text-gray-400 text-sm max-w-3xl mx-auto">{lead}</div>

          <div className="flex justify-center">
            <Link
              href={`/${lang}/go/${download}`}
              className="group relative inline-flex items-center px-10 py-4 rounded-2xl font-semibold text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#4e54c8] to-[#8a2be2] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#4e54c8] to-[#8a2be2] rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-all duration-500" />
              <span className="relative z-10 flex flex-col leading-tight">
                <span className="text-xl">
                  {lang === "ru" ? "Скачать приложение" : "Download the app"}
                </span>
                <span className="text-xs opacity-80">
                  {lang === "ru" ? "iOS, Android, APK" : "iOS, Android, APK"}
                </span>
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-center md:justify-center">
          <div className="flex flex-col gap-4 text-left text-sm text-gray-300 max-w-sm">
            {benefits.map((benefit, idx) => (
              <div key={`${benefit.title}-${idx}`}>
                <p className="text-white font-semibold">{benefit.title}</p>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="relative w-full max-w-md">
            <div className="bg-gray-800 border-4 border-gray-900 rounded-[40px] p-2 mx-auto w-[280px] h-[560px] shadow-2xl">
              <div className="bg-[#2a2a42] rounded-[32px] w-full h-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#4e54c8] to-[#8a2be2] flex flex-col items-center justify-center p-6 text-white space-y-5">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center">
                    <span className="text-[#ff424d] text-lg font-bold">V</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-wide">VAVADA</h3>
                  <p className="text-white/80 text-center text-sm max-w-[180px]">
                    {lang === "ru"
                      ? "Играй без ограничений: рабочие зеркала, турниры и кэшбэк всегда под рукой."
                      : "Play without limits: live mirrors, tournaments, and cashback in your pocket."}
                  </p>
                  <div className="w-full max-w-[160px] h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">
                      {lang === "ru" ? "Загрузка…" : "Loading…"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[320px] h-32 bg-gradient-to-t from-[#1c1c2d] to-transparent opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};

