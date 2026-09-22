import { Link } from "react-router-dom";
import GoldenRose from "../components/GoldenRose";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedContent } from "../i18n/localize";
import { toPhoneHref } from "../utils/storage";
import { formatLocaleDate } from "../utils/dates";

const Home = () => {
  const { t, locale } = useLanguage();
  const { history, events, videos, about } = useLocalizedContent();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((event) => event.date >= today).slice(0, 3);
  const featuredHistory = history.slice(0, 3);
  const featuredVideo = videos[0];

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker kicker-rose">
            {t("home.kicker")}
            <GoldenRose label={t("brand.rose")} />
          </p>
          <h1>{t("home.title")}</h1>
          <p className="lede">{t("home.lede")}</p>
          <div className="hero-actions">
            <Link className="btn donate-btn" to="/donate">
              {t("nav.donate")}
            </Link>
            <Link className="btn" to="/history">
              {t("home.readHistory")}
            </Link>
            <Link className="btn ghost" to="/calendar">
              {t("home.seeCalendar")}
            </Link>
            <Link className="btn ghost" to="/who-we-are">
              {t("home.meetConfraternity")}
            </Link>
          </div>
        </div>
        <figure className="hero-photo hero-icon">
          <img
            src={`${process.env.PUBLIC_URL}/caridad-icon.png`}
            alt={t("home.basilicaAlt")}
          />
          <figcaption>
            <strong>{t("home.basilicaCaption")}</strong>
          </figcaption>
        </figure>
      </section>

      <section className="band">
        <article className="stat">
          <span>{t("home.statPatroness")}</span>
          <strong>{t("home.statPatronessDate")}</strong>
          <p>{t("home.statPatronessBody")}</p>
        </article>
        <article className="stat">
          <span>{t("home.statFeast")}</span>
          <strong>{t("home.statFeastDate")}</strong>
          <p>{t("home.statFeastBody")}</p>
        </article>
        <article className="stat">
          <span>{t("home.statShrine")}</span>
          <strong>{t("home.statShrinePlace")}</strong>
          <p>{t("home.statShrineBody")}</p>
        </article>
      </section>

      <section className="giving about-band">
        <div>
          <p className="kicker">{about.kicker}</p>
          <h2>{about.title}</h2>
          <p>{about.homeBlurb}</p>
          {about.phone && (
            <a className="about-band-phone" href={toPhoneHref(about.phone)}>
              {about.phone}
            </a>
          )}
        </div>
        <Link className="btn" to="/who-we-are">
          {t("nav.whoWeAre")}
        </Link>
      </section>

      <section className="split">
        <div>
          <p className="kicker">{t("home.storyKicker")}</p>
          <h2>{t("home.storyTitle")}</h2>
          <p>{t("home.storyP1")}</p>
          <p>{t("home.storyP2")}</p>
        </div>
        <ul className="story-list">
          {featuredHistory.map((item) => (
            <li key={item.id}>
              <span>{item.year}</span>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="giving">
        <div>
          <p className="kicker">{t("home.givingKicker")}</p>
          <h2>{t("home.givingTitle")}</h2>
          <p>{t("home.givingBody")}</p>
        </div>
        <Link className="btn donate-btn" to="/donate">
          {t("nav.donate")}
        </Link>
      </section>

      <section className="two-col">
        <div>
          <div className="section-head">
            <h2>{t("home.upcoming")}</h2>
            <Link to="/calendar">{t("home.fullCalendar")}</Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="empty">{t("home.noUpcoming")}</p>
          ) : (
            <ul className="event-list">
              {upcoming.map((event) => (
                <li key={event.id}>
                  <time dateTime={event.date}>
                    {formatLocaleDate(
                      new Date(`${event.date}T12:00:00`),
                      locale,
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </time>
                  <div>
                    <strong>{event.title}</strong>
                    <p>{event.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="section-head">
            <h2>{t("home.videoLibrary")}</h2>
            <Link to="/videos">{t("home.allVideos")}</Link>
          </div>
          {featuredVideo ? (
            <article className="video-tease">
              <h3>{featuredVideo.title}</h3>
              <p>{featuredVideo.description}</p>
              <Link className="btn ghost" to="/videos">
                {t("home.watch")}
              </Link>
            </article>
          ) : (
            <p className="empty">{t("home.noFeaturedVideo")}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
