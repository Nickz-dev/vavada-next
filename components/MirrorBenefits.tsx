const fallbackBenefits = (lang: string) =>
  lang === "ru"
    ? [
        "Доступ при блокировке основного домена",
        "Полная функциональность казино",
        "Автоматическое обновление ссылок",
        "Шифрование данных и сохранённых сессий",
      ]
    : [
        "Access when the main domain is blocked",
        "Full casino functionality",
        "Automatic link rotation",
        "Encrypted data and preserved sessions",
      ];

export const MirrorBenefits = ({ translations, lang }: any) => {
  const benefits =
    translations.mirrors?.benefitsList || fallbackBenefits(lang);

  return (
    <section
      id="benefits"
      className="bg-[#15152a] rounded-3xl p-6 md:p-10 mb-8 border border-white/5 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "почему зеркало" : "why mirrors"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.mirrors?.benefitsTitle ||
            (lang === "ru" ? "Преимущества зеркал VAVADA" : "Benefits of VAVADA mirrors")}
        </h2>
        <p className="text-sm text-white/70">
          {translations.mirrors?.benefitsDescription ||
            (lang === "ru"
              ? "Входите без VPN, сохраняйте аккаунт в сети и получайте бонусы, даже если основной сайт недоступен."
              : "Log in without VPN, keep your account online, and receive bonuses even when the main site is blocked.")}
        </p>
      </div>

      <ul className="grid md:grid-cols-2 gap-4">
        {benefits.map((benefit: string, idx: number) => (
          <li
            key={`${benefit}-${idx}`}
            className="flex items-start bg-[#1c1c2d] border border-white/5 p-4 rounded-2xl"
          >
            <span className="text-[#4CAF50] mr-3 text-xl">✓</span>
            <span className="text-gray-300 text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

