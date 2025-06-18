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
        ? "Платежные методы в VAVADA | Пополнение и вывод средств"
        : "Payment Methods at VAVADA | Deposits & Withdrawals",

    description:
      lang === "ru"
        ? "Безопасные и быстрые способы пополнения счета и вывода выигрышей в казино VAVADA. Все платежные методы с лимитами и комиссиями."
        : "Secure and fast deposit and withdrawal methods at VAVADA casino. All payment options with limits and fees.",

    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "платежи vavada, пополнение счета, вывод средств, методы оплаты"
        : "vavada payments, deposit, withdrawal, payment methods"),

    canonical: `/${lang}/payments`,

    og: {
      title:
        lang === "ru" ? "Платежные системы VAVADA" : "VAVADA Payment Systems",
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
        lang === "ru" ? "Платежные системы VAVADA" : "VAVADA Payment Systems",
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
            <nav className="bg-[#2a2a42] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 overflow-x-auto">
              <ul className="flex flex-nowrap sm:flex-wrap gap-4 min-w-max sm:min-w-0">
                {[
                  {
                    id: "deposit",
                    text:
                      translations.payments?.nav?.deposit || "Методы депозита",
                  },
                  {
                    id: "withdrawal",
                    text:
                      translations.payments?.nav?.withdrawal || "Методы вывода",
                  },
                  {
                    id: "limits",
                    text: translations.payments?.nav?.limits || "Лимиты",
                  },
                  {
                    id: "howto",
                    text: translations.payments?.nav?.howto || "Инструкции",
                  },
                  { id: "faq", text: translations.payments?.nav?.faq || "FAQ" },
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
