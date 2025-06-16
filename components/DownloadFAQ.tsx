export const DownloadFAQ = ({ translations, lang }: any) => (
  <section id="faq" className="bg-[#2a2a42] rounded-xl p-6 md:p-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.download?.faqTitle || 'Частые вопросы'}
    </h2>
    
    <div className="space-y-4">
      {(translations.download?.faqItems || [
        {
          question: lang === 'ru' 
            ? "Чем приложение лучше мобильной версии сайта?" 
            : "How is the app better than the mobile website?",
          answer: lang === 'ru' 
            ? "Приложение VAVADA предлагает более высокую производительность..." 
            : "The VAVADA app offers higher performance..."
        }
        // ... другие вопросы ...
      ]).map((faq: any, idx: number) => (
        <div key={idx} className="bg-[#1c1c2d] rounded-lg overflow-hidden">
          <details className="group">
            <summary className="list-none p-4 cursor-pointer flex justify-between items-center">
              <span className="font-medium text-white">{faq.question}</span>
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div 
              className="px-4 pb-4 text-gray-300" 
              dangerouslySetInnerHTML={{ __html: faq.answer }} 
            />
          </details>
        </div>
      ))}
    </div>
  </section>
);