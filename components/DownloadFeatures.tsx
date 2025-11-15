export const DownloadFeatures = ({ translations, lang }: any) => {
  const isRu = lang === "ru";
  const t = translations.download || {};

  const defaultFeatures = [
    {
      icon: "🚀",
      title: isRu ? "Мгновенный запуск" : "Instant launch",
      description: isRu
        ? "Слоты и лайв-игры открываются быстрее, чем в браузере, даже на 3G."
        : "Slots and live games open faster than in the browser, even on 3G.",
    },
    {
      icon: "🔒",
      title: isRu ? "Безопасный вход" : "Secure access",
      description: isRu
        ? "Face ID / Touch ID, автологин без SMS и постоянное зеркало."
        : "Face ID / Touch ID, auto login without SMS and always-on mirrors.",
    },
    {
      icon: "📲",
      title: isRu ? "Зеркало в кармане" : "Mirror in your pocket",
      description: isRu
        ? "Приложение само находит рабочий домен и присылает push, когда он меняется."
        : "The app finds a working domain and pushes alerts whenever it changes.",
    },
    {
      icon: "🎯",
      title: isRu ? "Эксклюзивные бонусы" : "Exclusive promos",
      description: isRu
        ? "Мобильные турниры, кэшдропы и промокоды, которых нет на сайте."
        : "Mobile-only tournaments, cash drops and promo codes you won't see on the site.",
    },
    {
      icon: "📡",
      title: isRu ? "Push-овещения" : "Push alerts",
      description: isRu
        ? "Следите за кэшбэком, турнирами и VIP-акциями без телеграм-ботов."
        : "Track cashback, tournaments and VIP promos without relying on bots.",
    },
    {
      icon: "⚡",
      title: isRu ? "Экономия трафика" : "Traffic saver",
      description: isRu
        ? "Сжатые ассеты, офлайн-кеш популярных слотов и меньше расход батареи."
        : "Compressed assets, offline cache for favorites and reduced battery drain.",
    },
  ];

  const features = t.features || defaultFeatures;

  return (
    <section id="features" className="bg-[#1f1f33] rounded-2xl p-6 md:p-10 mb-10">
      <div className="space-y-2 mb-8 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {isRu ? "преимущества приложения" : "app advantages"}
        </p>
        <h2 className="text-3xl font-bold text-white">
          {t.featuresTitle ||
            (isRu ? "Почему стоит скачать приложение?" : "Why download the app?")}
        </h2>
        <p className="text-gray-300">
          {t.featuresSubtitle ||
            (isRu
              ? "Мобильная версия Vavada держит вас в игре, даже если сайт заблокирован."
              : "The Vavada mobile app keeps you in the game even when the site is blocked.")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature: any, idx: number) => (
          <div
            key={`${feature.title}-${idx}`}
            className="bg-[#2a2a42] rounded-2xl p-6 border border-white/5"
          >
            <div className="text-[#ff9f68] text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};