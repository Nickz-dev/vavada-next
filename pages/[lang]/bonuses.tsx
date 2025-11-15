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
    title:
      lang === "ru"
        ? "Бонусы VAVADA 2025 — приветственный пакет, кэшбэк и промокоды"
        : "VAVADA bonuses 2025 — welcome bundle, cashback and promo codes",

    description:
      lang === "ru"
        ? "Свежие акции Vavada: 100% бонус + фриспины, еженедельный кэшбэк, рейкбек и уровень лояльности. Рассказываем условия отыгрыша и лимиты."
        : "Latest Vavada promos: 100% bonus + free spins, weekly cashback, rakeback and loyalty tiers. Full wagering rules and limits inside.",

    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "vavada бонусы, промокод vavada, кэшбэк vavada, акции vavada"
        : "vavada bonuses, vavada promo code, vavada cashback, vavada promos"),

    canonical: `/${lang}/bonuses`,

    og: {
      title:
        lang === "ru"
          ? "Бонусы и акции VAVADA"
          : "VAVADA Bonuses & Promotions",
      description:
        lang === "ru"
          ? "Самые выгодные бонусы для игроков казино VAVADA"
          : "The most profitable bonuses for VAVADA casino players",
      image: "/images/og/bonuses.jpg",
      imageAlt:
        lang === "ru" ? "Бонусы VAVADA" : "VAVADA Bonuses"
    },

    twitter: {
      card: "summary_large_image",
      title:
        lang === "ru"
          ? "Бонусы и акции VAVADA"
          : "VAVADA Bonuses & Promotions",
      description:
        lang === "ru"
          ? "Самые выгодные бонусы для игроков казино VAVADA"
          : "The most profitable bonuses for VAVADA casino players",
      image: "/images/twitter/bonuses.jpg"
    },

    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name:
        lang === "ru"
          ? "Бонусы VAVADA Casino"
          : "VAVADA Casino Bonuses",
      description:
        lang === "ru"
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
            <nav className="bg-[#2a2a42] rounded-xl p-6 mb-8 border border-white/10">
              <ul className="flex flex-wrap gap-4">
                {[
                  {
                    id: "welcome-bonus",
                    text:
                      translations.bonuses?.nav?.welcome ||
                      (lang === "ru" ? "Приветственный бонус" : "Welcome bonus")
                  },
                  {
                    id: "loyalty",
                    text:
                      translations.bonuses?.nav?.loyalty ||
                      (lang === "ru" ? "Программа лояльности" : "Loyalty program")
                  },
                  {
                    id: "cashback",
                    text:
                      translations.bonuses?.nav?.cashback ||
                      (lang === "ru" ? "Кэшбэк и рейкбек" : "Cashback & rakeback")
                  },
                  {
                    id: "terms",
                    text:
                      translations.bonuses?.nav?.terms ||
                      (lang === "ru" ? "Правила отыгрыша" : "Wagering rules")
                  }
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
            
            <section className="bg-[#1c1c2d]/60 border border-white/5 rounded-3xl p-6 mb-10">
              <p className="text-sm text-gray-300 leading-relaxed">
                {lang === "ru"
                  ? "Каждый бонус Vavada привязан к уровню аккаунта: новичок получает двойной депозит и фриспины, а VIP — увеличенный кэшбэк и личные промокоды. Мы обновляем условия 1 раз в неделю, поэтому держите страницу в закладках."
                  : "Every Vavada bonus depends on your tier: newcomers get a doubled deposit and spins, while VIP members enjoy boosted cashback and private promo codes. We refresh terms weekly, so keep this page bookmarked."}
              </p>
              <ul className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-gray-200">
                {[
                  lang === "ru"
                    ? "Отыгрыш приветствия — х35, на фриспины — х20."
                    : "Welcome wagering x35, free spin wagering x20.",
                  lang === "ru"
                    ? "Кэшбэк начисляется по вторникам, автоматически падает на счёт без отыгрыша."
                    : "Cashback drops every Tuesday with zero wagering.",
                  lang === "ru"
                    ? "Промокоды активируются в кассе на рабочем зеркале или в приложении."
                    : "Promo codes activate in cashier on a live mirror or inside the app.",
                  lang === "ru"
                    ? "Лимиты бонусов зависят от валюты: до 100 000₽ / €1000."
                    : "Bonus limits depend on currency: up to ₽100 000 / €1000.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff424d]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

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