export const InstallationGuide = ({ translations, lang }: any) => (
  <section id="installation" className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-10">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.download?.installationTitle || 
        (lang === 'ru' ? 'Как установить приложение' : 'How to install the app')}
    </h2>
    
    <div className="grid md:grid-cols-2 gap-6">
      {/* iOS Guide */}
      <div className="bg-[#1c1c2d] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#ff424d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          {translations.download?.iosGuide?.title || 'Для iOS'}
        </h3>
        <ol className="space-y-3 text-gray-300 pl-5 list-decimal">
          {(translations.download?.iosGuide?.steps || [
            lang === 'ru' 
              ? "Откройте App Store на вашем устройстве" 
              : "Open App Store on your device"
            // ... другие шаги ...
          ]).map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
      
      {/* Android Guide */}
      <div className="bg-[#1c1c2d] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#ff424d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
          {translations.download?.androidGuide?.title || 'Для Android'}
        </h3>
        <ol className="space-y-3 text-gray-300 pl-5 list-decimal">
          {(translations.download?.androidGuide?.steps || [
            lang === 'ru' 
              ? "Скачайте APK-файл с нашего сайта" 
              : "Download APK file from our website"
            // ... другие шаги ...
          ]).map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
    
    <div className="mt-6 bg-[#1c1c2d] rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        {translations.download?.altMethodsTitle || 'Альтернативные способы установки'}
      </h3>
      <p className="text-gray-300 mb-4">
        {translations.download?.altMethodsDescription || 
          'Если у вас возникают проблемы с установкой, попробуйте следующие варианты:'}
      </p>
      <ul className="space-y-3 text-gray-300 pl-5 list-disc">
        {(translations.download?.altMethods || [
          lang === 'ru' 
            ? "Используйте мобильную версию сайта" 
            : "Use the mobile website version"
          // ... другие методы ...
        ]).map((method: string, idx: number) => (
          <li key={idx}>
            <a href="#" className="text-[#ff424d] hover:underline">
              {method}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);