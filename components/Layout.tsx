import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface LayoutProps {
  children: ReactNode;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
    noIndex?: boolean;
    canonical?: string;
  };
}

declare global {
  interface Window {
    gtag: Gtag.Gtag;
    dataLayer: Record<string, unknown>[];
  }
}

// Тип для мета-данных страницы
interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
}

export default function Layout({ children, meta = {} }: LayoutProps) {
  const router = useRouter();
  
  // Используем безопасный доступ к свойствам роутера
  const locale = router.locale || "ru";
  const asPath = router.asPath || "/";
  
  // Приводим тип локализации
  const translations = locale === "ru" ? ru : en;
  
  // Определяем ключ страницы на основе пути
  const pathSegments = asPath.split('/').filter(Boolean);
  const pathKey = pathSegments[0] || 'home';
  
  // Получаем мета-данные для конкретной страницы
  const pageMeta = (translations.meta as Record<string, PageMeta>)[pathKey] || 
                  (translations.meta as Record<string, PageMeta>).home;
  
  // Используем переданные meta, затем мета для страницы, затем дефолтные значения
  const title = meta.title || pageMeta?.title || "Vavada Casino";
  const description = meta.description || pageMeta?.description || "Официальный сайт казино Vavada";
  const keywords = meta.keywords || pageMeta?.keywords || "казино, vavada, игровые автоматы, бонусы";
  
  const siteUrl = "https://vavada-cis.com";
  const cleanPath = asPath.split('?')[0]; // Убираем query-параметры
  
  const canonicalUrl = meta.canonical 
    ? `${siteUrl}${meta.canonical}`
    : `${siteUrl}${cleanPath}`;

  // Google Analytics
  useEffect(() => {
    if (!router.isReady) return;
    
    const handleRouteChange = (url: string) => {
      window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID || "G-YEZGGPKPNP", {
        page_path: url,
      });
    };
    
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${cleanPath}`} />
        <link rel="alternate" hrefLang="ru" href={`${siteUrl}/ru${cleanPath}`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${cleanPath}`} />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}/images/og-share.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={locale === "ru" ? "ru_RU" : "en_US"} />
        
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/images/twitter-share.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        
        {meta.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </Head>

      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
        </>
      )}

      <main className="min-h-screen bg-[#1c1c2d] text-white">{children}</main>
    </>
  );
}