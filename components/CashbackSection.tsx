export const CashbackSection = ({ translations, lang }: any) => (
  <section id="cashback" className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.bonuses?.cashbackTitle || 
        (lang === 'ru' ? 'Еженедельный кэшбэк' : 'Weekly Cashback')}
    </h2>
    
    <div className="bg-[#1c1c2d] rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            {translations.bonuses?.cashbackConditions?.title || 
              (lang === 'ru' ? 'Условия получения' : 'Conditions')}
          </h3>
          <ul className="space-y-3 text-gray-300">
            {(translations.bonuses?.cashbackConditions?.items || [
              lang === 'ru' ? "До 10% от проигранных ставок" : "Up to 10% of lost bets",
              lang === 'ru' ? "Начисление каждый понедельник" : "Accrued every Monday",
              lang === 'ru' ? "Вейджер x5" : "x5 wager"
            ]).map((item: string, idx: number) => (
              <li key={idx} className="flex items-center">
                <span className="text-[#ff424d] mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            {translations.bonuses?.cashbackActivation?.title || 
              (lang === 'ru' ? 'Как активировать' : 'How to Activate')}
          </h3>
          <ol className="space-y-3 list-decimal pl-4 text-gray-300">
            {(translations.bonuses?.cashbackActivation?.steps || [
              lang === 'ru' ? "Войдите в личный кабинет" : "Log in to your account",
              lang === 'ru' ? "Перейдите в раздел \"Бонусы\"" : "Go to the \"Bonuses\" section",
              lang === 'ru' ? "Нажмите \"Активировать кэшбэк\"" : "Click \"Activate Cashback\""
            ]).map((step: string, idx: number) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);