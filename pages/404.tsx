// pages/404.tsx
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Page404 from '@/components/Page404';

const Custom404 = () => {
  const router = useRouter();
  const { locale } = router;
  
  // Мета-данные для 404 страницы
  const meta = {
    title: locale === 'ru' 
      ? "Страница не найдена | Vavada Casino" 
      : "Page not found | Vavada Casino",
    description: locale === 'ru'
      ? "Извините, страница не найдена. Вернитесь на главную страницу Vavada Casino."
      : "Sorry, page not found. Return to the Vavada Casino homepage.",
    canonical: "/404"
  };

  return (
    <Layout meta={meta}>
      <Page404 />
    </Layout>
  );
};

export default Custom404;