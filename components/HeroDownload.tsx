import Link from "next/link";
import { IdContext } from "@/contexts/IdContext";
import { useContext } from "react";

export const HeroDownload = ({ templateData, lang }: any) => {
  const { download } = useContext(IdContext);
  
  return (
    <section className="relative bg-gradient-to-b from-[#1c1c2d] to-[#0d0d1a] py-20 md:py-24">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-[#ff424d] opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-[#8a2be2] opacity-15 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#4e54c8] opacity-10 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Заголовок */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
            {templateData?.download?.hero?.title?.[lang] || 
              (lang === 'ru' ? 'Скачайте приложение VAVADA' : 'Download VAVADA App')}
          </h1>
          
          {/* Подзаголовок */}
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {templateData?.download?.hero?.subtitle?.[lang] || 
              (lang === 'ru' 
                ? 'Играйте в любимые слоты в любое время и в любом месте' 
                : 'Play your favorite slots anytime, anywhere')}
          </p>
          
          {/* Кнопка скачивания */}
          <div className="flex justify-center">
            <Link 
              href={`/${lang}/go/${download}`}
              className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white overflow-hidden"
            >
              {/* Градиентный фон */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#4e54c8] to-[#8a2be2] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Эффект свечения */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#4e54c8] to-[#8a2be2] rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-all duration-500"></span>
              
              {/* Иконка скачивания */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 mr-3 relative z-10" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              
              {/* Текст кнопки */}
              <span className="relative z-10">
                <span className="block text-xl">
                  {lang === 'ru' ? 'Скачать приложение' : 'Download App'}
                </span>
                <span className="block text-xs font-normal opacity-80 mt-1">
                  {lang === 'ru' ? 'Для iOS и Android' : 'For iOS & Android'}
                </span>
              </span>
            </Link>
          </div>
          
          {/* Дополнительная информация */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center bg-[#1c1c2d] px-4 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'ru' ? 'Официальная версия' : 'Official version'}
            </div>
            <div className="flex items-center bg-[#1c1c2d] px-4 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'ru' ? 'Безопасная установка' : 'Secure installation'}
            </div>
            <div className="flex items-center bg-[#1c1c2d] px-4 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'ru' ? 'Эксклюзивные бонусы' : 'Exclusive bonuses'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Мокап устройства */}
      <div className="mt-16 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="bg-gray-800 border-4 border-gray-900 rounded-[40px] p-2 mx-auto w-[280px] h-[560px] shadow-2xl">
            <div className="bg-[#2a2a42] rounded-[32px] w-full h-full overflow-hidden relative">
              {/* Экран приложения */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4e54c8] to-[#8a2be2] flex flex-col items-center justify-center p-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ff424d]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">VAVADA</h3>
                <p className="text-white/80 text-center text-sm">
                  {lang === 'ru' 
                    ? 'Лучшие игровые автоматы' 
                    : 'Top casino slots'}
                </p>
                <div className="mt-8 w-full max-w-[160px] h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">
                    {lang === 'ru' ? 'Загрузка...' : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Эффект отражения */}
          <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[320px] h-32 bg-gradient-to-t from-[#1c1c2d] to-transparent opacity-70"></div>
        </div>
      </div>
    </section>
  );
};