import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Динамически генерируем sitemap
  const pages = ['', '/ru', '/en'];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>https://vavada-cis.com${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

// Пустой компонент
const Sitemap = () => null;
export default Sitemap;