import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { IdContext } from "@/contexts/IdContext";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import { HeroSignUp } from "@/components/HeroSignUp";
import { useMemo } from "react";
import RegistrationNavigation from "@/components/RegistrationNavigation";
import RegistrationSteps from "@/components/RegistrationSteps";
import VerificationSection from "@/components/VerificationSection";
import RegistrationFAQ from "@/components/RegistrationFAQ";

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

export default function RegistrationPage({
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

  // Получаем мета-данные для страницы регистрации
  const registrationMeta = translations.meta?.registration || {
    title:
      lang === "ru"
        ? "Регистрация в Vavada Casino | Создать аккаунт"
        : "Register at Vavada Casino | Create Account",

    description:
      lang === "ru"
        ? "Зарегистрируйтесь в Vavada Casino и получите бонус 100% до 100 000₽ + 100 фриспинов. Быстрая регистрация за 1 минуту."
        : "Sign up at Vavada Casino and get 100% bonus up to €1000 + 100 free spins. Quick registration in 1 minute.",

    // Используем общие ключевые слова из основного meta
    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "казино, vavada, регистрация, создать аккаунт, бонус за регистрацию"
        : "casino, vavada, register, create account, sign up bonus"),

    // Добавляем канонический URL
    canonical: `/${lang}/registration`,
  };

  return (
    <IdContext.Provider value={ids}>
      <Layout meta={registrationMeta}>
        <Head>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name:
                lang === "ru"
                  ? "Регистрация в Vavada Casino"
                  : "Registration at Vavada Casino",
              description:
                lang === "ru"
                  ? "Пошаговая инструкция по регистрации в казино"
                  : "Step-by-step registration guide",
              step: [
                {
                  "@type": "HowToStep",
                  name: lang === "ru" ? "Заполнение данных" : "Fill in details",
                  text:
                    lang === "ru"
                      ? "Введите email, пароль и выберите валюту"
                      : "Enter email, password and select currency",
                },
                {
                  "@type": "HowToStep",
                  name:
                    lang === "ru"
                      ? "Подтверждение email"
                      : "Email verification",
                  text:
                    lang === "ru"
                      ? "Подтвердите свою электронную почту"
                      : "Confirm your email address",
                },
                {
                  "@type": "HowToStep",
                  name: lang === "ru" ? "Активация бонуса" : "Bonus activation",
                  text:
                    lang === "ru"
                      ? "Пополните счет и получите бонус"
                      : "Make a deposit and get your bonus",
                },
              ],
            })}
          </script>
        </Head>

        <Header
          templateData={templateData}
          currentLang={lang}
          currentPage={
            translations.header?.nav?.links?.registration ||
            (lang === "ru" ? "Регистрация" : "Registration")
          }
        />
        <main>
          <HeroSignUp templateData={templateData} lang={lang} />
          <RegistrationNavigation templateData={templateData} lang={lang} />
          <RegistrationSteps templateData={templateData} lang={lang} />
          <RegistrationForm templateData={templateData} lang={lang} />
          <VerificationSection templateData={templateData} lang={lang} />
          <RegistrationFAQ templateData={templateData} lang={lang} />
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
