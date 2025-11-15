const fallbackFAQ = (lang: string) =>
  lang === "ru"
    ? [
        {
          question: "Сколько ждать вывод средств?",
          answer:
            "Заявки до 15 000 ₽ обрабатываются в течение 15 минут. Суммы выше зависят от верификации и банка (до 24 часов).",
        },
        {
          question: "Нужен ли KYC для депозита?",
          answer:
            "Нет. Верификация требуется только перед выводом крупных выигрышей или при смене реквизитов.",
        },
        {
          question: "Как отменить заявку на вывод?",
          answer:
            "До подтверждения модератором отмените запрос в разделе «Касса → История операций».",
        },
      ]
    : [
        {
          question: "How long do withdrawals take?",
          answer:
            "Requests up to €300 are processed within 15 minutes. Larger payouts depend on verification/banks (up to 24h).",
        },
        {
          question: "Is KYC required for deposits?",
          answer:
            "No. Verification is required only before large withdrawals or when changing payout details.",
        },
        {
          question: "How to cancel a withdrawal?",
          answer:
            "Before moderation approval, cancel it in Cashier → Transaction history.",
        },
      ];

export const PaymentFAQ = ({ translations, lang }: any) => {
  const faqItems = translations.payments?.faqItems || fallbackFAQ(lang);

  return (
    <section
      id="faq"
      className="bg-[#15152a] rounded-3xl p-6 md:p-10 border border-white/5 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "faq по платежам" : "payments faq"}
        </p>
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        {translations.payments?.faqTitle ||
          (lang === "ru" ? "Частые вопросы" : "Frequently asked questions")}
      </h2>
    </div>

      <div className="space-y-4">
        {faqItems.map((faq: { question: string; answer: string }, idx: number) => (
          <div key={`${faq.question}-${idx}`} className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
            <p className="text-sm text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

