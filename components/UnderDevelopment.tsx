// components/UnderDevelopment.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

// Определяем тип для перевода
interface Translation {
  title: string;
  message: string;
  home: string;
}

const UnderDevelopment = () => {
  const router = useRouter();
  const { locale } = router;
  
  // Создаем объект с переводами
  const translations: Record<string, Translation> = {
    ru: {
      title: "Страница в разработке",
      message: "Мы усердно работаем над этой страницей. Пожалуйста, зайдите позже.",
      home: "Вернуться на главную"
    },
    en: {
      title: "Page under development",
      message: "We're working hard on this page. Please check back later.",
      home: "Back to home"
    }
  };

  // Получаем перевод для текущей локали или используем русский по умолчанию
  const t = translations[locale || 'ru'] || translations.ru;

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
      <p className="text-lg mb-8">{t.message}</p>
      <Link 
        href={`/${locale || 'ru'}`} // Гарантируем, что всегда будет валидный URL
        className="bg-gradient-to-r from-[#ff424d] to-[#ff2c39] hover:from-[#ff2c39] hover:to-[#ff424d] text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
      >
        {t.home}
      </Link>
    </div>
  );
};

export default UnderDevelopment;