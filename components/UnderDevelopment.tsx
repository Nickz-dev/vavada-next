import Link from "next/link";
import { useRouter } from "next/router";

type PlaceholderContent = {
  title: string;
  message: string;
  hint: string;
  checklist: string[];
  button: string;
  buttonSecondary: string;
};

const fallbackContent = (locale?: string): PlaceholderContent => {
  if (locale === "en") {
    return {
      title: "This page is almost ready",
      message:
        "We’re refreshing the content to match the new Vavada domain. The section will be live after we add mirror links and bonus copy.",
      hint: "Estimated publish window: within the next 48 hours.",
      checklist: [
        "SEO text rewritten for brand queries",
        "Fresh mirror URLs attached",
        "Bonus cards and CTA updated",
      ],
      button: "Go to homepage",
      buttonSecondary: "See current bonuses",
    };
  }

  return {
    title: "Страница почти готова",
    message:
      "Мы обновляем контент под новый домен Vavada. Раздел появится сразу после добавления зеркал и бонусов.",
    hint: "Ориентировочная готовность: в течение 48 часов.",
    checklist: [
      "SEO-текст переписан под брендовые запросы",
      "Добавляем свежие зеркала и ссылки",
      "Настраиваем карточки бонусов и CTA",
    ],
    button: "На главную",
    buttonSecondary: "Смотреть бонусы",
  };
};

const UnderDevelopment = () => {
  const { locale = "ru" } = useRouter();
  const content = fallbackContent(locale);

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#100f1e] to-[#1b1a2f] py-16 px-4">
      <div className="max-w-2xl w-full bg-[#15152a]/90 border border-white/5 rounded-3xl p-8 space-y-6 text-white shadow-2xl backdrop-blur">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            {locale === "ru" ? "обновление" : "update"}
          </p>
          <h1 className="text-3xl font-bold">{content.title}</h1>
          <p className="text-white/80">{content.message}</p>
          <p className="text-sm text-white/60 italic">{content.hint}</p>
        </div>

        <ul className="space-y-3 text-sm text-white/80">
          {content.checklist.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-[#FFD54F]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${locale}`}
            className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-[#ff424d] to-[#ff2c39] py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {content.button}
          </Link>
          <Link
            href={`/${locale}/bonuses`}
            className="flex-1 inline-flex items-center justify-center border border-white/20 py-3 rounded-xl font-semibold text-white/80 hover:text-white hover:border-white/40 transition"
          >
            {content.buttonSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UnderDevelopment;