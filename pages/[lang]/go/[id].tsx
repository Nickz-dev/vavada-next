import { GetServerSidePropsContext } from 'next';

export default function RedirectPage() {
  return null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // Получаем параметры из URL
  const lang = ctx.params?.lang || 'ru';
  const id = ctx.params?.id;

  // Формируем целевой URL (замените на ваш домен)
  const targetUrl = `https://vavada.c-wn.ru?lang=${lang}&ref=${id || ''}`;
  
  // Для теста можно использовать:
  // const targetUrl = `/debug?lang=${lang}&ref=${id}`;

  console.log('Redirecting to:', targetUrl);

  return {
    redirect: {
      destination: targetUrl,
      permanent: false,
    },
  };
}