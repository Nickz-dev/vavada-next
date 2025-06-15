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

  // Определяем активный стиль
  const activeLinkStyle = header.activeLink || "border-b-2 border-[#ff424d] font-bold";

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
    <header className={`${header.bgColor} shadow-lg p-6`}>
      <div className="max-w-7xl mx-auto ">
        {/* Хлебные крошки */}
        <nav aria-label={t.breadcrumbs.ariaLabel} className="mb-6">
          <ol
            className="flex text-sm"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href={`/${currentLang}`}
                itemProp="item"
                className={`${header.textColor} ${header.hoverTextColor}`}
              >
                <span itemProp="name">{t.breadcrumbs.home}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <span itemProp="name" className="text-gray-400">
                {currentPage || t.breadcrumbs.currentPage}
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* Основная навигация */}
        <nav className="mb-6" aria-label={t.nav.ariaLabel}>
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
              <Link href={`/${currentLang}`} className="flex items-center mr-6">
                <div
                  className={`text-2xl font-bold ${header.brandColor} ${header.brandHoverColor}`}
                >
                  {header.brandName}
                </div>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                {Object.entries(t.nav.links).map(([key, text]) => {
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
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Переключатель языков */}
              <div className="flex items-center border-r border-gray-600 pr-4 mr-2">
                {header.languages.map((langItem) => (
                  <Link
                    key={langItem.code}
                    href={`/${langItem.code}`}
                    className={`px-2 py-1 text-sm rounded mx-1 ${
                      currentLang === langItem.code
                        ? "bg-blue-500 text-white"
                        : `${header.textColor} ${header.hoverTextColor}`
                    }`}
                    title={langItem.fullName}
                  >
                    {langItem.name}
                  </Link>
                ))}
              </div>

              <Link
                href={`/${currentLang}/go/${register}`}
                className={`${header.textColor} ${header.hoverTextColor}`}
              >
                {t.auth.login}
              </Link>
              <Link
                href={`/${currentLang}/go/${login}`}
                className={`${header.buttonBg} text-white px-6 py-2 rounded ${header.buttonHoverBg} transition-colors`}
              >
                {t.auth.register}
              </Link>
            </div>

            <button
              className={`md:hidden ${header.mobileMenuBg} p-2 rounded-lg`}
              id="mobile-menu-button"
              aria-label={t.mobileMenuButton}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile меню */}
          <div className="md:hidden hidden" id="mobile-menu">
            <div className="flex flex-col space-y-4 mt-4 px-2">
              {Object.entries(t.nav.links).map(([key, text]) => {
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

              {/* Переключатель языков для мобильной версии */}
              <div className="flex justify-center space-x-2 py-4 border-t border-gray-700">
                {header.languages.map((langItem) => (
                  <Link
                    key={langItem.code}
                    href={`/${langItem.code}`}
                    className={`px-3 py-1 rounded ${
                      currentLang === langItem.code
                        ? "bg-blue-500 text-white"
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
    </header>
  );
};

export default Header;