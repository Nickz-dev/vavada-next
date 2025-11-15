export const BonusTerms = ({ translations, lang }: any) => {
  const isRu = lang === "ru";

  const title =
    translations.bonuses?.termsTitle ||
    (isRu ? "Правила бонусов Vavada" : "Vavada Bonus Policy");

  const tagline =
    translations.bonuses?.termsTagline ||
    (isRu
      ? "Актуальные требования для welcome, reload и кэшбэк офферов в Vavada online casino."
      : "Latest requirements for welcome, reload and cashback offers at Vavada online casino.");

  const items =
    translations.bonuses?.termsItems ||
    (isRu
      ? [
          "Бонусы доступны игрокам 18+ после проверки личности и подтверждения платежей.",
          "Максимальная ставка при отыгрыше — 5 € / $ или 500 ₽; превышение аннулирует бонус.",
          "Срок для отыгрыша welcome — 7 дней, промокодов — 24 часа с момента активации.",
          "Фриспины выдаются на слоты недели и имеют отдельный вейджер x15.",
          "Администрация может изменять условия, уведомляя в приложении или через push.",
        ]
      : [
          "Bonuses are available to verified players 18+ once identity and payment details are confirmed.",
          "Max wagering bet is €5 / $5 or ₽500; exceeding the cap voids the bonus progress.",
          "Welcome bonuses last 7 days, promo codes remain active for 24 hours after activation.",
          "Free spins are tied to spotlight slots and require a separate x15 wager.",
          "Vavada may refresh the rules via push/app alerts when mirrors switch domains.",
        ]);

  const notes =
    translations.bonuses?.termsNotes ||
    (isRu
      ? [
          "Выплаты становятся доступными после полного выполнения вейджера.",
          "При смене домена зеркало условия остаются прежними — достаточно авторизоваться заново.",
        ]
      : [
          "Withdrawals unlock only after the wager is completed in full.",
          "Mirror/domain switches keep the same rules — just log in again on the new URL.",
        ]);

  return (
    <section id="terms" className="bg-[#2a2a42] rounded-2xl p-6 md:p-10 space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-[#ff9f68]">
          {translations.bonuses?.termsLabel ||
            (isRu ? "Условия оффера" : "Offer terms")}
        </p>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="text-gray-300">{tagline}</p>
      </div>

      <div className="bg-[#1c1c2d] rounded-2xl p-6 md:p-8 border border-[#3b3b5c]/60">
        <ul className="space-y-5 text-gray-200">
          {items.map((item: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#ff424d]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 rounded-xl bg-[#25253a] p-4 text-sm text-gray-300 md:grid-cols-2">
          {notes.map((note: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-[#ff424d] font-semibold">!</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};