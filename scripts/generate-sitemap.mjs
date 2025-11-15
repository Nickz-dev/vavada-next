import fs from 'fs';
import path from 'path';

const generateSitemap = () => {
  const pages = ['/', '/ru', '/en', '/ru/bonuses', '/en/bonuses', '/ru/registration',  '/en/registration', '/ru/mirrors', '/en/mirrors', '/ru/slots', '/en/slots', '/ru/payments', '/en/payments', '/ru/download' , '/en/download'];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>https://vavada-0001.com${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  // Сохраняем в public вместо .next
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log('Sitemap generated to public/sitemap.xml');
};

generateSitemap();