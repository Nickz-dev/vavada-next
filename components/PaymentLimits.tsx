type PaymentLimit = {
  label: string;
  value: string;
};

const fallbackDepositLimits = (lang: string): PaymentLimit[] =>
  lang === "ru"
    ? [
        { label: "Минимальный депозит", value: "100 ₽ / €5" },
        { label: "Максимум за раз", value: "750 000 ₽ / €5 000" },
        { label: "Ежедневный лимит", value: "1 500 000 ₽ / €10 000" },
      ]
    : [
        { label: "Minimum deposit", value: "€5 / 100 ₽" },
        { label: "Max per transaction", value: "€5 000 / 750 000 ₽" },
        { label: "Daily limit", value: "€10 000 / 1 500 000 ₽" },
      ];

const fallbackWithdrawalLimits = (lang: string): PaymentLimit[] =>
  lang === "ru"
    ? [
        { label: "Минимальный вывод", value: "500 ₽ / €20" },
        { label: "Максимум за раз", value: "500 000 ₽ / €3 500" },
        { label: "Ежедневный лимит", value: "1 000 000 ₽ / €7 000" },
      ]
    : [
        { label: "Minimum withdrawal", value: "€20 / 500 ₽" },
        { label: "Max per transaction", value: "€3 500 / 500 000 ₽" },
        { label: "Daily limit", value: "€7 000 / 1 000 000 ₽" },
      ];

export const PaymentLimits = ({ translations, lang }: any) => {
  const depositLimits =
    translations.payments?.depositLimits || fallbackDepositLimits(lang);
  const withdrawalLimits =
    translations.payments?.withdrawalLimits || fallbackWithdrawalLimits(lang);

  const blocks = [
    {
      title: lang === "ru" ? "Депозиты" : "Deposits",
      tip:
        translations.payments?.depositTip ||
        (lang === "ru"
          ? "Холд средств 0%, моментальное зачисление"
          : "0% hold, instant credit"),
      list: depositLimits,
    },
    {
      title: lang === "ru" ? "Выводы" : "Withdrawals",
      tip:
        translations.payments?.withdrawTip ||
        (lang === "ru"
          ? "Заявки до 15 000 ₽ обрабатываются за 15 минут"
          : "Requests up to €300 are processed within 15 minutes"),
      list: withdrawalLimits,
    },
  ];

  return (
    <section
      id="limits"
      className="bg-[#15152a] rounded-3xl p-6 md:p-10 mb-8 border border-white/5 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "лимиты" : "limits"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.payments?.limitsTitle ||
            (lang === "ru" ? "Лимиты и ограничения" : "Limits and caps")}
        </h2>
        <p className="text-sm text-white/70">
          {translations.payments?.limitsSubtitle ||
            (lang === "ru"
              ? "Мы актуализируем лимиты под требования банков и выдаём приоритет VIP-аккаунтам."
              : "We adjust limits to bank requirements and give VIP accounts priority processing.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blocks.map((block, idx) => (
          <div
            key={`${block.title}-${idx}`}
            className="bg-[#1c1c2d] rounded-2xl p-6 border border-white/5 space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{block.title}</h3>
              <p className="text-xs text-white/60">{block.tip}</p>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              {block.list.map((limit: PaymentLimit, limitIdx: number) => (
                <li key={`${limit.label}-${limitIdx}`} className="flex justify-between">
                  <span>{limit.label}</span>
                  <span className="text-[#ff424d] font-semibold">{limit.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

