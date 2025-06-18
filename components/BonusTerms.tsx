export const BonusTerms = ({ translations, lang }: any) => (
  <section id="terms" className="bg-[#2a2a42] rounded-xl p-6 md:p-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.bonuses?.termsTitle || 
        (lang === 'ru' ? 'Правила и условия' : 'Terms & Conditions')}
    </h2>
    
    <div className="bg-[#1c1c2d] rounded-xl p-6">
      <ul className="space-y-4 text-gray-300">
        {(translations.bonuses?.termsItems || [
          lang === 'ru' 
            ? "Все бонусы доступны только для совершеннолетних игроков после верификации аккаунта" 
            : "All bonuses are available only for adult players after account verification",
          lang === 'ru' 
            ? "Максимальная ставка при отыгрыше бонуса — 500₽" 
            : "Maximum bet when wagering the bonus is €5",
          lang === 'ru' 
            ? "Срок действия бонуса — 7 дней с момента активации" 
            : "Bonus validity period is 7 days from activation",
          lang === 'ru' 
            ? "Администрация оставляет за собой право изменять условия бонусной программы" 
            : "Administration reserves the right to change bonus terms"
        ]).map((item: string, idx: number) => (
          <li key={idx} className="flex items-start">
            <span className="text-[#ff424d] mr-2">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);