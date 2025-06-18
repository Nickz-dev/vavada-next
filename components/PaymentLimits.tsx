export const PaymentLimits = ({ translations, lang }: any) => (
  <section id="limits" className="bg-[#2a2a42] rounded-xl p-4 sm:p-8 mb-4 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
      {translations.payments?.limitsTitle || 
        (lang === 'ru' ? 'Лимиты и ограничения' : 'Limits and Restrictions')}
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div className="bg-[#1c1c2d] rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
          {lang === 'ru' ? 'Депозиты' : 'Deposits'}
        </h3>
        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
          {(translations.payments?.depositLimits || [
            { label: lang === 'ru' ? "Минимальный:" : "Minimum:", value: "100₽" },
            // ... другие лимиты ...
          ]).map((limit: any, idx: number) => (
            <li key={idx} className="flex justify-between">
              <span>{limit.label}</span>
              <span className="text-[#ff424d]">{limit.value}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-[#1c1c2d] rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
          {lang === 'ru' ? 'Выводы' : 'Withdrawals'}
        </h3>
        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
          {(translations.payments?.withdrawalLimits || [
            { label: lang === 'ru' ? "Минимальный:" : "Minimum:", value: "500₽" },
            // ... другие лимиты ...
          ]).map((limit: any, idx: number) => (
            <li key={idx} className="flex justify-between">
              <span>{limit.label}</span>
              <span className="text-[#ff424d]">{limit.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);