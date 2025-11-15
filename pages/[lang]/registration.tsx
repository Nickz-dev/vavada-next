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
        ? "Регистрация в VAVADA — вход, верификация и приветственный бонус"
        : "VAVADA registration — login, verification and welcome bonus",

    description:
      lang === "ru"
        ? "Пошагово показываем, как создать аккаунт Vavada, подтвердить e‑mail и получить 100% бонус + фриспины на актуальном зеркале."
        : "Step-by-step guide to create a Vavada account, verify your email, and grab a 100% bonus + free spins via the live mirror.",

    keywords:
      translations.meta?.home?.keywords ||
      (lang === "ru"
        ? "регистрация vavada, вход vavada, аккаунт vavada, бонус за регистрацию"
        : "vavada registration, vavada login, vavada account, signup bonus"),

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

          <section className="container mx-auto px-4 py-8">
            <div className="bg-[#1c1c2d]/60 border border-white/5 rounded-3xl p-6 space-y-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                {lang === "ru"
                  ? "Регистрация на рабочем зеркале Vavada занимает одну минуту: указываете e‑mail, пароль и валюту, после чего система автоматически закрепляет ваш аккаунт за выбранным регионом. Данные передаются по HTTPS и дублируются на резервном домене."
                  : "Signing up on the live Vavada mirror takes one minute: enter email, password, and currency, then the system anchors your account to the selected region. Data travels over HTTPS and is mirrored to a backup domain."}
              </p>
              <ul className="grid gap-3 md:grid-cols-2 text-sm text-gray-200">
                {[
                  lang === "ru"
                    ? "Можно входить через соцсети — в любой момент переключитесь на e‑mail."
                    : "Social login is available — switch back to email anytime.",
                  lang === "ru"
                    ? "KYC требуется только для выводов от 5 000 ₽ и занимает до 30 минут."
                    : "KYC is required only for payouts above €50 and takes up to 30 minutes.",
                  lang === "ru"
                    ? "Бонус 100% + фриспины активируется автоматически после депозита."
                    : "100% bonus + free spins activate automatically after deposit.",
                  lang === "ru"
                    ? "Если зеркало сменилось, авторизация сохраняется — сессия синхронизируется."
                    : "When a mirror changes your session persists thanks to sync tokens.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff424d]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

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
