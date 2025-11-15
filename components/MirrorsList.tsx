const fallbackAlternatives = [
  "vavada-sign-up.online",
  "vavada-sign-in.online",
  "vavada-mirror-2025.online",
  "vavada-download.online",
];

export const MirrorsList = ({ translations, lang }: any) => {
  const workingLabel =
    translations.mirrors?.workingStatus || (lang === "ru" ? "Работает" : "Online");

  const currentMirror =
    translations.mirrors?.currentMirrorDomain || "vavada-0001.com";

  const alternatives =
    translations.mirrors?.alternativeMirrors || fallbackAlternatives;

  return (
    <section
      id="mirrors"
      className="bg-[#15152a] rounded-3xl p-6 md:p-10 mb-8 border border-white/5 space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "рабочие ссылки" : "live links"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {translations.mirrors?.nav?.mirrors ||
            (lang === "ru" ? "Актуальные зеркала Vavada" : "Current Vavada mirrors")}
        </h2>
      </div>

      <div className="p-4 bg-[#1c1c2d] rounded-2xl border border-[#ff424d]/40 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#ff9aa5]">
              {translations.mirrors?.currentMirror || "Рабочее зеркало"}
            </p>
            <p className="text-lg font-semibold text-white">{currentMirror}</p>
          </div>
          <span className="text-[#4caf50] flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#4caf50]" />
            {workingLabel}
          </span>
        </div>
        <p className="text-xs text-white/60">
          {translations.mirrors?.mirrorHint ||
            (lang === "ru"
              ? "Добавьте зеркало в закладки или включите уведомления, чтобы не потерять доступ."
              : "Bookmark the mirror or enable notifications to keep access.")}
        </p>
      </div>

      <div>
        <p className="text-sm text-white/70 mb-3">
          {translations.mirrors?.alternative ||
            (lang === "ru" ? "Альтернативные зеркала:" : "Alternative mirrors:")}
        </p>
        <div className="space-y-3">
          {alternatives.map((mirror: string, idx: number) => (
            <div
              key={`${mirror}-${idx}`}
              className="flex items-center justify-between p-3 bg-[#1c1c2d] rounded-xl border border-white/5"
            >
              <span className="text-white text-sm">{mirror}</span>
              <span className="text-[#4caf50] text-xs">{workingLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

