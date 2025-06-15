// utils/pageTemplate.tsx
import { useRouter } from 'next/router';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import Layout from '@/components/Layout';
import UnderDevelopment from '@/components/UnderDevelopment';

interface PageTemplateProps {
  pageKey: 'slots' | 'bonuses' | 'mirror' | 'download' | 'payment' | 'registration';
}

const PageTemplate = ({ pageKey }: PageTemplateProps) => {
  const router = useRouter();
  const { locale } = router;
  
  // Безопасное получение данных
  const getMetaData = () => {
    try {
      const translations = locale === 'ru' ? ru : en;
      
      // Проверяем существование meta и pageKey
      if (translations.meta && translations.meta[pageKey]) {
        return translations.meta[pageKey];
      }
      
      // Возвращаем fallback если что-то пошло не так
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
        description: metaData.description
      }}
    >
      <UnderDevelopment />
    </Layout>
  );
};

export default PageTemplate;