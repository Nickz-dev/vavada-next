export const HowToPayments = ({ translations, lang }: any) => (
  <section id="howto" className="bg-[#2a2a42] rounded-xl p-4 sm:p-8 mb-4 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
      {translations.payments?.howtoTitle || 
        (lang === 'ru' ? 'Как сделать депозит/вывод' : 'How to Deposit/Withdraw')}
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
      <div className="bg-[#1c1c2d] rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
          {lang === 'ru' ? 'Депозит' : 'Deposit'}
        </h3>
        <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300 list-decimal pl-4">
          {(translations.payments?.depositSteps || [
            lang === 'ru' ? "Войдите в личный кабинет" : "Log in to your account"
            // ... другие шаги ...
          ]).map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
      
      <div className="bg-[#1c1c2d] rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
          {lang === 'ru' ? 'Вывод' : 'Withdrawal'}
        </h3>
        <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300 list-decimal pl-4">
          {(translations.payments?.withdrawalSteps || [
            lang === 'ru' ? "Войдите в личный кабинет" : "Log in to your account"
            // ... другие шаги ...
          ]).map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);