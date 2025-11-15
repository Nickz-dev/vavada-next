// components/Header.tsx
import { FC, useEffect, useContext } from "react";
import Link from "next/link";
import { IdContext } from "@/contexts/IdContext";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface HeaderProps {
  templateData: {
    header: {
      bgColor: string;
      textColor: string;
      hoverTextColor: string;
      brandColor: string;
      brandHoverColor: string;
      buttonBg: string;
      buttonHoverBg: string;
      mobileMenuBg: string;
      brandName: string;
      languages: {
        code: string;
        name: string;
        fullName: string;
      }[];
      activeLink?: string; // Стиль для активной ссылки
    };
  };
  currentPage?: string;
  currentLang: string;
}

const Header: FC<HeaderProps> = ({
  templateData,
  currentPage = "",
  currentLang,
}) => {
  const { header } = templateData;
  const { register, login } = useContext(IdContext);
  const t = currentLang === "ru" ? ru.header : en.header;

  const navLinks = Object.entries(t.nav.links);
  const activeLinkStyle =
    header.activeLink || "border-b-2 border-[#ff424d] font-bold text-white";

  useEffect(() => {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const toggleMenu = () => {
      mobileMenu?.classList.toggle("hidden");
    };

    mobileMenuButton?.addEventListener("click", toggleMenu);

    return () => {
      mobileMenuButton?.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <header className={`${header.bgColor} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav aria-label={t.breadcrumbs.ariaLabel} className="flex items-center text-sm text-white/70">
          <ol className="flex items-center gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href={`/${currentLang}`} itemProp="item" className={`${header.textColor} ${header.hoverTextColor}`}>
                <span itemProp="name">{t.breadcrumbs.home}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-500">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-400">
                {currentPage || t.breadcrumbs.currentPage}
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* Hero + nav */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              {currentLang === "ru" ? "официальный доступ" : "official access"}
            </p>
            <Link
              href={`/${currentLang}`}
              className={`inline-flex items-center gap-2 text-2xl md:text-3xl font-bold ${header.textColor} transition-opacity hover:opacity-80`}
              aria-label={currentLang === "ru" ? "На главную Vavada" : "Go to Vavada homepage"}
            >
              <span>{header.brandName} • Vavada online access</span>
            </Link>
            <p className="text-sm text-white/70 max-w-xl">
              {currentLang === "ru"
                ? "Рабочие зеркала, вход без VPN и свежие бонусы. Мы обновляем ссылки ежедневно и присылаем уведомления о зеркале."
                : "Working mirrors, VPN-free login and fresh bonuses. We update links daily and send mirror notifications."}
            </p>
          </div>

          <nav aria-label={t.nav.ariaLabel} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center text-xs uppercase tracking-[0.4em] text-white/40">
                {currentLang === "ru" ? "меню" : "menu"}
              </div>

              <div className="hidden md:flex items-center gap-6">
                {navLinks.map(([key, text]) => {
                  const isActive = currentPage === text;
                  return (
                    <Link
                      key={key}
                      href={`/${currentLang}/${key === "home" ? "" : key}`}
                      className={`${header.textColor} ${header.hoverTextColor} font-semibold ${
                        isActive ? activeLinkStyle : ""
                      }`}
                    >
                      {text}
                    </Link>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center border-r border-white/20 pr-4 mr-2">
                  {header.languages.map((langItem) => (
                    <Link
                      key={langItem.code}
                      href={`/${langItem.code}`}
                      className={`px-2 py-1 text-sm rounded mx-1 ${
                        currentLang === langItem.code
                          ? "bg-white text-black"
                          : `${header.textColor} ${header.hoverTextColor}`
                      }`}
                      title={langItem.fullName}
                    >
                      {langItem.name}
                    </Link>
                  ))}
                </div>

                <Link href={`/${currentLang}/go/${register}`} className={`${header.textColor} ${header.hoverTextColor}`}>
                  {t.auth.login}
                </Link>
                <Link
                  href={`/${currentLang}/go/${login}`}
                  className={`${header.buttonBg} text-white px-5 py-2 rounded-lg ${header.buttonHoverBg} transition-colors`}
                >
                  {t.auth.register}
                </Link>
              </div>

              <button
                className={`md:hidden ${header.mobileMenuBg} p-2 rounded-lg`}
                id="mobile-menu-button"
                aria-label={t.mobileMenuButton}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            <div className="md:hidden hidden" id="mobile-menu">
              <div className="flex flex-col space-y-4 mt-4 px-2">
                {navLinks.map(([key, text]) => {
                  const isActive = currentPage === text;
                  return (
                    <Link
                      key={key}
                      href={`/${currentLang}/${key === "home" ? "" : key}`}
                      className={`${header.textColor} ${header.hoverTextColor} py-2 ${
                        isActive ? "font-bold text-[#ff424d]" : ""
                      }`}
                    >
                      {text}
                    </Link>
                  );
                })}

                <div className="flex justify-center space-x-2 py-4 border-t border-gray-700">
                  {header.languages.map((langItem) => (
                    <Link
                      key={langItem.code}
                      href={`/${langItem.code}`}
                      className={`px-3 py-1 rounded ${
                        currentLang === langItem.code
                          ? "bg-white text-black"
                          : `${header.textColor} ${header.hoverTextColor} bg-gray-700`
                      }`}
                    >
                      {langItem.fullName}
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <Link
                    href={`/${currentLang}/registration`}
                    className={`block ${header.buttonBg} text-white px-6 py-2 rounded text-center ${header.buttonHoverBg} transition-colors`}
                  >
                    {t.auth.register}
                  </Link>
                  <Link
                    href={`/${currentLang}/login`}
                    className={`block ${header.textColor} ${header.hoverTextColor} text-center mt-4`}
                  >
                    {t.auth.login}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;