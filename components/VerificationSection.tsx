import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

type ListItem = {
  label: string;
  description?: string;
};

type TimelineStep = {
  title: string;
  time: string;
  note?: string;
};

interface VerificationContent {
  title: string;
  subtitle: string;
  documents: ListItem[];
  timeline: TimelineStep[];
  tips: string[];
  caution: string;
}

interface VerificationSectionProps {
  templateData?: {
    verificationSection?: Partial<VerificationContent>;
  };
  lang: string;
}

const fallbackContent = (lang: string): VerificationContent =>
  lang === "ru"
    ? {
        title: "Верификация аккаунта Vavada",
        subtitle:
          "KYC требуется перед крупными выводами и при смене платежных реквизитов. Соберите пакет документов заранее, чтобы ускорить процесс.",
        documents: [
          { label: "Паспорт / ID", description: "главная страница + прописка" },
          { label: "Подтверждение адреса", description: "квитанция или банковская выписка за 3 месяца" },
          { label: "Селфи с документом", description: "дата + подпись Vavada на листке" },
          { label: "Платежное средство", description: "скрин карты/кошелька, закрывая часть номера" },
        ],
        timeline: [
          { title: "Стандарт", time: "до 12 часов", note: "очередность по времени запроса" },
          { title: "Express", time: "30–60 мин", note: "доступно для статусов VIP и по запросу поддержки" },
          { title: "Дополнительная проверка", time: "до 24 часов", note: "если требуется повторный аплоад" },
        ],
        tips: [
          "Загружайте фото в хорошем освещении без бликов.",
          "Все углы документа должны быть видны, разрешение от 1200px.",
          "Отправляйте файлы через защищённую форму в личном кабинете.",
        ],
        caution:
          "Мы не запрашиваем данные карт по телефону или мессенджерам. Всегда проверяйте домен `vavada-0001.com` перед загрузкой документов.",
      }
    : {
        title: "Vavada account verification",
        subtitle:
          "KYC is required before large withdrawals or when you change payout details. Prepare the document pack in advance to speed up the process.",
        documents: [
          { label: "Passport / ID", description: "main page + address page" },
          { label: "Proof of address", description: "utility bill or bank statement dated < 3 months" },
          { label: "Selfie with document", description: "handwritten “Vavada + date” note" },
          { label: "Payment method proof", description: "card/wallet screenshot with partially hidden number" },
        ],
        timeline: [
          { title: "Standard", time: "up to 12h", note: "processed in order of submission" },
          { title: "Express", time: "30–60 min", note: "available for VIP tiers or upon support request" },
          { title: "Additional review", time: "up to 24h", note: "if files require resubmission" },
        ],
        tips: [
          "Use bright lighting and avoid glare on the document.",
          "All corners of the document must be visible, 1200px+ resolution.",
          "Upload files via the secure form inside your profile only.",
        ],
        caution:
          "We never ask for card details over phone or messengers. Always double-check the `vavada-0001.com` domain before uploading documents.",
      };

const normalizeTranslations = (
  translations: Record<string, any>
): Partial<VerificationContent> => {
  const result: Partial<VerificationContent> = {};

  if (translations.title) result.title = translations.title;
  if (translations.subtitle) result.subtitle = translations.subtitle;
  if (translations.caution) result.caution = translations.caution;
  if (Array.isArray(translations.tips)) result.tips = translations.tips;

  if (Array.isArray(translations.documents?.items)) {
    result.documents = translations.documents.items.map(
      (item: string): ListItem => ({
        label: item,
      })
    );
  }

  if (Array.isArray(translations.timeline?.items)) {
    result.timeline = translations.timeline.items.map(
      (item: string): TimelineStep => ({
        title: item,
        time: "",
      })
    );
  }

  return result;
};

const VerificationSection: React.FC<VerificationSectionProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = lang === "ru" ? (ru as any) : (en as any);
  const translations = locale.verificationSection || {};
  const fallback = fallbackContent(lang);
  const normalizedTranslations = normalizeTranslations(translations);
  const settings = templateData.verificationSection || {};

  const content: VerificationContent = {
    ...fallback,
    ...normalizedTranslations,
    ...settings,
    documents:
      settings.documents ||
      normalizedTranslations.documents ||
      fallback.documents,
    timeline:
      settings.timeline ||
      normalizedTranslations.timeline ||
      fallback.timeline,
    tips: settings.tips || normalizedTranslations.tips || fallback.tips,
    caution:
      settings.caution ||
      normalizedTranslations.caution ||
      fallback.caution,
    subtitle:
      settings.subtitle ||
      normalizedTranslations.subtitle ||
      fallback.subtitle,
    title: settings.title || normalizedTranslations.title || fallback.title,
  };

  return (
    <section
      id="verification"
      className="bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10 space-y-8"
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "kyc / aml" : "kyc / aml"}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {content.title}
        </h2>
        <p className="text-sm text-white/70 max-w-3xl">{content.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {translations.documents?.title ||
              (lang === "ru" ? "Необходимые документы" : "Required files")}
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            {(content.documents || []).map((doc, idx) => (
              <li key={`${doc.label}-${idx}`} className="flex gap-3">
                <span className="text-[#4CAF50]">✓</span>
                <div>
                  <p className="font-semibold text-white">{doc.label}</p>
                  {doc.description && (
                    <p className="text-xs text-white/60">{doc.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {translations.timeline?.title ||
              (lang === "ru" ? "Сроки и статусы" : "Timelines & status")}
          </h3>
          <div className="space-y-3">
            {(content.timeline || []).map((step, idx) => (
              <div
                key={`${step.title}-${idx}`}
                className="flex items-start justify-between border border-white/5 rounded-xl px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {step.title}
                  </p>
                  {step.note && (
                    <p className="text-xs text-white/60">{step.note}</p>
                  )}
                </div>
                <span className="text-[#ff424d] text-sm font-medium">
                  {step.time}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(content.tips || []).map((tip, idx) => (
          <div
            key={`${tip}-${idx}`}
            className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-4 text-sm text-white/80 flex gap-3"
          >
            <span className="text-[#FFD54F]">⚡</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#281a1a] border border-red-500/40 rounded-2xl p-4 text-sm text-red-200">
        {content.caution}
      </div>
    </section>
  );
};

export default VerificationSection;
