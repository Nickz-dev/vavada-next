import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Всегда редиректим на русский язык
    router.push('/ru');
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
