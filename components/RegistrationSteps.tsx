import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface RegistrationStepsProps {
  templateData?: any;
  lang: string;
}

type StepItem = {
  id: number;
  title: string;
  items: string[];
  tip?: string;
};

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  templateData,
  lang,
}) => {
  const locale = lang === "ru" ? (ru as any) : (en as any);
  const t = locale.registrationSteps || {};

  const defaultSteps: StepItem[] = [
    {
      id: 1,
      title: lang === "ru" ? "Заполните форму" : "Fill the form",
      items: [
        lang === "ru" ? "Введите email и номер телефона" : "Enter email and phone",
        lang === "ru"
          ? "Создайте пароль и подтвердите его"
          : "Create a password and confirm it",
        lang === "ru"
          ? "Выберите валюту и страну"
          : "Choose currency and country",
      ],
      tip:
        lang === "ru"
          ? "Используйте реальный email — на него придет письмо с подтверждением."
          : "Use a real email — confirmation link arrives there.",
    },
    {
      id: 2,
      title: lang === "ru" ? "Подтвердите аккаунт" : "Confirm account",
      items: [
        lang === "ru" ? "Откройте письмо от Vavada" : "Open the email from Vavada",
        lang === "ru"
          ? "Перейдите по ссылке подтверждения"
          : "Follow the verification link",
        lang === "ru"
          ? "Войдите через актуальное зеркало"
          : "Log in via the live mirror",
      ],
      tip:
        lang === "ru"
          ? "Если письма нет, проверьте папку «Спам» или запросите письмо повторно."
          : "No email? Check spam or request another verification link.",
    },
    {
      id: 3,
      title: lang === "ru" ? "Активируйте бонус" : "Activate bonus",
      items: [
        lang === "ru" ? "Пополните счет от 100 ₽" : "Make a deposit from €5",
        lang === "ru"
          ? "Получите 100% + фриспины автоматически"
          : "Receive 100% + free spins automatically",
        lang === "ru"
          ? "Играйте в слоты из приветственного списка"
          : "Play slots from the welcome list",
      ],
      tip:
        lang === "ru"
          ? "Кэшбэк и промокоды подключаются в личном кабинете после входа."
          : "Cashback and promo codes activate in your profile after login.",
    },
  ];

  const steps: StepItem[] =
    templateData?.registrationSteps?.steps || t.steps || defaultSteps;

  const styles = templateData?.registrationSteps?.styles || {
    section: "bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10",
    title: "text-2xl md:text-3xl font-bold text-white",
    subtitle: "text-sm text-white/70 max-w-2xl",
    step: "bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 hover:border-[#ff424d]/50 transition",
    number:
      "w-12 h-12 flex items-center justify-center rounded-full bg-[#ff424d]/10 text-[#ff424d] text-lg font-semibold",
    item: "flex items-start gap-3 text-sm text-white/70",
    tip: "text-xs text-white/50 border-t border-white/10 pt-3 mt-3",
  };

  return (
    <section
      id="steps"
      className={styles.section}
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <div className="space-y-2 mb-8">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          {lang === "ru" ? "инструкция" : "guide"}
        </p>
        <h2 className={styles.title} itemProp="name">
          {t.title ||
            (lang === "ru"
              ? "Регистрация Vavada в 3 шага"
              : "Register at Vavada in 3 steps")}
        </h2>
        <p className={styles.subtitle}>
          {t.subtitle ||
            (lang === "ru"
              ? "Заполните форму, подтвердите email и активируйте бонус. Зеркало подключит вас к рабочему домену автоматически."
              : "Fill out the form, confirm your email, and activate the bonus. The mirror connects you to the live domain automatically.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" itemProp="step">
        {steps.map((step) => (
          <article
            key={step.id}
            className={styles.step}
            itemScope
            itemType="https://schema.org/HowToStep"
          >
            <header className="flex items-center gap-4 mb-4">
              <span className={styles.number}>{step.id}</span>
              <h3 className="text-lg font-semibold text-white" itemProp="name">
                {step.title}
              </h3>
            </header>
            <div className="space-y-3" itemProp="text">
              {step.items.map((item, idx) => (
                <p key={`${step.id}-${idx}`} className={styles.item}>
                  <span className="text-[#4CAF50]">✓</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
            {step.tip && <p className={styles.tip}>{step.tip}</p>}
          </article>
        ))}
      </div>
    </section>
  );
};

export default RegistrationSteps;
