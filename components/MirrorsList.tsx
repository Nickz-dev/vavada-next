export const MirrorsList = ({ translations, lang }: any) => (
  <section id="mirrors" className="bg-[#2a2a42] rounded-xl p-6 mb-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.mirrors?.nav?.mirrors || 
        (lang === 'ru' ? 'Актуальные зеркала VAVADA' : 'Current VAVADA Mirrors')}
    </h2>
    
    <div className="mb-6 p-4 bg-[#1c1c2d] rounded-lg border border-[#ff424d]">
      <p className="text-yellow-400 font-medium mb-3">
        {translations.mirrors?.currentMirror || "⚡ Рабочее зеркало на сегодня:"}
      </p>
      <div className="flex items-center justify-between p-3 bg-[#232338] rounded">
        <span className="font-medium">vavada-casino.com</span>
        <span className="text-[#4CAF50] flex items-center">
          <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-2"></span>
          {translations.mirrors?.workingStatus || "Работает"}
        </span>
      </div>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      {translations.mirrors?.alternative || "Альтернативные зеркала для доступа:"}
    </p>
    <div className="space-y-3">
      {['vavada-casino.xyz', 'vavada-casino.site'].map((mirror, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-[#1c1c2d] rounded">
          <span>{mirror}</span>
          <span className="text-[#4CAF50]">
            {translations.mirrors?.workingStatus || "Работает"}
          </span>
        </div>
      ))}
    </div>
  </section>
);