type HowToStep = {
  title: string;
  text: string;
};

const defaultSteps: Record<string, HowToStep[]> = {
  ru: [
    {
      title: "Выберите зеркало",
      text: "Скопируйте свежий домен из таблицы выше или включите push‑уведомления, чтобы получать рабочие URL автоматически.",
    },
    {
      title: "Войдите или зарегистрируйтесь",
      text: "Откройте зеркало в браузере/приложении Vavada, авторизуйтесь или создайте аккаунт. Сессия сохраняется при смене домена.",
    },
    {
      title: "Закрепите доступ",
      text: "Добавьте зеркало в закладки, подключите Telegram/почту для уведомлений и при необходимости скачайте приложение для офлайн-доступа.",
    },
  ],
  en: [
    {
      title: "Pick a mirror",
      text: "Copy the latest domain from the list above or enable push alerts to receive live URLs automatically.",
    },
    {
      title: "Log in or sign up",
      text: "Open the mirror in your browser/Vavada app, log in or create an account. Sessions persist even if the domain rotates.",
    },
    {
      title: "Secure access",
      text: "Bookmark the mirror, subscribe to Telegram/email alerts, and download the app for offline-ready access.",
    },
  ],
};

export const HowToUse = ({ translations, lang }: any) => {
  const steps: HowToStep[] =
    translations.mirrors?.howToSteps ||
    defaultSteps[lang as keyof typeof defaultSteps] ||
    [];

  return (
    <section
      id="how-to-use"
      className="bg-[#2a2a42] rounded-xl p-6 mb-8 border border-white/10"
    >
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "инструкция" : "guide"}
        </p>
        <h2 className="text-2xl font-bold text-white">
          {translations.mirrors?.howToTitle ||
            (lang === "ru"
              ? "Как использовать зеркало VAVADA"
              : "How to use the VAVADA mirror")}
        </h2>
        <p className="text-sm text-gray-300">
          {lang === "ru"
            ? "Следуйте трём шагам, чтобы не потерять доступ к казино даже при блокировках."
            : "Follow three steps to keep casino access even when domains get blocked."}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="bg-[#1c1c2d] p-6 rounded-lg border border-white/5 flex flex-col gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#ff424d] flex items-center justify-center text-white font-bold text-xl">
              {`0${index + 1}`}
            </div>
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
