export const PaymentMethods = ({ translations, lang }: any) => (
  <section id="deposit" className="bg-[#2a2a42] rounded-xl p-4 sm:p-8 mb-6 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
      {translations.payments?.depositTitle || 
        (lang === 'ru' ? 'Методы пополнения счета' : 'Deposit Methods')}
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {(translations.payments?.depositMethods || [
        {
          title: lang === 'ru' ? "Банковские карты" : "Bank Cards",
          items: [
            lang === 'ru' ? "VISA/Mastercard" : "VISA/Mastercard",
            lang === 'ru' ? "МИР" : "MIR",
            lang === 'ru' ? "Instant Processing" : "Instant Processing"
          ]
        },
        // ... другие методы ...
      ]).map((method: any, idx: number) => (
        <div key={idx} className="bg-[#1c1c2d] rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            {method.title}
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
            {method.items.map((item: string, itemIdx: number) => (
              <li key={itemIdx} className="flex items-center">
                <span className="text-[#ff424d] mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);