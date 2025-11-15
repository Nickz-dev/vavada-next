import React from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

type BonusPackage = {
  title: string;
  reward: string;
  bullets: string[];
};

type BonusStep = {
  label: string;
  description: string;
};

type BonusStat = {
  label: string;
  value: string;
};

interface WelcomeBonusProps {
  templateData?: any;
  translations?: any;
  lang: string;
}

const fallbackData = (lang: string) =>
  lang === "ru"
    ? {
        title: "Приветственный пакет Vavada",
        subtitle:
          "Вы получаете 100% бонус до 100 000 ₽, 100 фриспинов и доступ к закрытым турнирам. Бонус начисляется сразу после первого депозита.",
        stats: [
          { label: "Максимум бонуса", value: "100 000 ₽" },
          { label: "Фриспинов", value: "100" },
          { label: "Вейджер", value: "x30 / x15" },
        ],
        packages: [
          {
            title: "Депозит + фриспины",
            reward: "100% + 100 FS",
            bullets: [
              "Фриспины в Sweet Bonanza или Book of Dead",
              "Минимальный депозит: 1000 ₽",
              "Максимальная ставка при отыгрыше: 500 ₽",
            ],
          },
          {
            title: "Дополнительные плюшки",
            reward: "Cashback + промокоды",
            bullets: [
              "Кэшбэк до 10% каждую неделю",
              "Эксклюзивный промокод на второй депозит",
              "Участие в турнире новичков",
            ],
          },
        ],
        steps: [
          {
            label: "Регистрация",
            description: "Создайте аккаунт через рабочее зеркало и подтвердите email.",
          },
          {
            label: "Депозит",
            description: "Пополните счёт от 1000 ₽ удобным способом (карта, P2P, крипто).",
          },
          {
            label: "Активация",
            description: "Бонус зачисляется автоматически. Фриспины доступны в разделе «Подарки».",
          },
          {
            label: "Отыгрыш",
            description: "Соблюдайте вейджер x30 для бонуса и x15 для фриспинов.",
          },
        ],
        rules: [
          "Бонус активен 7 дней после начисления, 100 фриспинов — 24 часа.",
          "Запрещены ставки на рулетку/лайв-игры во время отыгрыша.",
          "Кэшбэк выдаётся в понедельник и суммируется с приветственным бонусом.",
        ],
      }
    : {
        title: "Vavada welcome bundle",
        subtitle:
          "Grab a 100% boost up to €1000, 100 free spins and access to fresh promo codes once you top up the account.",
        stats: [
          { label: "Max bonus", value: "€1000" },
          { label: "Free spins", value: "100" },
          { label: "Wager", value: "x30 / x15" },
        ],
        packages: [
          {
            title: "Deposit + spins",
            reward: "100% + 100 FS",
            bullets: [
              "Spins in Sweet Bonanza or Book of Dead",
              "Minimum deposit: €20",
              "Max bet while wagering: €5",
            ],
          },
          {
            title: "Extra perks",
            reward: "Cashback + promos",
            bullets: [
              "Up to 10% cashback every Monday",
              "Exclusive promo code for the 2nd deposit",
              "Entry to the Newcomers tournament",
            ],
          },
        ],
        steps: [
          {
            label: "Registration",
            description: "Sign up via the live mirror and confirm your email.",
          },
          {
            label: "Deposit",
            description: "Fund your balance from €20 via cards, wallets or crypto.",
          },
          {
            label: "Activation",
            description: "Bonus arrives instantly, spins live inside the “Gifts” tab.",
          },
          {
            label: "Wagering",
            description: "Respect x30 for the bonus and x15 for the spins.",
          },
        ],
        rules: [
          "Bonus stays active for 7 days, free spins expire in 24h.",
          "Roulette / live bets are blocked while wagering.",
          "Cashback lands on Monday and stacks with the welcome package.",
        ],
      };

export const WelcomeBonus: React.FC<WelcomeBonusProps> = ({
  templateData = {},
  translations,
  lang,
}) => {
  const locale = lang === "ru" ? ru : en;
  const bonusTranslations = translations?.bonuses || locale.bonuses || {};
  const fallback = fallbackData(lang);
  const customData = templateData?.welcomeBonus || {};

  const title = bonusTranslations.welcomeTitle || customData.title || fallback.title;
  const subtitle =
    customData.subtitle || fallback.subtitle;
  const stats: BonusStat[] = customData.stats || fallback.stats;
  const packages: BonusPackage[] =
    customData.packages || bonusTranslations.packages || fallback.packages;
  const steps: BonusStep[] =
    customData.steps ||
    (bonusTranslations.howToGet?.steps || []).map((step: string) => ({
      label: step,
      description: "",
    })) ||
    fallback.steps;
  const rules: string[] =
    customData.rules || bonusTranslations.rules || fallback.rules;

  return (
    <section
      id="welcome-bonus"
      className="bg-[#15152a] rounded-3xl border border-white/5 p-6 md:p-10 space-y-8"
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          {lang === "ru" ? "приветственный бонус" : "welcome pack"}
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            <p className="text-sm text-white/70 max-w-3xl">{subtitle}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#1c1c2d] rounded-2xl border border-white/5 px-4 py-3 text-center"
              >
                <p className="text-xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {packages.map((pack) => (
          <article
            key={pack.title}
            className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{pack.title}</h3>
              <span className="text-[#ff424d] font-semibold">{pack.reward}</span>
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              {pack.bullets.map((bullet, idx) => (
                <li key={`${pack.title}-${idx}`} className="flex gap-2">
                  <span className="text-[#4CAF50]">✓</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {bonusTranslations.howToGet?.title ||
              (lang === "ru" ? "Как активировать" : "How to claim")}
          </h3>
          <ol className="space-y-3 text-sm text-white/80 list-decimal pl-4">
            {steps.map((step, idx) => (
              <li key={`${step.label}-${idx}`}>
                <p className="font-semibold text-white">{step.label}</p>
                {step.description && (
                  <p className="text-xs text-white/60">{step.description}</p>
                )}
              </li>
            ))}
          </ol>
        </article>

        <article className="bg-[#1c1c2d] rounded-2xl border border-white/5 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {lang === "ru" ? "Основные правила" : "Core rules"}
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            {rules.map((rule, idx) => (
              <li key={`${rule}-${idx}`} className="flex gap-2">
                <span className="text-[#FFD54F]">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
          <div className="text-xs text-white/50 border-t border-white/5 pt-3">
            {lang === "ru"
              ? "Проверяйте статус бонуса в разделе «Касса → Бонусы». Отмена доступна до начала отыгрыша."
              : "Track the bonus status inside “Cashier → Bonuses”. You can cancel it before wagering starts."}
          </div>
        </article>
      </div>
    </section>
  );
};