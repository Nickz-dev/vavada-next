type GuideSteps = {
  title: string;
  steps: string[];
};

const defaultIOS: Record<string, GuideSteps> = {
  ru: {
    title: "Для iOS",
    steps: [
      "Откройте TestFlight или корпоративную ссылку Vavada на рабочем зеркале.",
      "Нажмите «Установить», подтвердите доверие к профилю Vavada в Настройках → Основные → Профили.",
      "Дождитесь загрузки, включите уведомления — приложение само найдёт актуальное зеркало.",
    ],
  },
  en: {
    title: "For iOS",
    steps: [
      "Open TestFlight or the Vavada enterprise link on the live mirror.",
      "Tap “Install”, then trust the Vavada profile in Settings → General → Profiles.",
      "Let the app finish downloading and enable notifications—mirrors update automatically.",
    ],
  },
};

const defaultAndroid: Record<string, GuideSteps> = {
  ru: {
    title: "Для Android",
    steps: [
      "Скачайте APK по кнопке «Download» — проверяйте, что файл подписан Vavada.",
      "Разрешите установку из неизвестных источников и запустите APK.",
      "После установки включите автообновления зеркал и push-уведомления.",
    ],
  },
  en: {
    title: "For Android",
    steps: [
      "Download the APK via the “Download” button — make sure it’s signed by Vavada.",
      "Allow installation from unknown sources and run the APK.",
      "Once installed, enable auto mirror updates and push notifications.",
    ],
  },
};

const defaultAltMethods: Record<string, string[]> = {
  ru: [
    "Используйте мобильную версию сайта и добавьте ярлык на главный экран.",
    "Воспользуйтесь десктопным клиентом (.exe/.dmg) с автообновлением зеркал.",
    "Подключите Telegram-бота Vavada, чтобы получать ссылку одного касанием.",
  ],
  en: [
    "Use the mobile website and add it to the home screen.",
    "Install the desktop client (.exe/.dmg) with auto mirror rotation.",
    "Subscribe to the Vavada Telegram bot for one-tap mirror links.",
  ],
};

export const InstallationGuide = ({ translations, lang }: any) => {
  const iosGuide: GuideSteps =
    translations.download?.iosGuide ||
    defaultIOS[lang as keyof typeof defaultIOS];
  const androidGuide: GuideSteps =
    translations.download?.androidGuide ||
    defaultAndroid[lang as keyof typeof defaultAndroid];
  const altMethods: string[] =
    translations.download?.altMethods ||
    defaultAltMethods[lang as keyof typeof defaultAltMethods];

  return (
    <section
      id="installation"
      className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-10 border border-white/10"
    >
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "установка" : "setup"}
        </p>
        <h2 className="text-2xl font-bold text-white">
          {translations.download?.installationTitle ||
            (lang === "ru" ? "Как установить приложение" : "How to install the app")}
        </h2>
        <p className="text-sm text-gray-300">
          {lang === "ru"
            ? "Выберите платформу и следуйте подсказкам — зеркала и обновления подтягиваются автоматически."
            : "Pick your platform and follow the hints—mirrors and updates sync automatically."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[iosGuide, androidGuide].map((guide) => (
          <div key={guide.title} className="bg-[#1c1c2d] rounded-lg p-6 border border-white/5">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-[#ff424d]" />
              {guide.title}
            </h3>
            <ol className="space-y-3 text-gray-300 pl-5 list-decimal">
              {guide.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-[#1c1c2d] rounded-lg p-6 border border-white/5">
        <h3 className="text-xl font-semibold text-white mb-4">
          {translations.download?.altMethodsTitle ||
            (lang === "ru" ? "Альтернативные способы" : "Alternative methods")}
        </h3>
        <p className="text-gray-300 mb-4">
          {translations.download?.altMethodsDescription ||
            (lang === "ru"
              ? "Если установить приложение не удаётся, воспользуйтесь одним из способов ниже:"
              : "If the app can’t be installed, try one of the options below:")}
        </p>
        <ul className="space-y-3 text-gray-300 pl-5 list-disc">
          {altMethods.map((method, idx) => (
            <li key={idx}>{method}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};