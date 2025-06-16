// utils/pageTemplate.tsx
import { useRouter } from 'next/router';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import Layout from '@/components/Layout';
import UnderDevelopment from '@/components/UnderDevelopment';
import Page404 from '@/components/Page404'; // Добавляем импорт

interface PageTemplateProps {
  pageKey: 'slots' | 'bonuses' | 'mirror' | 'download' | 'payment' | 'registration' | '404';
}

const PageTemplate = ({ pageKey }: PageTemplateProps) => {
  const router = useRouter();
  const { locale } = router;
  
  const getMetaData = () => {
    try {
      const translations = locale === 'ru' ? ru : en;
      
      // Для 404 страницы
      if (pageKey === '404') {
        return {
          title: locale === 'ru' 
            ? "Страница не найдена | Vavada Casino" 
            : "Page not found | Vavada Casino",
          description: locale === 'ru'
            ? "Извините, страница не найдена. Вернитесь на главную страницу Vavada Casino."
            : "Sorry, page not found. Return to the Vavada Casino homepage."
        };
      }
      
      if (translations.meta && translations.meta[pageKey]) {
        return translations.meta[pageKey];
      }
      
      return {
        title: "Vavada Casino",
        description: "Official Vavada casino website"
      };
    } catch (error) {
      console.error("Error loading meta data:", error);
      return {
        title: "Vavada Casino",
        description: "Official Vavada casino website"
      };
    }
  };

  const metaData = getMetaData();

  return (
    <Layout
      meta={{
        title: metaData.title,
        description: metaData.description,
        canonical: `/${locale}/${pageKey}`
      }}
    >
      {pageKey === '404' ? <Page404 /> : <UnderDevelopment />}
    </Layout>
  );
};

export default PageTemplate;