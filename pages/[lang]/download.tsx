import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { IdContext } from "@/contexts/IdContext";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useMemo } from "react";
import { HeroDownload } from "@/components/HeroDownload";
import { DownloadSection } from "@/components/DownloadSection";
import { DownloadFeatures } from "@/components/DownloadFeatures";
import { InstallationGuide } from "@/components/InstallationGuide";
import { SystemRequirements } from "@/components/SystemRequirements";
import { DownloadFAQ } from "@/components/DownloadFAQ";

type PageProps = {
  lang: string;
  translations: any;
  templateData: any;
  serverIds?: {
    register: string;
    login: string;
    game: string;
    mirror: string;
    download: string;
    payment: string;
    bonus: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["en", "ru"].map((lang) => ({ params: { lang } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const lang = params?.lang as string;
  const translations = await import(`@/locales/${lang}.json`);
  const templateConfig = await import(`@/public/templates/base/data.json`);

  return {
    props: {
      lang,
      translations: translations.default,
      templateData: templateConfig.default?.templates?.["casino-1"] || {},
      serverIds: {
        register: nanoid(8),
        login: nanoid(8),
        game: nanoid(8),
        mirror: nanoid(8),
        download: nanoid(8),
        payment: nanoid(8),
        bonus: nanoid(8),
      },
    },
  };
};

export default function DownloadPage({
  lang,
  translations = {},
  templateData = {},
  serverIds,
}: PageProps) {
  const ids = useMemo(
    () =>
      serverIds || {
        register: nanoid(8),
        login: nanoid(8),
        game: nanoid(8),
        mirror: nanoid(8),
        download: nanoid(8),
        payment: nanoid(8),
        bonus: nanoid(8),
      },
    [serverIds]
  );

  const defaultMeta = {
    title:
      lang === "ru"
        ? "Скачать приложение VAVADA для iOS и Android"
        : "Download VAVADA App for iOS & Android",

    description:
      lang === "ru"
        ? "Официальное приложение казино VAVADA для мобильных устройств. Скачайте сейчас и получите эксклюзивные бонусы!"
        : "Official VAVADA casino app for mobile devices. Download now and get exclusive bonuses!",

    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "скачать vavada, приложение казино, мобильное казино, vavada apk"
        : "download vavada, casino app, mobile casino, vavada apk"),

    canonical: `/${lang}/download`,

    og: {
      title:
        lang === "ru" ? "Скачать приложение VAVADA" : "Download VAVADA App",
      description:
        lang === "ru"
          ? "Лучшее мобильное казино с лицензионными играми и быстрыми выплатами"
          : "Top mobile casino with licensed games and fast payouts",
      image: "/images/og/download.jpg",
      imageAlt:
        lang === "ru" ? "Приложение VAVADA Casino" : "VAVADA Casino App",
    },

    twitter: {
      card: "summary_large_image",
      title:
        lang === "ru" ? "Скачать приложение VAVADA" : "Download VAVADA App",
      description:
        lang === "ru"
          ? "Лучшее мобильное казино с лицензионными играми и быстрыми выплатами"
          : "Top mobile casino with licensed games and fast payouts",
      image: "/images/twitter/download.jpg",
    },

    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: lang === "ru" ? "Приложение VAVADA Casino" : "VAVADA Casino App",
      operatingSystem: "ANDROID, IOS",
      applicationCategory: "GameApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  const downloadMeta = translations.meta?.download
    ? {
        ...defaultMeta,
        ...translations.meta.download,
        og: {
          ...defaultMeta.og,
          ...(translations.meta.download.og || {}),
        },
        twitter: {
          ...defaultMeta.twitter,
          ...(translations.meta.download.twitter || {}),
        },
        schema: {
          ...defaultMeta.schema,
          ...(translations.meta.download.schema || {}),
        },
      }
    : defaultMeta;

  return (
    <IdContext.Provider value={ids}>
      <Layout meta={downloadMeta}>
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(downloadMeta.schema)}
          </script>
        </Head>

        <Header
          templateData={templateData}
          currentLang={lang}
          currentPage={
            translations.header?.nav?.links?.download ||
            (lang === "ru" ? "Скачать" : "Download")
          }
        />

        <main className="container mx-auto px-4 py-8">
          <article className="prose prose-invert max-w-none">
            <nav className="bg-[#2a2a42] rounded-xl p-4 mb-8 overflow-x-auto">
              <ul className="flex space-x-6 whitespace-nowrap">
                {[
                  {
                    id: "download",
                    text: translations.download?.nav?.download || "Скачать",
                  },
                  {
                    id: "features",
                    text:
                      translations.download?.nav?.features || "Преимущества",
                  },
                  {
                    id: "installation",
                    text:
                      translations.download?.nav?.installation || "Установка",
                  },
                  {
                    id: "requirements",
                    text:
                      translations.download?.nav?.requirements || "Требования",
                  },
                  { id: "faq", text: translations.download?.nav?.faq || "FAQ" },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`font-medium hover:text-white transition-colors ${
                        item.id === "download"
                          ? "text-[#ff424d] hover:text-[#ff5a64]"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <HeroDownload templateData={templateData} lang={lang} />
            <DownloadSection translations={translations} lang={lang} />
            <DownloadFeatures translations={translations} lang={lang} />
            <InstallationGuide translations={translations} lang={lang} />
            <SystemRequirements translations={translations} lang={lang} />
            <DownloadFAQ translations={translations} lang={lang} />
          </article>
        </main>

        <Footer
          templateData={templateData}
          lang={lang}
          footerData={translations.footer}
        />
      </Layout>
    </IdContext.Provider>
  );
}
