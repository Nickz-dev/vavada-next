type Tier = {
  title: string;
  perks: string[];
  badge?: string;
};

const fallbackTiers = (lang: string): Tier[] =>
  lang === "ru"
    ? [
        {
          title: "Silver",
          badge: "5% кэшбэк",
          perks: ["Кэшбэк 5%", "Персональные акции", "Бонусы на депозит"],
        },
        {
          title: "Gold",
          badge: "7% кэшбэк",
          perks: ["Кэшбэк 7%", "Повышенные лимиты", "Эксклюзивные бонусы"],
        },
        {
          title: "Diamond",
          badge: "10% кэшбэк",
          perks: ["Кэшбэк 10%", "VIP поддержка", "Особые привилегии"],
        },
      ]
    : [
        {
          title: "Silver",
          badge: "5% cashback",
          perks: ["5% cashback", "Personal promos", "Deposit boosts"],
        },
        {
          title: "Gold",
          badge: "7% cashback",
          perks: ["7% cashback", "Higher limits", "Exclusive bonuses"],
        },
        {
          title: "Diamond",
          badge: "10% cashback",
          perks: ["10% cashback", "VIP support", "Special privileges"],
        },
      ];

export const LoyaltyProgram = ({ translations, lang }: any) => {
  const tiers: Tier[] =
    translations.bonuses?.loyaltyTiers || fallbackTiers(lang);

  return (
    <section
      id="loyalty"
      className="bg-[#15152a] rounded-3xl p-6 md:p-10 mb-8 border border-white/5 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "лояльность" : "loyalty"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.bonuses?.loyaltyTitle ||
            (lang === "ru" ? "Программа лояльности" : "Loyalty Program")}
        </h2>
        <p className="text-sm text-white/70">
          {translations.bonuses?.loyaltyDescription ||
            (lang === "ru"
              ? "Повышайте уровень, получайте больший кэшбэк, персональные бонусы и круглосуточную VIP-поддержку."
              : "Level up to unlock higher cashback, personal bonuses, and 24/7 VIP support.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, idx) => {
          const perks = tier.perks || (tier as any).items || [];
          return (
          <div
            key={`${tier.title}-${idx}`}
            className={`bg-[#1d1d32] rounded-2xl p-6 border border-white/5 ${
              tier.title === "Gold" || tier.title === "Diamond"
                ? "shadow-lg shadow-[#ff424d]/20 border-[#ff424d]/40"
                : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{tier.title}</h3>
              {tier.badge && (
                <span className="text-xs uppercase tracking-[0.3em] text-[#ff727f]">
                  {tier.badge}
                </span>
              )}
            </div>
            <ul className="space-y-3 text-gray-300 text-sm">
              {perks.map((perk, perkIdx) => (
                <li key={`${perk}-${perkIdx}`} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff424d]" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        })}
      </div>
    </section>
  );
};

