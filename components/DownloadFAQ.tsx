export const DownloadFAQ = ({ translations, lang }: any) => {
  const isRu = lang === "ru";
  const t = translations.download || {};

  const faqItems =
    t.faqItems ||
    [
      {
        question: isRu
          ? "Что даёт приложение по сравнению с мобильным сайтом?"
          : "Why use the app instead of the mobile site?",
        answer: isRu
          ? "Приложение держит активную сессию, присылает push о зеркалах и расходует меньше трафика. Браузер нужно обновлять вручную."
          : "The app keeps you signed in, pushes mirror alerts and uses less data. Mobile web relies on manual refresh.",
      },
      {
        question: isRu
          ? "Как установить APK, если Google Play недоступен?"
          : "How do I install the APK if Google Play is blocked?",
        answer: isRu
          ? "Скачайте APK по безопасной ссылке, разрешите установку из неизвестных источников и подтвердите подпись Vavada. Подробная инструкция в разделе «Установка Android»."
          : "Download the APK from our secure link, allow installs from unknown sources and verify the Vavada signature. Full guide is under “Android install”.",
      },
      {
        question: isRu
          ? "Можно ли обновлять зеркало через приложение?"
          : "Will the app update the mirror automatically?",
        answer: isRu
          ? "Да, при смене домена приложение само переключится и отправит уведомление. Вам не нужно искать новый адрес."
          : "Yes. When the domain changes, the app switches automatically and sends a notification—no need to search for a fresh link.",
      },
      {
        question: isRu
          ? "Насколько безопасны платежи через приложение?"
          : "Are payments safe inside the app?",
        answer: isRu
          ? "Все транзакции идут по TLS 1.3 и подтверждаются 3-D Secure. Карты и кошельки сохраняются в зашифрованном виде только на вашей стороне."
          : "Transactions run over TLS 1.3 with 3-D Secure confirmation. Cards and wallets stay encrypted locally on your device.",
      },
    ];

  return (
    <section id="faq" className="bg-[#1f1f33] rounded-2xl p-6 md:p-10">
      <div className="space-y-2 mb-6 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          {isRu ? "faq по приложению" : "app faq"}
        </p>
        <h2 className="text-3xl font-bold text-white">
          {t.faqTitle || (isRu ? "Частые вопросы" : "Frequently Asked Questions")}
        </h2>
        <p className="text-gray-300">
          {t.faqSubtitle ||
            (isRu
              ? "Если не нашли ответ — напишите в чат поддержки, мы вышлем ссылку на актуальную сборку."
              : "Didn't find the answer? Ping support and we'll send you the latest build link.")}
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((faq: any, idx: number) => (
          <div key={`${faq.question}-${idx}`} className="bg-[#2a2a42] rounded-xl">
            <details className="group">
              <summary className="list-none p-5 cursor-pointer flex justify-between items-center">
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <span className="text-[#ff9f68] transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="px-5 pb-5 text-gray-300">
                {faq.answer}
              </div>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
};