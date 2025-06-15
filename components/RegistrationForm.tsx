// components/RegistrationForm.tsx
import React from "react";
import Link from "next/link";
import { useIds } from "@/contexts/IdContext";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface RegistrationFormProps {
  templateData: any;
  lang: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  templateData,
  lang,
}) => {
  const t = lang === "ru" ? ru.registrationForm : en.registrationForm;
  const { register } = useIds();
  const { login } = useIds();

  const defaultStyles = {
    input:
      "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    button:
      "w-full bg-gradient-to-r from-[#ff424d] to-[#ff2c39] hover:from-[#ff2c39] hover:to-[#ff424d] text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl",
  };

  const styles = templateData?.registrationForm?.styles || defaultStyles;

  return (
    <section id="register-form" className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-10">{t.title}</h2>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                {t.fields.email}
              </label>
              <input
                type="email"
                required
                className={styles.input}
                placeholder={t.placeholders.email}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t.fields.phone}
              </label>
              <input
                type="tel"
                className={styles.input}
                placeholder={t.placeholders.phone}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                {t.fields.password}
              </label>
              <input
                type="password"
                required
                className={styles.input}
                placeholder={t.placeholders.password}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t.fields.confirmPassword}
              </label>
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
              <label className="block text-gray-700 mb-2">
                {t.fields.currency}
              </label>
              <select className={styles.input}>
                {t.currencies.map((currency: string) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t.fields.country}
              </label>
              <select className={styles.input}>
                {t.countries.map((country: string) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 text-gray-700">
              {t.agreeTerms}{" "}
              <a href="#" className="text-blue-600 hover:underline">
                {t.terms}
              </a>{" "}
              {t.and}{" "}
              <a href="#" className="text-blue-600 hover:underline">
                {t.privacy}
              </a>
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="promotions"
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="promotions" className="ml-2 text-gray-700">
              {t.receivePromotions}
            </label>
          </div>

          <div className="w-full flex justify-center">
            <Link
              href={`/${lang}/go/${register}`}
              className={`${styles.button} flex justify-center items-center`}
            >
              {t.submitButton}
            </Link>
          </div>
          <p className="text-center text-gray-600">
            {t.alreadyHaveAccount}{" "}
           <Link
              href={`/${lang}/go/${login}`}
              className="flex  text-blue-500 justify-center items-center"
            >
              {t.login}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
