export const MirrorFAQ = ({ translations, lang }: any) => (
  <section id="faq" className="bg-[#2a2a42] rounded-xl p-6">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.mirrors?.faqTitle || 
        (lang === 'ru' ? 'Частые вопросы о зеркалах' : 'Frequently Asked Questions')}
    </h2>
    
    <div className="space-y-4">
      {(translations.mirrors?.faqItems || [
        {
          question: lang === 'ru' 
            ? "Что такое зеркало сайта?" 
            : "What is a site mirror?",
          answer: lang === 'ru'
            ? "Это точная копия основного сайта с другим адресом для обхода блокировок."
            : "An exact copy of the main site with different address to bypass restrictions."
        },
        {
          question: lang === 'ru' 
            ? "Нужна ли повторная регистрация?" 
            : "Do I need to register again?",
          answer: lang === 'ru'
            ? "Нет, используйте существующие данные для входа."
            : "No, use your existing credentials to log in."
        },
        {
          question: lang === 'ru' 
            ? "Как часто обновляются ссылки?" 
            : "How often are links updated?",
          answer: lang === 'ru'
            ? "Мы ежедневно проверяем работоспособность зеркал."
            : "We check mirror availability daily."
        }
      ]).map((faq: any, idx: number) => (
        <div key={idx} className="bg-[#1c1c2d] rounded-lg overflow-hidden">
          <details className="group">
            <summary className="list-none p-4 cursor-pointer flex justify-between items-center">
              <span className="font-medium text-white">{faq.question}</span>
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="px-4 pb-4 text-gray-300">{faq.answer}</div>
          </details>
        </div>
      ))}
    </div>
  </section>
);