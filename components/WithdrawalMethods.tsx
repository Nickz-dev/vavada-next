import React from "react";

type WithdrawalMethod = {
  method: string;
  time: string;
  min: string;
  fee: string;
  limits?: string;
  status?: "instant" | "fast" | "standard";
};

interface WithdrawalMethodsProps {
  translations: any;
  lang: string;
}

const fallbackMethods = (lang: string): WithdrawalMethod[] =>
  lang === "ru"
    ? [
        {
          method: "Банковские карты (Visa/Mastercard/MIR)",
          time: "15–60 минут",
          min: "1 000 ₽",
          fee: "0%",
          limits: "до 300 000 ₽ в день",
          status: "fast",
        },
        {
          method: "Криптовалюты (USDT, BTC, ETH)",
          time: "5–15 минут",
          min: "2 000 ₽ / 20 USDT",
          fee: "0%",
          limits: "до 1 500 000 ₽",
          status: "instant",
        },
        {
          method: "P2P/кошельки (QIWI, YooMoney, Piastrix)",
          time: "5–30 минут",
          min: "500 ₽",
          fee: "0%",
          limits: "до 500 000 ₽",
          status: "fast",
        },
      ]
    : [
        {
          method: "Bank cards (Visa/Mastercard)",
          time: "15–60 minutes",
          min: "€20",
          fee: "0%",
          limits: "up to €5 000 daily",
          status: "fast",
        },
        {
          method: "Cryptocurrency (USDT, BTC, ETH)",
          time: "5–15 minutes",
          min: "€20 / 20 USDT",
          fee: "0%",
          limits: "up to €15 000",
          status: "instant",
        },
        {
          method: "P2P & wallets (QIWI, YooMoney, Piastrix)",
          time: "5–30 minutes",
          min: "€10",
          fee: "0%",
          limits: "up to €7 000",
          status: "fast",
        },
      ];

const statusLabel = (status: WithdrawalMethod["status"], lang: string) => {
  if (!status) return null;
  const map =
    lang === "ru"
      ? { instant: "мгновенно", fast: "быстро", standard: "стандарт" }
      : { instant: "instant", fast: "fast", standard: "standard" };
  return map[status];
};

export const WithdrawalMethods: React.FC<WithdrawalMethodsProps> = ({
  translations,
  lang,
}) => {
  const methods =
    translations.payments?.withdrawalMethods || fallbackMethods(lang);

  return (
    <section
      id="withdrawal"
      className="bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "вывод" : "payouts"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.payments?.withdrawalTitle ||
            (lang === "ru" ? "Методы вывода средств" : "Withdrawal methods")}
        </h2>
        <p className="text-sm text-white/70">
          {lang === "ru"
            ? "Vavada обрабатывает заявки автоматически: до 15 минут на криптовалюты и кошельки, до часа на карты. Комиссия 0%."
            : "Vavada processes requests automatically: up to 15 minutes for crypto/wallets and under an hour for cards. 0% fee on our side."}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {methods.map((method: WithdrawalMethod, idx: number) => (
          <article
            key={`${method.method}-${idx}`}
            className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">
                {method.method}
              </h3>
              {method.status && (
                <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-[#4CAF50]">
                  {statusLabel(method.status, lang)}
                </span>
              )}
            </div>
            <dl className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between">
                <dt className="text-white/60">
                  {lang === "ru" ? "Время" : "Time"}
                </dt>
                <dd>{method.time}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">
                  {lang === "ru" ? "Минимум" : "Min"}
                </dt>
                <dd>{method.min}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">
                  {lang === "ru" ? "Комиссия" : "Fee"}
                </dt>
                <dd>{method.fee}</dd>
              </div>
              {method.limits && (
                <div className="flex justify-between">
                  <dt className="text-white/60">
                    {lang === "ru" ? "Лимиты" : "Limits"}
                  </dt>
                  <dd>{method.limits}</dd>
                </div>
              )}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
};