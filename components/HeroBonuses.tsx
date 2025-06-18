import Link from "next/link";
import { useIds } from "@/contexts/IdContext";

export const HeroBonuses = ({ templateData, lang }: any) => {
  const { register } = useIds();
  
  return (
    <section className="relative bg-gradient-to-b from-[#1c1c2d] to-[#0d0d1a] py-16 md:py-20">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-[#ff424d] opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-[#8a2be2] opacity-15 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#4e54c8] opacity-10 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          {templateData?.bonuses?.hero?.title?.[lang] || 
            (lang === 'ru' ? 'Бонусы VAVADA' : 'VAVADA Bonuses')}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          {templateData?.bonuses?.hero?.subtitle?.[lang] || 
            (lang === 'ru' 
              ? 'Эксклюзивные предложения для игроков' 
              : 'Exclusive offers for players')}
        </p>
        
        {/* Кнопка регистрации */}
        <div className="flex justify-center">
          <Link 
            href={`/${lang}/go/${register}`}
            className="group relative inline-flex items-center px-8 py-4 rounded-full font-bold text-white overflow-hidden"
          >
            {/* Градиентный фон */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Эффект свечения */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff424d] via-[#c642ff] to-[#8a2be2] rounded-full opacity-0 group-hover:opacity-30 blur-md transition-all duration-500"></span>
            
            {/* Текст кнопки */}
            <span className="relative z-10 flex items-center">
              <span className="mr-3">
                {lang === 'ru' ? 'Получить бонус' : 'Get Bonus'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};