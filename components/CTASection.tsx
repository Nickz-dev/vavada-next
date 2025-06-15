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
    };
    [key: string]: unknown; // Allow additional properties
  };
  lang: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  templateData = {},
  lang,
}) => {
  const t = lang === "ru" ? ru.cta : en.cta;

  // Default values
  const defaultData = {
    gradient: "bg-gradient-to-r from-[#ff424d] to-[#ff2c39]",
    titleColor: "text-white",
    textColor: "text-white",
    content: {
      title: "Готовы начать игру?",
      description: "Зарегистрируйтесь сейчас и получите приветственный бонус до 100,000₽",
    },
    buttons: {
      primary: {
        text: "Регистрация",
        border: "border-2 border-white",
        textColor: "text-white",
        hoverBg: "hover:bg-white",
        hoverText: "hover:text-[#ff424d]",
      },
      secondary: {
        text: "Все бонусы",
        bg: "bg-white",
        textColor: "text-[#ff424d]",
        hoverBg: "hover:bg-gray-100",
      },
    },
  };

  // Safely extract data
  const ctaData = templateData?.cta || {};
  const data = {
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
  };

  // Merge with translations
  const content = {
    title: t?.content?.title || data.content.title,
    description: t?.content?.description || data.content.description,
  };

  const buttons = {
    primary: {
      ...data.buttons.primary,
      ...(t?.buttons?.primary || {}),
    },
    secondary: {
      ...data.buttons.secondary,
      ...(t?.buttons?.secondary || {}),
    },
  };

  return (
    <div className="bg-[#2A2A42] p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${data.gradient} rounded-xl p-8 my-8 text-center`}>
          <h2 className={`text-3xl font-bold ${data.titleColor} mb-4`}>
            {content.title}
          </h2>
          <p className={`${data.textColor} text-xl mb-6`}>
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${lang}/registration`}
              className={`inline-flex items-center justify-center px-8 py-3 ${buttons.primary.border} ${buttons.primary.textColor} text-base font-medium rounded-md ${buttons.primary.hoverBg} ${buttons.primary.hoverText} transition-colors`}
            >
              {buttons.primary.text}
            </Link>
            <Link
              href={`/${lang}/bonuses`}
              className={`inline-flex items-center justify-center px-8 py-3 ${buttons.secondary.bg} ${buttons.secondary.textColor} text-base font-medium rounded-md ${buttons.secondary.hoverBg} transition-colors`}
            >
              {buttons.secondary.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};