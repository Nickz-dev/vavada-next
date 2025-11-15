export const CashbackSection = ({ translations, lang }: any) => {
  const isRu = lang === "ru";

  const label =
    translations.bonuses?.cashbackLabel ||
    (isRu ? "еженедельный возврат" : "weekly payback");

  const title =
    translations.bonuses?.cashbackTitle ||
    (isRu
      ? "Кэшбэк Vavada — возврат до 10% каждую неделю"
      : "Vavada Cashback — up to 10% back every week");

  const subtitle =
    translations.bonuses?.cashbackSubtitle ||
    (isRu
      ? "Возвращаем часть чистого проигрыша по понедельникам на любой статус — просто активируйте в разделе бонусов."
      : "We refund part of your net loss every Monday for any status — just activate it in the bonus hub.");

  const conditionsTitle =
    translations.bonuses?.cashbackConditions?.title ||
    (isRu ? "Что важно знать" : "Key conditions");

  const conditions =
    translations.bonuses?.cashbackConditions?.items ||
    (isRu
      ? [
          "Сумма возврата зависит от статуса: Silver 5%, Gold 7%, Diamond 10%.",
          "Рассчитывается от чистого проигрыша за неделю, без учёта активных бонусов.",
          "Вейджер x5, максимальная ставка при отыгрыше — 500 ₽ / 5 €.",
          "Формально начисляется в понедельник 12:00 (UTC+3) и доступен 48 часов.",
        ]
      : [
          "Payback rate depends on tier: Silver 5%, Gold 7%, Diamond 10%.",
          "Calculated from net weekly losses excluding active bonus funds.",
          "Wager x5 with a max bet of $5 / €5 / ₽500.",
          "Credited Monday 09:00 UTC and stays active for 48 hours.",
        ]);

  const activationTitle =
    translations.bonuses?.cashbackActivation?.title ||
    (isRu ? "Как забрать" : "How to claim");

  const activationSteps =
    translations.bonuses?.cashbackActivation?.steps ||
    (isRu
      ? [
          "Откройте раздел «Бонусы» на сайте, в приложении или зеркале.",
          "Нажмите «Получить кэшбэк» — сумма отобразится сразу.",
          "Отыгрывайте в любимых слотах, соблюдая лимит ставки.",
        ]
      : [
          "Open the “Bonuses” tab on the site, app or mirror.",
          "Hit “Claim cashback” — the amount appears instantly.",
          "Wager it on your favorite slots within the stake cap.",
        ]);

  const reminders =
    translations.bonuses?.cashbackReminders ||
    (isRu
      ? [
          "Cashback не суммируется с другими бонусами — активируйте их по очереди.",
          "Если зеркало сменилось, просто авторизуйтесь снова: прогресс сохранён.",
        ]
      : [
          "Cashback doesn’t stack with other bonuses — activate them one by one.",
          "If the mirror changes, log in again — progress stays intact.",
        ]);

  return (
    <section
      id="cashback"
      className="bg-gradient-to-br from-[#2a2a42] to-[#1f1f33] rounded-2xl p-6 md:p-10 mb-10 space-y-6"
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-[#ff9f68]">
          {label}
        </p>
        <h2 className="text-3xl font-bold text-white leading-tight">{title}</h2>
        <p className="text-gray-300">{subtitle}</p>
      </div>

      <div className="bg-[#1c1c2d] rounded-2xl border border-[#3b3b5c]/60 p-6 md:p-8 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-white">{conditionsTitle}</h3>
          <ul className="space-y-4 text-gray-200">
            {conditions.map((item: string, idx: number) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-3 w-3 rounded-full bg-[#ff424d]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-white">{activationTitle}</h3>
          <ol className="space-y-4 text-gray-200">
            {activationSteps.map((step: string, idx: number) => (
              <li key={idx} className="flex gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff424d] text-white font-semibold">
                  {idx + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reminders.map((note: string, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border border-[#3b3b5c]/40 bg-[#25253a] p-4 text-sm text-gray-300 flex gap-3"
          >
            <span className="text-[#ff424d] font-semibold">ℹ</span>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </section>
  );
};