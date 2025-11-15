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
        payment: nanoid(8),
        bonus: nanoid(8),
      },
    [serverIds]
  );

  const mirrorsMeta = translations.meta?.mirrors || {
    title:
      lang === "ru"
        ? "Рабочее зеркало VAVADA 2025 — вход без VPN и актуальные ссылки"
        : "VAVADA mirror 2025 — VPN-free login and fresh links",
    description:
      lang === "ru"
        ? "Собрали живые зеркала Vavada, автоматическое обновление доменов, инструкция по обходу блокировок и советы по мобильному входу."
        : "Live Vavada mirrors with automatic domain rotation, block-bypass guide, and mobile login tips.",
    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "vavada зеркало, рабочее зеркало vavada, вход vavada, доступ vavada casino"
        : "vavada mirror, working vavada mirror, vavada login, vavada access"),
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
              <h2
                id="top"
                className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
              >
                {lang === "ru"
                  ? "Рабочее зеркало VAVADA на сегодня 2025"
                  : "Working VAVADA Mirror Today 2025"}
              </h2>

              <nav className="bg-[#2a2a42] rounded-xl p-6 mb-8 border border-white/10">
                <h2 className="sr-only">
                  {lang === "ru" ? "Навигация по странице" : "Page navigation"}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "mirrors",
                      icon: "🛰️",
                      title:
                        translations.mirrors?.nav?.mirrors ||
                        (lang === "ru" ? "Каталог зеркал" : "Mirror catalog"),
                      desc:
                        translations.mirrors?.nav?.mirrorsDesc ||
                        (lang === "ru"
                          ? "Живые домены и резервные URL"
                          : "Live domains and backup URLs"),
                    },
                    {
                      id: "how-to-use",
                      icon: "🧭",
                      title:
                        translations.mirrors?.nav?.howTo ||
                        (lang === "ru" ? "Гид по обходу" : "Bypass guide"),
                      desc:
                        translations.mirrors?.nav?.howToDesc ||
                        (lang === "ru"
                          ? "Пошаговая инструкция входа без VPN"
                          : "Step-by-step VPN-free login"),
                    },
                    {
                      id: "benefits",
                      icon: "⚡",
                      title:
                        translations.mirrors?.nav?.benefits ||
                        (lang === "ru" ? "Преимущества зеркал" : "Mirror perks"),
                      desc:
                        translations.mirrors?.nav?.benefitsDesc ||
                        (lang === "ru"
                          ? "Скорость, защита и безостановочный доступ"
                          : "Speed, protection, uninterrupted access"),
                    },
                    {
                      id: "faq",
                      icon: "❓",
                      title: translations.mirrors?.nav?.faq || "FAQ",
                      desc:
                        translations.mirrors?.nav?.faqDesc ||
                        (lang === "ru"
                          ? "Ответы по зеркалам, VPN и безопасности"
                          : "Answers about mirrors, VPN and safety"),
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

              <section className="bg-[#1c1c2d]/60 border border-white/5 rounded-3xl p-6 mb-10">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {lang === "ru"
                    ? "Мы синхронизируем зеркала Vavada с частотой 3–5 минут, проверяем SSL, пинг и пропускную способность из РФ, стран СНГ и ЕС. Если домен попадает под блокировку, резерв сразу уходит в рассылку и в этот список."
                    : "We sync Vavada mirrors every 3–5 minutes, check SSL, ping, and throughput from CIS, EU, and LATAM vantage points. When a domain is blocked, a backup goes to the newsletter and to this list instantly."}
                </p>
                <ul className="mt-4 grid gap-3 text-sm text-gray-200 md:grid-cols-2">
                  {[
                    lang === "ru"
                      ? "Вход без VPN и сохранённые сессии"
                      : "VPN-free login with preserved sessions",
                    lang === "ru"
                      ? "Работа на десктопе, iOS, Android и смарт‑TV"
                      : "Works on desktop, iOS, Android, smart TV",
                    lang === "ru"
                      ? "Push-уведомления о смене домена и кэшбэке"
                      : "Push alerts about domain changes and cashback",
                    lang === "ru"
                      ? "Поддержка 24/7 и резервные платежные шлюзы"
                      : "24/7 support and backup payment gateways",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff424d]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

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
