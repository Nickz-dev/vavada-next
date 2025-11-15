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
      title: "404 — зеркало Vavada не найдено",
      message:
        "Кажется, ссылка устарела или зеркало Vavada было обновлено. Проверьте актуальные домены, чтобы продолжить регистрацию, вход и игру в Vavada online casino.",
      home: "На актуальную главную"
    },
    en: {
      title: "404 — Vavada mirror not found",
      message:
        "This link is outdated or the Vavada mirror has already switched to a new domain. Return to the homepage to log in, register and keep playing at Vavada online casino.",
      home: "Go to live homepage"
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