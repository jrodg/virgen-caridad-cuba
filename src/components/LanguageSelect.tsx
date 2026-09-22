import { languageOptions, type Language } from "../i18n/messages";
import { useLanguage } from "../context/LanguageContext";

const LanguageSelect = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="lang-switch">
      <span className="sr-only">{t("language.label")}</span>
      <select
        value={language}
        aria-label={t("language.label")}
        onChange={(event) => setLanguage(event.target.value as Language)}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelect;
