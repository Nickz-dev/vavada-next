export const HowToUse = ({ translations, lang }: any) => (
  <section id="how-to-use" className="bg-[#2a2a42] rounded-xl p-6 mb-8">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.mirrors?.howToTitle || 
        (lang === 'ru' ? 'Как использовать зеркало VAVADA' : 'How to Use VAVADA Mirror')}
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="bg-[#1c1c2d] p-6 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-[#ff424d] flex items-center justify-center text-white font-bold text-xl mb-4">
            {step}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {lang === 'ru' 
              ? `Шаг ${step}` 
              : `Step ${step}`}
          </h3>
          <p className="text-gray-300">
            {lang === 'ru'
              ? [
                  "Выберите рабочее зеркало из списка выше",
                  "Перейдите по ссылке в браузере",
                  "Введите свои учетные данные для входа"
                ][step - 1]
              : [
                  "Select working mirror from the list above",
                  "Open the link in your browser",
                  "Enter your login credentials"
                ][step - 1]}
          </p>
        </div>
      ))}
    </div>
  </section>
);