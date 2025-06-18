import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { IdContext } from "@/contexts/IdContext";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useMemo } from "react";
import { HeroBonuses } from "@/components/HeroBonuses";
import { WelcomeBonus } from "@/components/WelcomeBonus";
import { LoyaltyProgram } from "@/components/LoyaltyProgram";
import { CashbackSection } from "@/components/CashbackSection";
import { BonusTerms } from "@/components/BonusTerms";

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

export default function BonusesPage({
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
    title: lang === "ru" 
      ? "Бонусы VAVADA | Приветственный пакет и кэшбэк" 
      : "VAVADA Bonuses | Welcome Package & Cashback",
    
    description: lang === "ru" 
      ? "Эксклюзивные бонусы и акции казино VAVADA. Приветственный пакет 100% до 100 000₽ + фриспины, кэшбэк и программа лояльности." 
      : "Exclusive casino bonuses at VAVADA. 100% welcome bonus up to €1000 + free spins, cashback and loyalty program.",
    
    keywords: translations.meta?.home?.keywords || 
             (lang === "ru" 
               ? "бонусы vavada, приветственный бонус, фриспины, кэшбэк" 
               : "vavada bonuses, welcome bonus, free spins, cashback"),
    
    canonical: `/${lang}/bonuses`,
    
    og: {
      title: lang === "ru" 
        ? "Бонусы и акции VAVADA" 
        : "VAVADA Bonuses & Promotions",
      description: lang === "ru" 
        ? "Самые выгодные бонусы для игроков казино VAVADA" 
        : "The most profitable bonuses for VAVADA casino players",
      image: "/images/og/bonuses.jpg",
      imageAlt: lang === "ru" 
        ? "Бонусы VAVADA" 
        : "VAVADA Bonuses"
    },
    
    twitter: {
      card: "summary_large_image",
      title: lang === "ru" 
        ? "Бонусы и акции VAVADA" 
        : "VAVADA Bonuses & Promotions",
      description: lang === "ru" 
        ? "Самые выгодные бонусы для игроков казино VAVADA" 
        : "The most profitable bonuses for VAVADA casino players",
      image: "/images/twitter/bonuses.jpg"
    },
    
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: lang === "ru" 
        ? "Бонусы VAVADA Casino" 
        : "VAVADA Casino Bonuses",
      description: lang === "ru" 
        ? "Эксклюзивные бонусы и акции для игроков" 
        : "Exclusive bonuses and promotions for players"
    }
  };

  const bonusesMeta = translations.meta?.bonuses 
    ? {
        ...defaultMeta,
        ...translations.meta.bonuses,
        og: {
          ...defaultMeta.og,
          ...(translations.meta.bonuses.og || {})
        },
        twitter: {
          ...defaultMeta.twitter,
          ...(translations.meta.bonuses.twitter || {})
        },
        schema: {
          ...defaultMeta.schema,
          ...(translations.meta.bonuses.schema || {})
        }
      }
    : defaultMeta;

  return (
    <IdContext.Provider value={ids}>
      <Layout meta={bonusesMeta}>
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(bonusesMeta.schema)}
          </script>
        </Head>
        
        <Header
          templateData={templateData}
          currentLang={lang}
          currentPage={
            translations.header?.nav?.links?.bonuses || 
            (lang === "ru" ? "Бонусы" : "Bonuses")
          }
        />
        
        <main className="container mx-auto px-4 py-8">
          <article className="prose prose-invert max-w-none">  
            <nav className="bg-[#2a2a42] rounded-xl p-6 mb-8">
              <ul className="flex flex-wrap gap-4">
                {[
                  { id: "welcome-bonus", text: translations.bonuses?.nav?.welcome || "Приветственный бонус" },
                  { id: "loyalty", text: translations.bonuses?.nav?.loyalty || "Программа лояльности" },
                  { id: "cashback", text: translations.bonuses?.nav?.cashback || "Кэшбэк" },
                  { id: "terms", text: translations.bonuses?.nav?.terms || "Правила и условия" }
                ].map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-[#ff424d] hover:text-[#ff2c39]"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <HeroBonuses templateData={templateData} lang={lang} />
            <WelcomeBonus translations={translations} lang={lang} />
            <LoyaltyProgram translations={translations} lang={lang} />
            <CashbackSection translations={translations} lang={lang} />
            <BonusTerms translations={translations} lang={lang} />
          </article>
        </main>
        
        <Footer templateData={templateData} lang={lang} footerData={translations.footer} />
      </Layout>
    </IdContext.Provider>
  );
}