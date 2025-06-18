export const WithdrawalMethods = ({ translations, lang }: any) => (
  <section id="withdrawal" className="bg-[#2a2a42] rounded-xl p-4 sm:p-8 mb-6 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
      {translations.payments?.withdrawalTitle || 
        (lang === 'ru' ? 'Методы вывода средств' : 'Withdrawal Methods')}
    </h2>
    
    {/* Мобильная версия */}
    <div className="block sm:hidden space-y-4">
      {(translations.payments?.withdrawalMethods || [
        {
          method: lang === 'ru' ? "Банковские карты" : "Bank Cards",
          time: lang === 'ru' ? "1-24 часа" : "1-24 hours",
          min: "1000₽",
          fee: "0%"
        },
        // ... другие методы ...
      ]).map((method: any, idx: number) => (
        <div key={idx} className="bg-[#1c1c2d] rounded-xl p-4">
          <h3 className="font-semibold text-white mb-2">{method.method}</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-400">{lang === 'ru' ? "Время:" : "Time:"}</dt>
              <dd className="text-gray-300">{method.time}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">{lang === 'ru' ? "Минимум:" : "Min:"}</dt>
              <dd className="text-gray-300">{method.min}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">{lang === 'ru' ? "Комиссия:" : "Fee:"}</dt>
              <dd className="text-gray-300">{method.fee}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
    
    {/* Десктопная версия */}
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-[#1c1c2d] text-white">
          <tr>
            <th className="p-4 rounded-l-xl">{lang === 'ru' ? "Метод" : "Method"}</th>
            <th className="p-4">{lang === 'ru' ? "Время обработки" : "Processing Time"}</th>
            <th className="p-4">{lang === 'ru' ? "Минимальная сумма" : "Min Amount"}</th>
            <th className="p-4 rounded-r-xl">{lang === 'ru' ? "Комиссия" : "Fee"}</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {(translations.payments?.withdrawalMethods || [
            {
              method: lang === 'ru' ? "Банковские карты" : "Bank Cards",
              time: lang === 'ru' ? "1-24 часа" : "1-24 hours",
              min: "1000₽",
              fee: "0%"
            },
            // ... другие методы ...
          ]).map((method: any, idx: number) => (
            <tr 
              key={idx} 
              className={idx < translations.payments?.withdrawalMethods?.length - 1 
                ? "border-b border-[#2a2a42]" 
                : ""}
            >
              <td className="p-4">{method.method}</td>
              <td className="p-4">{method.time}</td>
              <td className="p-4">{method.min}</td>
              <td className="p-4">{method.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);