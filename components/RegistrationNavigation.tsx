import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface RegistrationNavigationProps {
  lang: string;
  templateData?: any;
}

const RegistrationNavigation: React.FC<RegistrationNavigationProps> = ({
  lang,
  templateData,
}) => {
  const locale = lang === "ru" ? (ru as any) : (en as any);
  const t = locale.registrationNavigation || {};

  const defaultItems = [
    {
      id: "steps",
      icon: "⚡",
      title:
        lang === "ru" ? "Как зарегистрироваться" : "How to register",
      desc:
        lang === "ru"
          ? "Пошаговая инструкция, чтобы создать аккаунт за минуту"
          : "Step-by-step guide to create an account in a minute",
    },
    {
      id: "benefits",
      icon: "🎁",
      title: lang === "ru" ? "Преимущества" : "Benefits",
      desc:
        lang === "ru"
          ? "Почему регистрация через зеркало быстрее и безопаснее"
          : "Why registering via mirror is faster and safer",
    },
    {
      id: "verification",
      icon: "🛡️",
      title: lang === "ru" ? "Верификация" : "Verification",
      desc:
        lang === "ru"
          ? "Когда требуется KYC и как подготовить документы"
          : "When KYC is required and how to prepare documents",
    },
    {
      id: "faq",
      icon: "❓",
      title: lang === "ru" ? "FAQ" : "FAQ",
      desc:
        lang === "ru"
          ? "Отвечаем на популярные вопросы о регистрации"
          : "Answers to popular registration questions",
    },
  ];

  const customItems = templateData?.registrationNavigation?.items;
  const navItems = customItems || t.items || defaultItems;

  const styles = templateData?.registrationNavigation?.styles || {
    nav: "bg-[#15152a]/90 backdrop-blur border border-white/5 rounded-2xl p-4 sticky top-4 z-20",
    list: "grid grid-cols-1 sm:grid-cols-2 gap-3",
    link: "flex items-center gap-3 px-3 py-2 rounded-xl border border-white/5 bg-[#1c1c2d]/80 hover:border-[#ff424d]/60 transition",
    icon: "text-base",
    title: "text-sm font-semibold text-white leading-tight",
    desc: "text-xs text-white/60",
  };

  return (
    <nav className={styles.nav} aria-label="Registration navigation">
      <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">
        {lang === "ru" ? "навигация" : "navigation"}
      </p>
      <ul className={styles.list}>
        {navItems.map(
          (item: any) =>
            item && (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.link}>
                  <span className={styles.icon}>{item.icon || "→"}</span>
                  <span className={styles.title}>
                    {item.title || t[item.id] || item.text}
                  </span>
                  <span className={styles.desc}>
                    {item.desc ||
                      (lang === "ru"
                        ? "Узнайте больше"
                        : "Learn more")}
                  </span>
                </a>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default RegistrationNavigation;