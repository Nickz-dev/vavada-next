import Link from "next/link";
import { IdContext } from "@/contexts/IdContext";
import { useContext } from "react";

type PaymentHighlight = {
  title: string;
  text: string;
  badge?: string;
};

export const HeroPayments = ({ templateData, lang }: any) => {
  const { mirror } = useContext(IdContext);
  const hero = templateData?.payments?.hero;

  const title =
    hero?.title?.[lang] ||
    (lang === "ru" ? "Платежные методы Vavada" : "Vavada payment methods");

  const subtitle =
    hero?.subtitle?.[lang] ||
    (lang === "ru"
      ? "Мгновенные депозиты, быстрые выводы и 0% комиссии на всех актуальных зеркалах."
      : "Instant deposits, fast withdrawals, and 0% fees across every live mirror.");

  const lead =
    hero?.lead?.[lang] ||
    (lang === "ru"
      ? "Подключено более 30 способов оплаты: карты, криптовалюты, P2P и кошельки. Каждая транзакция шифруется на стороне банка и проходит PCI DSS аудит."
      : "30+ payment methods including cards, crypto, P2P, and wallets. Every transaction is bank-side encrypted and PCI DSS audited.");

  const highlightsSource = hero?.highlights?.[lang];
  const highlights: PaymentHighlight[] = Array.isArray(highlightsSource)
    ? highlightsSource
    : lang === "ru"
      ? [
          { title: "5–15 секунд", text: "Депозиты зачисляются без задержек даже ночью.", badge: "instant" },
          { title: "KYC friendly", text: "Верифицированные кошельки получают приоритет на вывод." },
          { title: "0% комиссии", text: "Мы компенсируем сборы шлюзов и добавляем кэшбек за крупные депозиты." }
        ]
      : [
          { title: "5–15 seconds", text: "Deposits land instantly, even overnight.", badge: "instant" },
          { title: "KYC friendly", text: "Verified wallets get priority withdrawal queues." },
          { title: "0% fee", text: "We absorb gateway fees and add cashback for large deposits." }
        ];

  const checklistSource = hero?.checklist?.[lang];
  const checklist: string[] = Array.isArray(checklistSource)
    ? checklistSource
    : lang === "ru"
      ? ["Карты MIR/Visa/Mastercard", "USDT, BTC, ETH, TRX", "P2P и популярные кошельки"]
      : ["MIR/Visa/Mastercard", "USDT, BTC, ETH, TRX", "P2P & top wallets"];

  const stepsSource = hero?.steps?.[lang];
  const steps: string[] = Array.isArray(stepsSource)
    ? stepsSource
    : lang === "ru"
      ? ["Откройте кассу на рабочем зеркале.", "Выберите валюту и способ пополнения.", "Подтвердите платёж — чек появится в личном кабинете."]
      : ["Open cashier on a live mirror.", "Select currency and deposit method.", "Confirm payment — receipt appears in your account."];

  const ctaPrimary =
    hero?.primaryCta?.[lang] ||
    (lang === "ru" ? "Пополнить баланс" : "Make a deposit");

  const ctaSecondary =
    hero?.secondaryCta?.[lang] ||
    (lang === "ru" ? "Смотреть лимиты и валюты" : "See limits & currencies");

  return (
    <section className="relative bg-gradient-to-b from-[#141426] to-[#05050b] py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[12%] w-20 h-20 rounded-full bg-[#4e54c8] opacity-20 blur-2xl" />
        <div className="absolute bottom-12 right-[18%] w-32 h-32 rounded-full bg-[#ff424d] opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-[65%] w-40 h-40 rounded-full bg-[#8a2be2] opacity-15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              {lang === "ru" ? "пополнение и вывод" : "deposits & payouts"}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{title}</h1>
            <p className="text-lg md:text-xl text-gray-300">{subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-white/80">
            {checklist.map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-sm max-w-3xl mx-auto">{lead}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/go/${mirror}`}
              className="group relative inline-flex items-center px-10 py-4 rounded-2xl font-semibold text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-all duration-500" />
              <span className="relative z-10 flex items-center gap-2 text-lg">
                {ctaPrimary}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
            <Link
              href={`/${lang}/payments`}
              className="inline-flex items-center px-10 py-4 rounded-2xl border border-white/15 text-white/80 hover:text-white transition-colors"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {highlights.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3 backdrop-blur-sm"
            >
              {item.badge && (
                <span className="inline-flex text-[10px] uppercase tracking-[0.4em] text-[#ff9aa5]">
                  {item.badge}
                </span>
              )}
              <h3 className="text-white text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-md">
          <p className="text-white text-lg font-semibold">
            {lang === "ru" ? "Как пополнить без задержек" : "How to top up without delays"}
          </p>
          <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-200">
            {steps.map((step, idx) => (
              <div key={`${step}-${idx}`} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">{`0${idx + 1}`}</p>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60">
            {lang === "ru"
              ? "Если банк отклонил платёж — попробуйте другое зеркало или напишите в поддержку, мы переключим на резервный шлюз."
              : "If a bank declines your payment, try another mirror or contact support — we’ll route you through a backup gateway."}
          </p>
        </div>
      </div>
    </section>
  );
};

