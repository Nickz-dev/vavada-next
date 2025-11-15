import React from "react";
import Link from "next/link";
import { useIds } from "@/contexts/IdContext";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface RegistrationFormProps {
  templateData?: any;
  lang: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.registrationForm : en.registrationForm;
  const registrationLocale = t as Record<string, any>;
  const { register, login } = useIds();

  const fallback = {
    title:
      lang === "ru"
        ? "Создайте аккаунт Vavada и получите приветственный бонус"
        : "Create your Vavada account and unlock the welcome bonus",
    subtitle:
      lang === "ru"
        ? "Регистрация занимает меньше минуты. Подтвердите email, выберите валюту и получите 100% + фриспины."
        : "Registration takes less than a minute. Verify your email, choose a currency, and grab 100% plus free spins.",
    checklist:
      lang === "ru"
        ? [
            "Переход через актуальное зеркало без VPN",
            "Автосохранение сессии между устройствами",
            "Верификация по запросу (KYC не всегда нужна)",
          ]
        : [
            "Access via live mirror, no VPN needed",
            "Auto session sync across devices",
            "KYC on demand only for big payouts",
          ],
  };

  const styles = templateData?.registrationForm?.styles || {
    container: "bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10",
    input:
      "w-full px-4 py-3 bg-[#1c1c2d] border border-white/5 rounded-xl text-white placeholder:text-white/40 focus:border-[#ff424d] focus:ring-2 focus:ring-[#ff424d]/40 transition",
    button:
      "w-full inline-flex justify-center items-center bg-gradient-to-r from-[#ff424d] to-[#ff2c39] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition",
    label: "block text-sm uppercase tracking-[0.2em] text-white/50 mb-2",
    fieldTitle: "text-sm font-semibold text-white mb-2",
  };

  const formTranslations = templateData?.registrationForm || {};
  const checklist =
    formTranslations.checklist ||
    registrationLocale.checklist ||
    fallback.checklist;
  const titleText =
    registrationLocale.title || formTranslations.title || fallback.title;
  const subtitleText =
    registrationLocale.subtitle ||
    formTranslations.subtitle ||
    fallback.subtitle;

  return (
    <section id="register-form" className="max-w-6xl mx-auto px-4">
      <div className={`${styles.container} space-y-8`}>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            {lang === "ru" ? "регистрация" : "registration"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {titleText}
          </h2>
          <p className="text-sm text-white/70 max-w-3xl">{subtitleText}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className={styles.fieldTitle}>{t.fields.email}</span>
                <input
                  type="email"
                  required
                  className={styles.input}
                  placeholder={t.placeholders.email}
                />
              </div>
              <div>
                <span className={styles.fieldTitle}>{t.fields.phone}</span>
                <input
                  type="tel"
                  className={styles.input}
                  placeholder={t.placeholders.phone}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className={styles.fieldTitle}>{t.fields.password}</span>
                <input
                  type="password"
                  required
                  className={styles.input}
                  placeholder={t.placeholders.password}
                />
              </div>
              <div>
                <span className={styles.fieldTitle}>
                  {t.fields.confirmPassword}
                </span>
                <input
                  type="password"
                  required
                  className={styles.input}
                  placeholder={t.placeholders.confirmPassword}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className={styles.fieldTitle}>{t.fields.currency}</span>
                <select className={styles.input}>
                  {t.currencies.map((currency: string) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className={styles.fieldTitle}>{t.fields.country}</span>
                <select className={styles.input}>
                  {t.countries.map((country: string) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent text-[#ff424d] focus:ring-[#ff424d]"
                />
                <span>
                  {t.agreeTerms}{" "}
                  <a href="#" className="text-[#ff424d] underline">
                    {t.terms}
                  </a>{" "}
                  {t.and}{" "}
                  <a href="#" className="text-[#ff424d] underline">
                    {t.privacy}
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent text-[#ff424d] focus:ring-[#ff424d]"
                />
                <span>{t.receivePromotions}</span>
              </label>
            </div>

            <div className="space-y-2">
              <Link
                href={`/${lang}/go/${register}`}
                className={styles.button}
              >
                {t.submitButton ||
                  (lang === "ru" ? "Создать аккаунт" : "Create account")}
              </Link>
              <p className="text-center text-white/70 text-sm">
                {t.alreadyHaveAccount}{" "}
                <Link
                  href={`/${lang}/go/${login}`}
                  className="text-[#ff424d] underline"
                >
                  {t.login}
                </Link>
              </p>
            </div>
          </form>

          <aside className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {lang === "ru" ? "Почему через зеркало" : "Why via mirror"}
              </h3>
              <p className="text-sm text-white/70">
                {lang === "ru"
                  ? "Мы сразу подключаем вас к актуальному домену Vavada. Доступ без VPN, стабильная авторизация и мгновенный запуск игр."
                  : "We connect you to the live Vavada domain instantly. No VPN, stable login, and instant gameplay."}
              </p>
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              {checklist.map((item: string, idx: number) => (
                <li key={`${item}-${idx}`} className="flex gap-3">
                  <span className="text-[#4CAF50]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-2xl border border-white/10 bg-black/20 text-xs text-white/60 space-y-2">
              <p className="font-semibold uppercase tracking-[0.2em] text-white/50">
                {lang === "ru" ? "Важно" : "Important"}
              </p>
              <p>
                {lang === "ru"
                  ? "Доступ к аккаунту осуществляется через защищённую ссылку `/${lang}/go/${register}`. Все данные шифруются и синхронизируются с основным доменом."
                  : "Account access runs through the protected link `/${lang}/go/${register}`. All data is encrypted and synced with the main domain."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
