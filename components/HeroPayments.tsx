import Link from "next/link";
import { IdContext } from "@/contexts/IdContext";
import { useContext } from "react";

export const HeroPayments = ({ templateData, lang }: any) => {
  const { mirror } = useContext(IdContext);

  return (
    <section className="relative bg-gradient-to-b from-[#1c1c2d] to-[#0d0d1a] py-20 md:py-24 overflow-hidden">
      {/* Декоративные элементы (градиентные круги) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-[10%] w-16 h-16 rounded-full bg-[#4e54c8] opacity-15 blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-[15%] w-24 h-24 rounded-full bg-[#ff424d] opacity-10 blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-[70%] w-32 h-32 rounded-full bg-[#8a2be2] opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Заголовок с анимацией */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="relative inline-block">
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#ff424d] to-[#8a2be2] rounded-full"></span>
              {templateData?.payments?.hero?.title?.[lang] || 
                (lang === 'ru' ? 'Платежные методы VAVADA' : 'VAVADA Payment Methods')}
            </span>
          </h1>
          
          {/* Подзаголовок */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {templateData?.payments?.hero?.subtitle?.[lang] || 
              (lang === 'ru' 
                ? 'Безопасные и быстрые транзакции с мгновенным зачислением' 
                : 'Secure and instant deposit transactions')}
          </p>
          
          {/* Кнопка регистрации */}
          <div className="flex justify-center mb-12">
            <Link 
              href={`/${lang}/go/${mirror}`}
              className="group relative inline-block px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Градиентный фон */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Эффект свечения */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] rounded-full opacity-0 group-hover:opacity-30 blur-md transition-all duration-500"></span>
              
              {/* Текст кнопки */}
              <span className="relative z-10 flex items-center">
                <span className="mr-3">
                  {lang === 'ru' ? 'Начать играть' : 'Start Playing'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Преимущества платежной системы */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1e1e30]/60 backdrop-blur-sm rounded-xl p-5 border border-[#ffffff10] hover:border-[#c642ff50] transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4e54c8]/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8a2be2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">
                {lang === 'ru' ? 'Мгновенные платежи' : 'Instant Payments'}
              </h3>
              <p className="text-gray-400 text-sm">
                {lang === 'ru' 
                  ? 'Зачисление средств за 5-15 секунд' 
                  : 'Funds credited in 5-15 seconds'}
              </p>
            </div>
            
            <div className="bg-[#1e1e30]/60 backdrop-blur-sm rounded-xl p-5 border border-[#ffffff10] hover:border-[#ff424d50] transition-all">
              <div className="w-12 h-12 rounded-full bg-[#ff424d]/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff424d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">
                {lang === 'ru' ? 'Безопасность' : 'Security'}
              </h3>
              <p className="text-gray-400 text-sm">
                {lang === 'ru' 
                  ? 'Защита данных по стандарту PCI DSS' 
                  : 'PCI DSS certified data protection'}
              </p>
            </div>
            
            <div className="bg-[#1e1e30]/60 backdrop-blur-sm rounded-xl p-5 border border-[#ffffff10] hover:border-[#4e54c850] transition-all">
              <div className="w-12 h-12 rounded-full bg-[#8a2be2]/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4e54c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">
                {lang === 'ru' ? '0% комиссии' : '0% Fees'}
              </h3>
              <p className="text-gray-400 text-sm">
                {lang === 'ru' 
                  ? 'Без скрытых комиссий и сборов' 
                  : 'No hidden fees or charges'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};