import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import Link from "next/link";

interface ButtonProps {
  text?: string;
  border?: string;
  textColor?: string;
  hoverBg?: string;
  hoverText?: string;
  bg?: string;
}

interface CTASectionProps {
  templateData?: {
    cta?: {
      gradient?: string;
      titleColor?: string;
      textColor?: string;
      content?: {
        title?: string;
        description?: string;
      };
      buttons?: {
        primary?: ButtonProps;
        secondary?: ButtonProps;
      };
      stats?: { label: string; value: string }[];
      checklist?: string[];
    };
    [key: string]: unknown; // Allow additional properties
  };
  lang: string;
}

type CTAConfig = {
  gradient: string;
  titleColor: string;
  textColor: string;
  content: { title: string; description: string };
  buttons: {
    primary: ButtonProps;
    secondary: ButtonProps;
  };
  stats: { label: string; value: string }[];
  checklist: string[];
};

export const CTASection: React.FC<CTASectionProps> = ({
  templateData = {},
  lang,
}) => {
  const locale = (lang === "ru" ? ru.cta : en.cta) as any;
  const isRu = lang === "ru";

  const defaultData: CTAConfig = {
    gradient: "bg-gradient-to-r from-[#ff424d] to-[#ff2c39]",
    titleColor: "text-white",
    textColor: "text-white",
    content: {
      title: isRu ? "Откройте Vavada прямо сейчас" : "Launch Vavada right now",
      description: isRu
        ? "Рабочее зеркало, регистрация за минуту и welcome-бонус с фриспинами для первых ставок."
        : "Working mirror, 1-minute signup and a welcome bonus with free spins for your first bets.",
    },
    buttons: {
      primary: {
        text: isRu ? "Получить доступ" : "Get access",
        border: "border-2 border-white",
        textColor: "text-white",
        hoverBg: "hover:bg-white",
        hoverText: "hover:text-[#ff424d]",
      },
      secondary: {
        text: isRu ? "Открыть бонусы" : "See bonuses",
        bg: "bg-white",
        textColor: "text-[#ff424d]",
        hoverBg: "hover:bg-gray-100",
      },
    },
    stats: [
      {
        label: isRu ? "Зеркало" : "Mirror",
        value: isRu ? "Всегда активно" : "Always live",
      },
      {
        label: isRu ? "Регистрация" : "Signup",
        value: "60 sec",
      },
      {
        label: isRu ? "Welcome" : "Welcome",
        value: isRu ? "100% + 100FS" : "100% + 100FS",
      },
    ],
    checklist: [
      isRu
        ? "Вход без VPN через актуальный домен Vavada"
        : "Login without VPN via the current Vavada domain",
      isRu
        ? "Активация welcome-бонуса сразу после подтверждения email"
        : "Welcome bonus activates right after email confirmation",
      isRu
        ? "Пуш-уведомления о кэшбэке и промокодах в приложении"
        : "Push alerts for cashback and promo codes inside the app",
    ],
  };

  const ctaData = (templateData?.cta || {}) as Partial<CTAConfig>;
  const merged: CTAConfig = {
    ...defaultData,
    ...ctaData,
    content: {
      ...defaultData.content,
      ...(ctaData.content || {}),
    },
    buttons: {
      primary: {
        ...defaultData.buttons.primary,
        ...(ctaData.buttons?.primary || {}),
      },
      secondary: {
        ...defaultData.buttons.secondary,
        ...(ctaData.buttons?.secondary || {}),
      },
    },
    stats: ctaData.stats || defaultData.stats,
    checklist: ctaData.checklist || defaultData.checklist,
  };

  const content = {
    title: locale?.content?.title || merged.content.title,
    description: locale?.content?.description || merged.content.description,
  };

  const buttons: { primary: ButtonProps; secondary: ButtonProps } = {
    primary: {
      ...merged.buttons.primary,
      ...(locale?.buttons?.primary || {}),
    },
    secondary: {
      ...merged.buttons.secondary,
      ...(locale?.buttons?.secondary || {}),
    },
  };

  const stats =
    (locale?.stats as { label: string; value: string }[] | undefined) ||
    merged.stats;
  const checklist = (locale?.checklist as string[] | undefined) || merged.checklist;

  return (
    <section className="bg-[#1c1c2d] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`${merged.gradient} rounded-2xl p-8 md:p-12`}>
          <div className="text-center space-y-4 mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              {isRu ? "старт без ожиданий" : "instant launch"}
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${merged.titleColor}`}>
              {content.title}
            </h2>
            <p className={`${merged.textColor} text-lg md:text-xl`}>
              {content.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 mb-8">
            <div className="flex-1 grid grid-cols-3 gap-4 rounded-xl bg-white/10 backdrop-blur px-4 py-3 text-white text-sm md:text-base">
              {stats.map((item: { label: string; value: string }, idx: number) => (
                <div key={idx} className="text-center">
                  <p className="uppercase text-xs tracking-widest text-white/70">
                    {item.label}
                  </p>
                  <p className="text-xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/registration`}
                className={`inline-flex items-center justify-center px-8 py-3 ${buttons.primary.border} ${buttons.primary.textColor} text-base font-semibold rounded-lg ${buttons.primary.hoverBg} ${buttons.primary.hoverText} transition-colors`}
              >
                {buttons.primary.text}
              </Link>
              <Link
                href={`/${lang}/bonuses`}
                className={`inline-flex items-center justify-center px-8 py-3 ${buttons.secondary.bg} ${buttons.secondary.textColor} text-base font-semibold rounded-lg ${buttons.secondary.hoverBg} transition-colors`}
              >
                {buttons.secondary.text}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 text-left md:grid-cols-3 text-white/90 text-sm">
            {checklist.map((item: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl bg-white/10 px-4 py-3"
              >
                <span className="mt-1 h-3 w-3 rounded-full bg-white" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};