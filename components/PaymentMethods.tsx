type Method = {
  title: string;
  items: string[];
  icon?: string;
};

const fallbackDepositMethods = (lang: string): Method[] =>
  lang === "ru"
    ? [
        {
          title: "Банковские карты",
          icon: "💳",
          items: ["Visa/Mastercard/MIR", "Зачисление 5–15 секунд", "0% комиссий"],
        },
        {
          title: "P2P и кошельки",
          icon: "💼",
          items: ["QIWI, ЮMoney, P2P-переводы", "Привязка карты за 1 клик"],
        },
        {
          title: "Криптовалюты",
          icon: "🪙",
          items: ["USDT, BTC, ETH", "Автоконвертация по курсу Binance"],
        },
      ]
    : [
        {
          title: "Bank Cards",
          icon: "💳",
          items: ["Visa/Mastercard/MIR", "Funds in 5–15 seconds", "0% fees"],
        },
        {
          title: "P2P & Wallets",
          icon: "💼",
          items: ["QIWI, YooMoney, P2P transfers", "One-tap card binding"],
        },
        {
          title: "Crypto",
          icon: "🪙",
          items: ["USDT, BTC, ETH", "Auto conversion at Binance rate"],
        },
      ];

export const PaymentMethods = ({ translations, lang }: any) => {
  const methods =
    translations.payments?.depositMethods || fallbackDepositMethods(lang);

  return (
    <section
      id="deposit"
      className="bg-[#15152a] rounded-3xl p-6 md:p-10 mb-6 border border-white/5 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "пополнение" : "deposit"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.payments?.depositTitle ||
            (lang === "ru" ? "Методы пополнения счёта" : "Deposit methods")}
        </h2>
        <p className="text-sm text-white/70">
          {translations.payments?.depositSubtitle ||
            (lang === "ru"
              ? "Выберите удобный способ — средства поступают мгновенно, а платёжные шлюзы работают даже при блокировках."
              : "Pick the method that suits you—funds arrive instantly and gateways stay live even during restrictions.")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {methods.map((method: Method, idx: number) => (
          <div
            key={`${method.title}-${idx}`}
            className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{method.icon || "•"}</span>
              <h3 className="text-lg font-semibold text-white">{method.title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {method.items.map((item, itemIdx) => (
                <li key={`${item}-${itemIdx}`} className="flex items-start gap-2">
                  <span className="text-[#ff424d]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

