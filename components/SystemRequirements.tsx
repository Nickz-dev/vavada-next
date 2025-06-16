export const SystemRequirements = ({ translations, lang }: any) => (
  <section id="requirements" className="bg-[#2a2a42] rounded-xl p-6 md:p-8 mb-10">
    <h2 className="text-2xl font-bold text-white mb-6">
      {translations.download?.requirementsTitle || 'Системные требования'}
    </h2>
    
    <div className="grid md:grid-cols-2 gap-6">
      {/* Apple Requirements */}
      <div className="bg-[#1c1c2d] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          {translations.download?.appleRequirements?.title || 'Для устройств Apple'}
        </h3>
        <ul className="space-y-3 text-gray-300">
          {(translations.download?.appleRequirements?.items || [
            { label: "Операционная система:", value: "iOS 12.0 и новее" }
            // ... другие элементы ...
          ]).map((item: any, idx: number) => (
            <li key={idx} className="flex justify-between border-b border-gray-700 pb-2">
              <span>{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Android Requirements */}
      <div className="bg-[#1c1c2d] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          {translations.download?.androidRequirements?.title || 'Для устройств Android'}
        </h3>
        <ul className="space-y-3 text-gray-300">
          {(translations.download?.androidRequirements?.items || [
            { label: "Операционная система:", value: "Android 7.0 и новее" }
            // ... другие элементы ...
          ]).map((item: any, idx: number) => (
            <li key={idx} className="flex justify-between border-b border-gray-700 pb-2">
              <span>{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);