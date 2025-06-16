import { GetStaticPaths, GetStaticProps } from "next";
import { IdContext } from "@/contexts/IdContext";
import Head from "next/head";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CurrentBonuses } from "@/components/CurrentBonuses";
import { MainFeatures } from "@/components/MainFeatures";
import { PopularGames } from "@/components/PopularGames";
import { LiveWinnersStats } from "@/components/LiveWinnersStats";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SecurityLicenses } from "@/components/SecurityLicenses";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useMemo } from "react";

type PageProps = {
  lang: string;
  translations: any;
  templateData: any;
  serverIds: {
    register: string;
    login: string;
    game: string;
    mirror: string;
    download: string;
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
      },
    },
  };
};

export default function HomePage({
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
        mirror: nanoid(8), // Добавлено
        download: nanoid(8), // Добавлено
      },
    [serverIds]
  );

  // Получаем мета-данные для главной страницы
  const homeMeta = translations.meta?.home || {
    title: "Vavada Casino",
    description: "Official Vavada casino website",
    keywords: "casino, vavada, slots, bonuses, roulette",
  };

  // Добавляем канонический URL
  const meta = {
    ...homeMeta,
    canonical: `/${lang}`,
  };

  return (
    <IdContext.Provider value={ids}>
      <Layout meta={meta}>
        <Head>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Casino",
              name: "Vavada Casino",
              url: "https://vavada-cis.com",
              logo: "https://vavada-cis.com/logo.png",
              sameAs: [
                "https://facebook.com/vavada",
                "https://twitter.com/vavada",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-800-000-00-00",
                contactType: "Customer service",
              },
            })}
          </script>
        </Head>

        <Header
          templateData={templateData}
          currentLang={lang}
          currentPage={translations.header?.nav?.links?.home || "Главная"}
        />
        <main>
          <Hero templateData={templateData} lang={lang} />
          <CurrentBonuses
            templateData={templateData}
            lang={lang}
            bonusesData={translations.bonusesSection}
          />
          <MainFeatures templateData={templateData} lang={lang} />
          <PopularGames templateData={templateData} lang={lang} />
          <LiveWinnersStats templateData={templateData} lang={lang} />
          <WhyChooseUs templateData={templateData} lang={lang} />
          <SecurityLicenses templateData={templateData} lang={lang} />
          <ReviewsSection templateData={templateData} lang={lang} />
          <FAQSection templateData={templateData} lang={lang} />
          <CTASection templateData={templateData} lang={lang} />
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
