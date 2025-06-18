export const PaymentFAQ = ({ translations, lang }: any) => (
  <section id="faq" className="bg-[#2a2a42] rounded-xl p-4 sm:p-8">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
      {translations.payments?.faqTitle || 
        (lang === 'ru' ? 'Частые вопросы' : 'Frequently Asked Questions')}
    </h2>
    
    <div className="space-y-4">
      {(translations.payments?.faqItems || [
        {
          question: lang === 'ru' 
            ? "Как долго ждать вывода средств?" 
            : "How long does withdrawal take?",
          answer: lang === 'ru' 
            ? "Время обработки зависит от выбранного метода..." 
            : "Processing time depends on the method..."
        }
        // ... другие вопросы ...
      ]).map((faq: any, idx: number) => (
        <div key={idx} className="bg-[#1c1c2d] rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
            {faq.question}
          </h3>
          <p className="text-sm sm:text-base text-gray-300">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  </section>
);