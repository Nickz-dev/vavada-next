type Step = {
  title: string;
  text: string;
};

const defaultDepositSteps: Record<string, Step[]> = {
  ru: [
    { title: "1. Авторизация", text: "Откройте кассу на рабочем зеркале или в приложении Vavada и убедитесь, что подключена нужная валюта." },
    { title: "2. Выбор метода", text: "Укажите сумму и выберите способ: карты MIR/Visa/Mastercard, P2P, криптовалюты, кошельки." },
    { title: "3. Подтверждение", text: "Подтвердите операцию в банке или кошельке — депозит поступит за 5–15 секунд даже ночью." },
  ],
  en: [
    { title: "1. Sign in", text: "Open the cashier on the live mirror or inside the Vavada app and make sure the right currency is selected." },
    { title: "2. Select method", text: "Enter the amount and choose a channel: MIR/Visa/Mastercard, P2P, crypto, or e-wallets." },
    { title: "3. Confirm", text: "Approve the transaction in your bank or wallet — deposits land within 5–15 seconds even at night." },
  ],
};

const defaultWithdrawalSteps: Record<string, Step[]> = {
  ru: [
    { title: "1. Заявка", text: "Перейдите во вкладку «Вывод» и выберите сохранённый способ или добавьте новый реквизит." },
    { title: "2. Верификация", text: "Для сумм свыше 5 000 ₽ сервис может запросить KYC. Проверка занимает до 30 минут." },
    { title: "3. Ожидание", text: "Заявки до 15 000 ₽ обрабатываются в течение 15 минут, для VIP действует приоритетная очередь." },
  ],
  en: [
    { title: "1. Request", text: "Head to the Withdrawal tab and pick a saved method or add new payout details." },
    { title: "2. Verification", text: "For amounts over €50 / ₽5,000 KYC may be required. It usually takes up to 30 minutes." },
    { title: "3. Processing", text: "Requests up to €300 are processed within 15 minutes, VIP players get priority lanes." },
  ],
};

export const HowToPayments = ({ translations, lang }: any) => {
  const depositSteps: Step[] =
    translations.payments?.depositSteps ||
    defaultDepositSteps[lang as keyof typeof defaultDepositSteps] ||
    [];
  const withdrawalSteps: Step[] =
    translations.payments?.withdrawalSteps ||
    defaultWithdrawalSteps[lang as keyof typeof defaultWithdrawalSteps] ||
    [];

  return (
    <section
      id="howto"
      className="bg-[#2a2a42] rounded-xl p-4 sm:p-8 mb-4 sm:mb-8 border border-white/10"
    >
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "пошаговый гайд" : "step-by-step guide"}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          {translations.payments?.howtoTitle ||
            (lang === "ru" ? "Как внести депозит и вывести выигрыш" : "How to deposit and withdraw safely")}
        </h2>
        <p className="text-sm text-gray-300">
          {lang === "ru"
            ? "Соблюдайте эти шаги, чтобы платежи проходили даже при лимитах банков и операторов."
            : "Follow these steps to make sure payments succeed even when banks or ISPs impose limits."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {[{ title: lang === "ru" ? "Депозит" : "Deposit", steps: depositSteps }, { title: lang === "ru" ? "Вывод" : "Withdrawal", steps: withdrawalSteps }].map(
          ({ title, steps }) => (
            <div key={title} className="bg-[#1c1c2d] rounded-xl p-4 sm:p-6 border border-white/5">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                {title}
              </h3>
              <ol className="space-y-3 text-sm sm:text-base text-gray-300 list-decimal pl-5">
                {steps.map((step, idx) => (
                  <li key={idx}>
                    <p className="text-white font-semibold">{step.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          )
        )}
      </div>

      <div className="mt-6 text-xs text-white/60 bg-[#1c1c2d]/60 border border-white/5 rounded-2xl p-4">
        {lang === "ru"
          ? "Если банк отклонил операцию, переключите зеркало в кассе или используйте USDT — система автоматически конвертирует средства."
          : "If a bank declines your transaction, switch the cashier mirror or pay in USDT—the system auto-converts the funds."}
      </div>
    </section>
  );
};