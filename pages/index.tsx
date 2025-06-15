import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Проверяем сохраненный язык в куках/локалсторадж
    const savedLang = getCookie("preferred_lang");
    // Определяем язык браузера (только на клиенте)
    const browserLang =
      typeof window !== "undefined" ? navigator.language.split("-")[0] : "ru";
    const supportedLangs = ["ru", "en"];

    // Исправленная строка с правильными скобками
    const defaultLang =
      savedLang || (supportedLangs.includes(browserLang) ? browserLang : "ru");
    router.push(`/${defaultLang}`);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Спиннер */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

        {/* Текст (опционально) */}
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
}
