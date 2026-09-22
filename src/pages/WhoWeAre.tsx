import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedContent } from "../i18n/localize";
import { toPhoneHref } from "../utils/storage";

const WhoWeAre = () => {
  const { t } = useLanguage();
  const { about } = useLocalizedContent();
  const phoneHref = toPhoneHref(about.phone);

  return (
    <div className="page">
      <header className="page-hero">
        <p className="kicker">{about.kicker}</p>
        <h1>{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      {(about.phone || about.phoneHint) && (
        <aside className="contact-card">
          {about.phoneLabel && <p className="kicker">{about.phoneLabel}</p>}
          {about.phone && phoneHref ? (
            <a className="contact-phone" href={phoneHref}>
              {about.phone}
            </a>
          ) : (
            about.phone && <p className="contact-phone">{about.phone}</p>
          )}
          {about.phoneHint && <p>{about.phoneHint}</p>}
        </aside>
      )}

      {about.sections.length === 0 ? (
        <p className="empty">{t("about.empty")}</p>
      ) : (
        <section className="about-sections">
          {about.sections.map((section) => (
            <article key={section.id}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      )}

      <div className="hero-actions about-actions">
        <Link className="btn" to="/calendar">
          {t("home.seeCalendar")}
        </Link>
        <Link className="btn donate-btn" to="/donate">
          {t("nav.donate")}
        </Link>
      </div>
    </div>
  );
};

export default WhoWeAre;
