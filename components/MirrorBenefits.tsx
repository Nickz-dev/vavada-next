export const MirrorBenefits = ({ translations, lang }: any) => (
  <section id="benefits" className="bg-[#2a2a42] rounded-xl p-6 mb-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.mirrors?.benefitsTitle || 
        (lang === 'ru' ? 'Преимущества зеркал' : 'Mirror Benefits')}
    </h2>
    
    <ul className="grid md:grid-cols-2 gap-4">
      {(translations.mirrors?.benefitsList || [
        lang === 'ru' ? "Доступ при блокировке основного сайта" : "Access when main site is blocked",
        lang === 'ru' ? "Полная функциональность казино" : "Full casino functionality",
        lang === 'ru' ? "Автоматическое обновление ссылок" : "Automatic link updates",
        lang === 'ru' ? "Безопасность данных и счетов" : "Account data security"
      ]).map((benefit: string, idx: number) => (
        <li key={idx} className="flex items-start bg-[#1c1c2d] p-4 rounded-lg">
          <span className="text-[#ff424d] mr-2">✓</span>
          <span className="text-gray-300">{benefit}</span>
        </li>
      ))}
    </ul>
  </section>
);