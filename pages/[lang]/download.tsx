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
        ? "Скачать приложение VAVADA — APK, iOS и десктоп‑клиент"
        : "Download VAVADA app — APK, iOS and desktop client",

    description:
      lang === "ru"
        ? "Инструкция по установке официального приложения Vavada, QR-коды, ссылки на App Store и Android APK, список преимуществ и требований."
        : "Guide for installing the official Vavada app, QR codes, App Store & Android APK links, plus feature list and requirements.",

    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "скачать vavada, vavada apk, приложение vavada, мобильное vavada"
        : "download vavada, vavada apk, vavada app, mobile vavada"),

    canonical: `/${lang}/download`,

    og: {
      title:
        lang === "ru"
          ? "Скачать приложение VAVADA"
          : "Download VAVADA App",
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
        lang === "ru"
          ? "Скачать приложение VAVADA"
          : "Download VAVADA App",
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
            <nav className="bg-[#2a2a42] rounded-xl p-4 mb-8 overflow-x-auto border border-white/10">
              <ul className="flex space-x-6 whitespace-nowrap">
                {[
                  {
                    id: "download",
                    text:
                      translations.download?.nav?.download ||
                      (lang === "ru" ? "Скачать" : "Download"),
                  },
                  {
                    id: "features",
                    text:
                      translations.download?.nav?.features ||
                      (lang === "ru" ? "Преимущества" : "Features"),
                  },
                  {
                    id: "installation",
                    text:
                      translations.download?.nav?.installation ||
                      (lang === "ru" ? "Установка" : "Installation"),
                  },
                  {
                    id: "requirements",
                    text:
                      translations.download?.nav?.requirements ||
                      (lang === "ru" ? "Требования" : "Requirements"),
                  },
                  {
                    id: "faq",
                    text:
                      translations.download?.nav?.faq ||
                      (lang === "ru" ? "FAQ по приложению" : "App FAQ"),
                  },
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

            <section className="bg-[#1c1c2d]/60 border border-white/5 rounded-3xl p-6 mb-10">
              <p className="text-sm text-gray-300 leading-relaxed">
                {lang === "ru"
                  ? "Приложение Vavada автоматически выбирает рабочее зеркало, хранит токены входа и отправляет push-уведомления о бонусах. APK подписан и проходит проверку целостности при каждой установке."
                  : "The Vavada app auto-selects a live mirror, stores login tokens, and sends push alerts about bonuses. The APK is signed and receives an integrity check during every install."}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-gray-200">
                {[
                  lang === "ru"
                    ? "Android: включите «Установка из неизвестных источников», затем подтвердите сертификат Vavada."
                    : "Android: enable 'Install from unknown sources', then approve the Vavada certificate.",
                  lang === "ru"
                    ? "iOS: профиль распространяется через TestFlight/Enterprise, обновления приходят по push."
                    : "iOS: profile is delivered via TestFlight/Enterprise and updates land through push.",
                  lang === "ru"
                    ? "Десктопный клиент доступен в .exe и .dmg, поддерживает автообновление зеркал и мульти-окна."
                    : "Desktop client (.exe/.dmg) supports auto mirror updates and multi-window play.",
                  lang === "ru"
                    ? "При смене устройства авторизация переносится через QR-код, без звонков в поддержку."
                    : "When switching devices, scan the QR to migrate your session—no support tickets needed.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff424d]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

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
