import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelect from "./LanguageSelect";
import { useLocalizedContent } from "../i18n/localize";
import { toPhoneHref } from "../utils/storage";

const CubanFlag = ({ label }: { label: string }) => (
  <svg
    className="cuban-flag"
    viewBox="0 0 48 24"
    width="56"
    height="28"
    role="img"
    aria-label={label}
  >
    <rect width="48" height="24" fill="#002a8f" />
    <rect y="4.8" width="48" height="4.8" fill="#fff" />
    <rect y="14.4" width="48" height="4.8" fill="#fff" />
    <path fill="#cf142b" d="M0 0l20.78 12L0 24z" />
    <polygon
      fill="#fff"
      points="6.93,8.85 7.65,11.01 9.93,11.03 8.09,12.38 8.78,14.55 6.93,13.22 5.08,14.55 5.77,12.38 3.93,11.03 6.21,11.01"
    />
  </svg>
);

const StarMark = () => (
  <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M24 8.5l2.6 8.1h8.5l-6.9 5 2.6 8.1L24 24.7l-6.8 5 2.6-8.1-6.9-5h8.5z"
      fill="currentColor"
    />
  </svg>
);

const Layout = () => {
  const { isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const { about } = useLocalizedContent();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const donateClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-donate active" : "nav-donate";
  const phoneHref = toPhoneHref(about.phone);

  return (
    <div className={`site${menuOpen ? " menu-open" : ""}`}>
      <header className="topbar">
        <div className="topbar-row">
          <div className="topbar-left">
            <NavLink to="/" className="brand">
              <StarMark />
              <span className="brand-name">
                <strong>{t("brand.name")}</strong>
                <em>{t("brand.tagline")}</em>
              </span>
            </NavLink>
            <CubanFlag label={t("brand.flag")} />
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
          </button>
        </div>
        <nav id="site-nav" className="nav">
          <NavLink to="/" end>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/who-we-are">{t("nav.whoWeAre")}</NavLink>
          <NavLink to="/history">{t("nav.history")}</NavLink>
          <NavLink to="/videos">{t("nav.videos")}</NavLink>
          <NavLink to="/calendar">{t("nav.calendar")}</NavLink>
          {isAdmin && (
            <>
              <NavLink to="/admin">{t("nav.admin")}</NavLink>
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                {t("nav.signOut")}
              </button>
            </>
          )}
          {about.phone && (
            <a className="nav-phone" href={phoneHref}>
              {about.phone}
            </a>
          )}
          <NavLink to="/donate" className={donateClass}>
            {t("nav.donate")}
          </NavLink>
          <LanguageSelect />
        </nav>
        <div className="topbar-tools">
          {about.phone && (
            <a className="topbar-phone" href={phoneHref}>
              {about.phone}
            </a>
          )}
          <LanguageSelect />
          <NavLink to="/donate" className={donateClass}>
            {t("nav.donate")}
          </NavLink>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div>
          <p className="footer-kicker">{t("footer.kicker")}</p>
          <p>{t("footer.place")}</p>
          <p className="footer-confraternity">{about.title}</p>
        </div>
        <p className="footer-note">{t("footer.note")}</p>
        <div className="footer-end">
          {about.phone && (
            <a className="footer-phone" href={phoneHref}>
              {t("footer.call")} {about.phone}
            </a>
          )}
          <NavLink to="/donate" className="footer-donate">
            {t("nav.donate")}
          </NavLink>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
