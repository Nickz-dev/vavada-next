// components/Page404.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Translation {
  title: string;
  message: string;
  home: string;
}

const Page404 = () => {
  const router = useRouter();
  const { locale } = router;
  
  const translations: Record<string, Translation> = {
    ru: {
      title: "Страница не найдена",
      message: "К сожалению, запрашиваемая страница не существует или была перемещена.",
      home: "Вернуться на главную"
    },
    en: {
      title: "Page not found",
      message: "Sorry, the page you are looking for doesn't exist or has been moved.",
      home: "Back to home"
    }
  };

  const t = translations[locale || 'ru'] || translations.ru;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="mb-8">
        <div className="text-9xl font-bold text-[#4f46e5]">404</div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t.title}</h1>
      <p className="text-xl text-gray-300 max-w-2xl mb-10">{t.message}</p>
      
      <Link 
        href={`/${locale || 'ru'}`}
        className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#4f46e5] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {t.home}
      </Link>
    </div>
  );
};

export default Page404;