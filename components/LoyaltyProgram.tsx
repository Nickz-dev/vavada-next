export const LoyaltyProgram = ({ translations, lang }: any) => (
  <section id="loyalty" className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.bonuses?.loyaltyTitle || 
        (lang === 'ru' ? 'Программа лояльности' : 'Loyalty Program')}
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(translations.bonuses?.loyaltyTiers || [
        {
          title: "Silver",
          items: [
            lang === 'ru' ? "Кэшбэк 5%" : "5% cashback",
            lang === 'ru' ? "Персональные акции" : "Personal promotions",
            lang === 'ru' ? "Бонусы на депозит" : "Deposit bonuses"
          ]
        },
        {
          title: "Gold",
          items: [
            lang === 'ru' ? "Кэшбэк 7%" : "7% cashback",
            lang === 'ru' ? "Повышенные лимиты" : "Increased limits",
            lang === 'ru' ? "Эксклюзивные бонусы" : "Exclusive bonuses"
          ]
        },
        {
          title: "Diamond",
          items: [
            lang === 'ru' ? "Кэшбэк 10%" : "10% cashback",
            lang === 'ru' ? "VIP поддержка" : "VIP support",
            lang === 'ru' ? "Особые привилегии" : "Special privileges"
          ]
        }
      ]).map((tier: any, idx: number) => (
        <div 
          key={idx} 
          className={`bg-[#1c1c2d] rounded-xl p-6 ${
            tier.title === "Gold" ? "border-2 border-[#ff424d]" : ""
          }`}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            {tier.title}
          </h3>
          <ul className="space-y-3 text-gray-300">
            {tier.items.map((item: string, itemIdx: number) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);