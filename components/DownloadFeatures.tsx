export const DownloadFeatures = ({ translations, lang }: any) => (
  <section id="features" className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-10">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.download?.featuresTitle || 
        (lang === 'ru' ? 'Почему стоит скачать приложение?' : 'Why download the app?')}
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      {(translations.download?.features || [
        {
          icon: "🚀",
          title: lang === 'ru' ? "Высокая скорость" : "High Speed",
          description: lang === 'ru' 
            ? "Оптимизированная работа даже при медленном интернете" 
            : "Optimized performance even on slow internet"
        },
        // ... другие элементы ...
      ]).map((feature: any, idx: number) => (
        <div key={idx} className="bg-[#1c1c2d] rounded-lg p-6">
          <div className="text-[#ff424d] text-2xl mb-3">{feature.icon}</div>
          <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);