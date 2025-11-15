import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { IdContext } from "@/contexts/IdContext";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useMemo } from "react";
import { HeroPayments } from "@/components/HeroPayments";
import { PaymentMethods } from "@/components/PaymentMethods";
import { WithdrawalMethods } from "@/components/WithdrawalMethods";
import { PaymentLimits } from "@/components/PaymentLimits";
import { HowToPayments } from "@/components/HowToPayments";
import { PaymentFAQ } from "@/components/PaymentFAQ";

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

export default function PaymentsPage({
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
        ? "Платежные методы VAVADA — мгновенные депозиты и вывод без комиссии"
        : "VAVADA payment methods — instant deposits and fee-free payouts",

    description:
      lang === "ru"
        ? "Рассказываем, как пополнить Vavada с карт, крипты и P2P, какие лимиты действуют в 2025 и как получить выплату без блокировок."
        : "How to fund Vavada with cards, crypto, and P2P, 2025 limits overview, and how to withdraw without delays.",

    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "vavada платежи, пополнение vavada, вывод vavada, casino payments"
        : "vavada payments, vavada deposit, vavada withdrawal, casino payments"),

    canonical: `/${lang}/payments`,

    og: {
      title:
        lang === "ru"
          ? "Платежные системы VAVADA"
          : "VAVADA payment systems",
      description:
        lang === "ru"
          ? "Все способы пополнения и вывода в казино VAVADA"
          : "All deposit and withdrawal methods at VAVADA casino",
      image: "/images/og/payments.jpg",
      imageAlt:
        lang === "ru" ? "Платежные методы VAVADA" : "VAVADA Payment Methods",
    },

    twitter: {
      card: "summary_large_image",
      title:
        lang === "ru"
          ? "Платежные системы VAVADA"
          : "VAVADA Payment Systems",
      description:
        lang === "ru"
          ? "Все способы пополнения и вывода в казино VAVADA"
          : "All deposit and withdrawal methods at VAVADA casino",
      image: "/images/twitter/payments.jpg",
    },

    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name:
        lang === "ru"
          ? "Платежные методы VAVADA Casino"
          : "VAVADA Casino Payment Methods",
      description:
        lang === "ru"
          ? "Информация о способах пополнения счета и вывода средств"
          : "Information about deposit and withdrawal methods",
    },
  };

  const paymentsMeta = translations.meta?.payments
    ? {
        ...defaultMeta,
        ...translations.meta.payments,
        og: {
          ...defaultMeta.og,
          ...(translations.meta.payments.og || {}),
        },
        twitter: {
          ...defaultMeta.twitter,
          ...(translations.meta.payments.twitter || {}),
        },
        schema: {
          ...defaultMeta.schema,
          ...(translations.meta.payments.schema || {}),
        },
      }
    : defaultMeta;

  return (
    <IdContext.Provider value={ids}>
      <Layout meta={paymentsMeta}>
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(paymentsMeta.schema)}
          </script>
        </Head>

        <Header
          templateData={templateData}
          currentLang={lang}
          currentPage={
            translations.header?.nav?.links?.payments ||
            (lang === "ru" ? "Платежи" : "Payments")
          }
        />

        <main className="container mx-auto px-4 py-8">
          <article className="prose prose-invert max-w-none">
            <nav className="bg-[#2a2a42] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 overflow-x-auto border border-white/10">
              <ul className="flex flex-nowrap sm:flex-wrap gap-4 min-w-max sm:min-w-0">
                {[
                  {
                    id: "deposit",
                    text:
                      translations.payments?.nav?.deposit ||
                      (lang === "ru" ? "Методы депозита" : "Deposit methods"),
                  },
                  {
                    id: "withdrawal",
                    text:
                      translations.payments?.nav?.withdrawal ||
                      (lang === "ru" ? "Методы вывода" : "Withdrawal methods"),
                  },
                  {
                    id: "limits",
                    text:
                      translations.payments?.nav?.limits ||
                      (lang === "ru" ? "Лимиты 2025" : "2025 limits"),
                  },
                  {
                    id: "howto",
                    text:
                      translations.payments?.nav?.howto ||
                      (lang === "ru" ? "Инструкции" : "How-to"),
                  },
                  {
                    id: "faq",
                    text:
                      translations.payments?.nav?.faq ||
                      (lang === "ru" ? "FAQ по платежам" : "Payments FAQ"),
                  },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm sm:text-base text-[#ff424d] hover:text-[#ff2c39] whitespace-nowrap"
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
                  ? "Служба Vavada использует независимо сертифицированные шлюзы и несколько банковских процессингов, поэтому депозиты проходят даже при локальных блокировках. Если текущий метод недоступен — переключите зеркало в кассе или используйте криптокошелёк."
                  : "Vavada relies on independently certified gateways and several banking processors, so deposits succeed even during local restrictions. If a method is unavailable, switch the mirror inside cashier or use a crypto wallet."}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-gray-200">
                {[
                  lang === "ru"
                    ? "Поддерживаем валюты RUB, KZT, UAH, EUR, USD и USDT с авто-конвертацией."
                    : "Supports RUB, KZT, UAH, EUR, USD and USDT with auto conversion.",
                  lang === "ru"
                    ? "Транзакции защищены 3DS2 и токенизацией; данные карт не хранятся на серверах Vavada."
                    : "Transactions secured by 3DS2 and tokenization; card data never lives on Vavada servers.",
                  lang === "ru"
                    ? "Средний вывод до 15 000 ₽ / 300€ занимает 15 минут, VIP-клиенты получают приоритет."
                    : "Average payout up to €300 hits within 15 minutes; VIP players get priority lanes.",
                  lang === "ru"
                    ? "Каждый вторник действует кэшбек до 10% на депозиты от 5 000 ₽."
                    : "Every Tuesday cashback up to 10% applies to deposits from €50.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff424d]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <HeroPayments templateData={templateData} lang={lang} />
            <PaymentMethods translations={translations} lang={lang} />
            <WithdrawalMethods translations={translations} lang={lang} />
            <PaymentLimits translations={translations} lang={lang} />
            <HowToPayments translations={translations} lang={lang} />
            <PaymentFAQ translations={translations} lang={lang} />
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
