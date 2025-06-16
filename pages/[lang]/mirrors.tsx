import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { IdContext } from "@/contexts/IdContext";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroMirrors } from "@/components/HeroMirrors";
import { useMemo } from "react";
import { MirrorsList } from "@/components/MirrorsList";
import { HowToUse } from "@/components/HowToUse";
import { MirrorBenefits } from "@/components/MirrorBenefits";
import { MirrorFAQ } from "@/components/MirrorFAQ";

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

export default function MirrorsPage({
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

  const mirrorsMeta = translations.meta?.mirrors || {
    title:
      lang === "ru"
        ? "Рабочее зеркало VAVADA на сегодня 2025 - Актуальные ссылки"
        : "VAVADA Working Mirror Today 2025 - Current Links",
    description:
      lang === "ru"
        ? "Актуальные рабочие зеркала VAVADA Casino на сегодня ⚡ Быстрый доступ к официальному сайту казино ✓ Обновляемые ссылки 2025"
        : "Current working mirrors for VAVADA Casino today ⚡ Quick access to official casino site ✓ Updated links 2025",
    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "зеркало vavada, рабочее зеркало, vavada casino, доступ к казино"
        : "vavada mirror, working mirror, vavada casino, casino access"),
    canonical: `/${lang}/mirrors`,
  };

  return (
    <IdContext.Provider value={ids}>
      <Layout meta={mirrorsMeta}>
        <Head>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name:
                lang === "ru"
                  ? "Актуальные зеркала VAVADA"
                  : "Current VAVADA Mirrors",
              description:
                lang === "ru"
                  ? "Список рабочих зеркал для доступа к VAVADA Casino"
                  : "List of working mirrors for VAVADA Casino access",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "vavada-casino.com" },
                { "@type": "ListItem", position: 2, name: "vavada-casino.xyz" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "vavada-casino.site",
                },
              ],
            })}
          </script>
        </Head>

        <Header
          templateData={templateData}
          currentLang={lang}
          currentPage={
            translations.header?.nav?.links?.mirrors ||
            (lang === "ru" ? "Зеркала" : "Mirrors")
          }
        />
        <main>
          <HeroMirrors templateData={templateData} lang={lang} />
          <div className="container mx-auto px-4 py-8">
            <article className="prose prose-invert max-w-none">
              <h1
                id="top"
                className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
              >
                {lang === "ru"
                  ? "Рабочее зеркало VAVADA на сегодня 2025"
                  : "Working VAVADA Mirror Today 2025"}
              </h1>

              <nav className="bg-[#2a2a42] rounded-xl p-6 mb-8">
                <h2 className="sr-only">
                  {lang === "ru" ? "Навигация по странице" : "Page navigation"}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "mirrors",
                      icon: "🔗",
                      title:
                        translations.mirrors?.nav?.mirrors ||
                        "Актуальные зеркала",
                      desc:
                        translations.mirrors?.nav?.mirrorsDesc ||
                        "Рабочие ссылки на сегодня",
                    },
                    {
                      id: "how-to-use",
                      icon: "📱",
                      title:
                        translations.mirrors?.nav?.howTo || "Как использовать",
                      desc:
                        translations.mirrors?.nav?.howToDesc ||
                        "Инструкция по входу",
                    },
                    {
                      id: "benefits",
                      icon: "⭐",
                      title:
                        translations.mirrors?.nav?.benefits || "Преимущества",
                      desc:
                        translations.mirrors?.nav?.benefitsDesc ||
                        "Почему стоит использовать",
                    },
                    {
                      id: "faq",
                      icon: "❓",
                      title: translations.mirrors?.nav?.faq || "FAQ",
                      desc:
                        translations.mirrors?.nav?.faqDesc ||
                        "Ответы на вопросы",
                    },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block p-4 bg-[#1c1c2d] rounded-lg hover:bg-[#282842] transition-colors"
                      >
                        <span className="text-[#ff424d] text-lg font-medium">
                          {item.icon} {item.title}
                        </span>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.desc}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <MirrorsList translations={translations} lang={lang} />
              <HowToUse translations={translations} lang={lang} />
              <MirrorBenefits translations={translations} lang={lang} />
              <MirrorFAQ translations={translations} lang={lang} />
            </article>
          </div>
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
