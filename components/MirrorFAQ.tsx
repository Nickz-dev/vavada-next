const fallbackFaq = (lang: string) =>
  lang === "ru"
    ? [
        {
          question: "Что такое зеркало сайта?",
          answer:
            "Это копия основного сайта Vavada с другим адресом для обхода блокировок и сохранения доступа.",
        },
        {
          question: "Нужна ли повторная регистрация?",
          answer: "Нет. Вы используете те же учетные данные, баланс и бонусы.",
        },
        {
          question: "Как часто обновляются ссылки?",
          answer: "Мы проверяем зеркала каждые 3–5 минут и автоматически заменяем домен при блокировке.",
        },
      ]
    : [
        {
          question: "What is a site mirror?",
          answer:
            "A copy of the main Vavada site with a different URL to bypass restrictions and keep access.",
        },
        {
          question: "Do I need to register again?",
          answer: "No. You use the same login, balance, and bonuses.",
        },
        {
          question: "How often are links updated?",
          answer: "We verify mirrors every 3–5 minutes and rotate domains automatically if blocked.",
        },
      ];

export const MirrorFAQ = ({ translations, lang }: any) => {
  const faqItems = translations.mirrors?.faqItems || fallbackFaq(lang);

  return (
    <section
      id="faq"
      className="bg-[#15152a] rounded-3xl p-6 md:p-10 border border-white/5 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "faq по зеркалам" : "mirror faq"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.mirrors?.faqTitle ||
            (lang === "ru" ? "Частые вопросы о зеркалах" : "Mirror frequently asked questions")}
        </h2>
      </div>

      <div className="space-y-4">
        {faqItems.map((faq: { question: string; answer: string }, idx: number) => (
          <div key={`${faq.question}-${idx}`} className="bg-[#1c1c2d] rounded-2xl border border-white/5">
            <details className="group">
              <summary className="list-none p-4 cursor-pointer flex justify-between items-center text-white font-semibold">
                <span>{faq.question}</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-4 pb-4 text-gray-300 text-sm">{faq.answer}</div>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
};

