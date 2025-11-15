import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

type RequirementItem = {
  label: string;
  value: string;
};

type PlatformRequirements = {
  title: string;
  items: RequirementItem[];
  note?: string;
};

interface SystemRequirementsProps {
  templateData?: {
    systemRequirements?: {
      ios?: PlatformRequirements;
      android?: PlatformRequirements;
      desktop?: PlatformRequirements;
    };
  };
  translations?: any;
  lang: string;
}

const fallbackRequirements = (lang: string) => ({
  ios: {
    title: lang === "ru" ? "Для устройств Apple" : "For Apple devices",
    note:
      lang === "ru"
        ? "Приложение Vavada доступно через TestFlight/Enterprise-профиль."
        : "Vavada app ships via TestFlight/Enterprise profile.",
    items:
      lang === "ru"
        ? [
            { label: "ОС", value: "iOS 12.0 или новее" },
            { label: "Свободное место", value: "150 МБ" },
            { label: "Поддерживаемые устройства", value: "iPhone 7+, iPad 2018+" },
            { label: "Интернет", value: "Wi-Fi или LTE от 5 Мбит/с" },
          ]
        : [
            { label: "OS", value: "iOS 12.0 or newer" },
            { label: "Storage", value: "150 MB free" },
            { label: "Devices", value: "iPhone 7+, iPad 2018+" },
            { label: "Internet", value: "Wi-Fi or LTE 5 Mbps+" },
          ],
  },
  android: {
    title: lang === "ru" ? "Для устройств Android" : "For Android devices",
    note:
      lang === "ru"
        ? "APK устанавливается вручную, ссылки обновляются автоматически."
        : "APK is side-loaded, links auto-update.",
    items:
      lang === "ru"
        ? [
            { label: "ОС", value: "Android 7.0 или новее" },
            { label: "Процессор", value: "Snapdragon 625 / Helio P35" },
            { label: "Свободное место", value: "200 МБ" },
            { label: "Интернет", value: "4G или Wi-Fi от 5 Мбит/с" },
          ]
        : [
            { label: "OS", value: "Android 7.0 or newer" },
            { label: "CPU", value: "Snapdragon 625 / Helio P35" },
            { label: "Storage", value: "200 MB free" },
            { label: "Internet", value: "4G or Wi-Fi 5 Mbps+" },
          ],
  },
  desktop: {
    title: lang === "ru" ? "Для ПК и ноутбуков" : "For PC & laptops",
    note:
      lang === "ru"
        ? "Веб-версия работает в браузерах Chrome, Edge, Safari, Firefox."
        : "Web version runs in Chrome, Edge, Safari, Firefox.",
    items:
      lang === "ru"
        ? [
            { label: "ОС", value: "Windows 10/11, macOS 11+" },
            { label: "Процессор", value: "2 ядра, 2.0 ГГц" },
            { label: "ОЗУ", value: "4 ГБ" },
            { label: "Браузер", value: "Chrome 110+, Safari 15+" },
          ]
        : [
            { label: "OS", value: "Windows 10/11, macOS 11+" },
            { label: "CPU", value: "Dual-core 2.0 GHz" },
            { label: "RAM", value: "4 GB" },
            { label: "Browser", value: "Chrome 110+, Safari 15+" },
          ],
  },
});

export const SystemRequirements: React.FC<SystemRequirementsProps> = ({
  templateData = {},
  translations,
  lang,
}) => {
  const locale = lang === "ru" ? ru : en;
  const downloadTranslations =
    (translations?.download || locale.download || {}) as Record<string, any>;
  const fallback = fallbackRequirements(lang);

  const data = templateData.systemRequirements || {};

  const ios =
    data.ios ||
    (downloadTranslations.appleRequirements
      ? {
          title:
            downloadTranslations.appleRequirements.title || fallback.ios.title,
          items:
            downloadTranslations.appleRequirements.items || fallback.ios.items,
          note: fallback.ios.note,
        }
      : fallback.ios);

  const android =
    data.android ||
    (downloadTranslations.androidRequirements
      ? {
          title:
            downloadTranslations.androidRequirements.title ||
            fallback.android.title,
          items:
            downloadTranslations.androidRequirements.items ||
            fallback.android.items,
          note: fallback.android.note,
        }
      : fallback.android);

  const desktop = data.desktop || fallback.desktop;

  const cards = [ios, android, desktop];

  return (
    <section
      id="requirements"
      className="bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "требования" : "requirements"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {downloadTranslations.requirementsTitle ||
            (lang === "ru"
              ? "Что нужно для установки Vavada"
              : "What you need to run Vavada")}
        </h2>
        <p className="text-sm text-white/70 max-w-3xl">
          {downloadTranslations.requirementsSubtitle ||
            (lang === "ru"
              ? "Поддерживаем iOS, Android и десктопные браузеры. Следите за минимумом по памяти, версии ОС и стабильности сети."
              : "We support iOS, Android, and desktop browsers. Keep an eye on storage, OS version, and stable connectivity.")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-5 space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              {card.note && (
                <p className="text-xs text-white/60 mt-1">{card.note}</p>
              )}
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              {card.items.map((item: RequirementItem, idx: number) => (
                <li
                  key={`${card.title}-${item.label}-${idx}`}
                  className="flex justify-between border-b border-white/5 pb-2"
                >
                  <span>{item.label}</span>
                  <span className="font-medium text-white">{item.value}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};