export const WelcomeBonus = ({ translations, lang }: any) => (
  <section id="welcome-bonus" className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.bonuses?.welcomeTitle || 
        (lang === 'ru' ? 'Приветственный пакет' : 'Welcome Package')}
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="bg-[#1c1c2d] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            {translations.bonuses?.firstDeposit?.title || 
              (lang === 'ru' ? 'Первый депозит' : 'First Deposit')}
          </h3>
          <ul className="space-y-3 text-gray-300">
            {(translations.bonuses?.firstDeposit?.items || [
              lang === 'ru' ? "100% бонус до 100 000₽" : "100% bonus up to €1000",
              lang === 'ru' ? "100 фриспинов в Book of Dead" : "100 free spins in Book of Dead",
              lang === 'ru' ? "Минимальный депозит 1000₽" : "Minimum deposit €10"
            ]).map((item: string, idx: number) => (
              <li key={idx} className="flex items-center">
                <span className="text-[#ff424d] mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-[#1c1c2d] rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          {translations.bonuses?.howToGet?.title || 
            (lang === 'ru' ? 'Как получить' : 'How to Get')}
        </h3>
        <ol className="space-y-3 list-decimal pl-4 text-gray-300">
          {(translations.bonuses?.howToGet?.steps || [
            lang === 'ru' ? "Зарегистрируйтесь на сайте" : "Register on the site",
            lang === 'ru' ? "Пополните счет от 1000₽" : "Deposit from €10",
            lang === 'ru' ? "Бонус начислится автоматически" : "Bonus will be credited automatically",
            lang === 'ru' ? "Отыграйте бонус с вейджером x35" : "Wager the bonus with x35 wager"
          ]).map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);