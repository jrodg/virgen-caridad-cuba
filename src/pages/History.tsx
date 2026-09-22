import { useLanguage } from "../context/LanguageContext";
import { useLocalizedContent } from "../i18n/localize";

const History = () => {
  const { t } = useLanguage();
  const { history } = useLocalizedContent();

  return (
    <div className="page">
      <header className="page-hero">
        <p className="kicker">{t("history.kicker")}</p>
        <h1>{t("history.title")}</h1>
        <p className="lede">{t("history.lede")}</p>
      </header>
      {history.length === 0 ? (
        <p className="empty">{t("history.empty")}</p>
      ) : (
        <ol className="timeline">
          {history.map((item) => (
            <li key={item.id}>
              <div className="year">{item.year}</div>
              <div className="timeline-body">
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default History;
