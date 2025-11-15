export const DownloadSection = ({ translations, lang }: any) => {
  const isRu = lang === "ru";
  const t = translations.download || {};

  const downloadOptions =
    t.downloadOptions || {
      ios: {
        label: "App Store",
        description: isRu ? "Для iPhone и iPad" : "For iPhone and iPad",
        href: "#ios",
      },
      android: {
        label: "Google Play",
        description: isRu ? "Для Android устройств" : "For Android devices",
        href: "#android",
      },
      apk: isRu ? "Скачать APK напрямую" : "Download APK directly",
    };

  const checklist =
    t.quickChecklist ||
    (isRu
      ? [
          "Рабочий доступ к Vavada даже при блокировке сайта",
          "Push-уведомления о зеркалах, кэшбэке и промокодах",
          "Face ID / Touch ID и автологин без SMS",
        ]
      : [
          "Access Vavada even when the website is blocked",
          "Push alerts about mirrors, cashback and promo codes",
          "Face ID / Touch ID with auto-login",
        ]);

  return (
    <section id="download" className="bg-[#1f1f33] rounded-2xl p-6 md:p-10 mb-10">
      <div className="space-y-2 mb-6 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          {isRu ? "мобильное приложение" : "mobile app"}
        </p>
        <h2 className="text-3xl font-bold text-white">
          {t.sectionTitle || (isRu ? "Скачать приложение VAVADA" : "Download VAVADA App")}
        </h2>
        <p className="text-gray-300">
          {t.sectionDescription ||
            (isRu
              ? "Подключитесь к Vavada без VPN: приложение автоматически находит зеркало и держит вас в сети."
              : "Stay connected to Vavada without VPN: the app finds the mirror automatically and keeps you signed in.")}
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            {t.quickAccess || (isRu ? "Быстрый доступ" : "Quick Access")}
          </h3>
          <p className="text-gray-300">
            {t.qrDescription ||
              (isRu
                ? "Отсканируйте QR-код или откройте ссылку — мы определим вашу платформу и предложим нужную версию."
                : "Scan the QR or open the link—we detect your platform and offer the right build.")}
          </p>
          <ul className="space-y-3 text-sm text-gray-200">
            {checklist.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#ff424d]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-600 text-sm font-semibold">
                {isRu ? "QR для скачивания" : "Download QR"}
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              {isRu ? "Наведите камеру телефона" : "Point your phone camera"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href={downloadOptions.ios?.href || "#"}
            className="block bg-black/90 hover:bg-black text-white text-center py-3 px-6 rounded-xl transition-colors"
          >
            <span className="font-semibold text-lg">{downloadOptions.ios?.label}</span>
            <span className="block text-xs text-gray-400 mt-1">
              {downloadOptions.ios?.description}
            </span>
          </a>

          <a
            href={downloadOptions.android?.href || "#"}
            className="block bg-[#ff424d] hover:bg-[#ff2c39] text-white text-center py-3 px-6 rounded-xl transition-colors"
          >
            <span className="font-semibold text-lg">
              {downloadOptions.android?.label || "Google Play"}
            </span>
            <span className="block text-xs text-gray-200 mt-1">
              {downloadOptions.android?.description ||
                (isRu ? "Для Android устройств" : "For Android devices")}
            </span>
          </a>

          <a
            href={downloadOptions.apkLink || "#apk"}
            className="block border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white text-center py-3 px-6 rounded-xl transition-colors text-sm"
          >
            {downloadOptions.apk ||
              (isRu ? "Скачать APK напрямую" : "Download APK directly")}
          </a>
        </div>
      </div>
    </section>
  );
};