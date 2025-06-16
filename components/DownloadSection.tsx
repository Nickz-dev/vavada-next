export const DownloadSection = ({ translations, lang }: any) => (
  <section id="download" className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-10">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.download?.sectionTitle || 
        (lang === 'ru' ? 'Скачать приложение VAVADA' : 'Download VAVADA App')}
    </h2>
    
    <div className="grid md:grid-cols-3 gap-8 items-center">
      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          {translations.download?.quickAccess || 'Быстрый доступ'}
        </h3>
        <p className="text-gray-300 mb-4">
          {translations.download?.qrDescription || 
            'Отсканируйте QR-код камерой телефона для мгновенной загрузки'}
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">
              {lang === 'ru' ? 'QR-код' : 'QR Code'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <a 
          href="#" 
          className="block bg-black hover:bg-gray-900 text-white text-center py-3 px-6 rounded-lg transition-colors"
        >
          <span className="font-medium">
            {translations.download?.downloadOptions?.ios?.label || 'App Store'}
          </span>
          <span className="block text-xs text-gray-400 mt-1">
            {translations.download?.downloadOptions?.ios?.description || 
              (lang === 'ru' ? 'Для iPhone и iPad' : 'For iPhone and iPad')}
          </span>
        </a>
        
        <a 
          href="#" 
          className="block bg-[#ff424d] hover:bg-[#ff5a64] text-white text-center py-3 px-6 rounded-lg transition-colors"
        >
          <span className="font-medium">
            {translations.download?.downloadOptions?.android?.label || 'Google Play'}
          </span>
          <span className="block text-xs text-gray-400 mt-1">
            {translations.download?.downloadOptions?.android?.description || 
              (lang === 'ru' ? 'Для Android устройств' : 'For Android devices')}
          </span>
        </a>
        
        <a 
          href="#" 
          className="block border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white text-center py-3 px-6 rounded-lg transition-colors text-sm"
        >
          {translations.download?.downloadOptions?.apk || 
            (lang === 'ru' ? 'Скачать APK напрямую' : 'Download APK directly')}
        </a>
      </div>
    </div>
  </section>
);