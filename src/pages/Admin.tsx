import { useEffect, useState, type FormEvent } from "react";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import type { AboutPage, AboutSection, CalendarEvent, DonationSettings, HistoryEntry } from "../types";

const TABS = [
  { id: "videos", labelKey: "admin.tabVideos" },
  { id: "calendar", labelKey: "admin.tabCalendar" },
  { id: "history", labelKey: "admin.tabHistory" },
  { id: "about", labelKey: "admin.tabAbout" },
  { id: "donations", labelKey: "admin.tabDonations" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const VIDEO_MAX_BYTES = 80 * 1024 * 1024;

const emptyHistory: HistoryEntry = { id: "", year: "", title: "", body: "" };
const emptyEvent: CalendarEvent = {
  id: "",
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

type VideoFormState = {
  title: string;
  description: string;
  url: string;
  file: File | null;
};

const emptyVideo: VideoFormState = {
  title: "",
  description: "",
  url: "",
  file: null,
};

type DonationFormState = {
  headline: string;
  blurb: string;
  paypalUrl: string;
  venmoUrl: string;
  cashAppUrl: string;
  zelleHandle: string;
  amounts: string;
};

const donationFormFromSettings = (settings: DonationSettings): DonationFormState => ({
  headline: settings.headline || "",
  blurb: settings.blurb || "",
  paypalUrl: settings.paypalUrl || "",
  venmoUrl: settings.venmoUrl || "",
  cashAppUrl: settings.cashAppUrl || "",
  zelleHandle: settings.zelleHandle || "",
  amounts: (settings.amounts || [10, 25, 50, 100]).join(", "),
});

const emptyAboutSection: AboutSection = { id: "", title: "", body: "" };

type AboutFormState = {
  kicker: string;
  title: string;
  lede: string;
  phone: string;
  phoneLabel: string;
  phoneHint: string;
  homeBlurb: string;
};

const aboutFormFromPage = (page: AboutPage): AboutFormState => ({
  kicker: page.kicker || "",
  title: page.title || "",
  lede: page.lede || "",
  phone: page.phone || "",
  phoneLabel: page.phoneLabel || "",
  phoneHint: page.phoneHint || "",
  homeBlurb: page.homeBlurb || "",
});

const Admin = () => {
  const {
    history,
    events,
    videos,
    saveHistory,
    deleteHistory,
    saveEvent,
    deleteEvent,
    saveVideo,
    deleteVideo,
    donations,
    donationSettings,
    saveDonationSettings,
    deleteDonation,
    about,
    saveAboutPage,
    saveAboutSection,
    deleteAboutSection,
  } = useContent();
  const { t, locale } = useLanguage();
  const [tab, setTab] = useState<TabId>("videos");
  const [historyForm, setHistoryForm] = useState(emptyHistory);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [videoForm, setVideoForm] = useState(emptyVideo);
  const [donationForm, setDonationForm] = useState(() =>
    donationFormFromSettings(donationSettings)
  );
  const [aboutForm, setAboutForm] = useState(() => aboutFormFromPage(about));
  const [aboutSectionForm, setAboutSectionForm] = useState(emptyAboutSection);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDonationForm(donationFormFromSettings(donationSettings));
  }, [donationSettings]);

  useEffect(() => {
    setAboutForm({
      kicker: about.kicker || "",
      title: about.title || "",
      lede: about.lede || "",
      phone: about.phone || "",
      phoneLabel: about.phoneLabel || "",
      phoneHint: about.phoneHint || "",
      homeBlurb: about.homeBlurb || "",
    });
  }, [
    about.kicker,
    about.title,
    about.lede,
    about.phone,
    about.phoneLabel,
    about.phoneHint,
    about.homeBlurb,
  ]);

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const submitVideo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!videoForm.title.trim()) return;
    if (!videoForm.file && !videoForm.url.trim()) {
      flash("admin.needVideo");
      return;
    }
    if (videoForm.file && videoForm.file.size > VIDEO_MAX_BYTES) {
      flash("admin.videoTooLarge");
      return;
    }
    setBusy(true);
    try {
      await saveVideo(videoForm);
      setVideoForm(emptyVideo);
      event.currentTarget.reset();
      flash("admin.videoPublished");
    } catch {
      flash("admin.videoFailed");
    } finally {
      setBusy(false);
    }
  };

  const submitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveEvent(eventForm);
    setEventForm(emptyEvent);
    flash(eventForm.id ? "admin.eventUpdated" : "admin.eventAdded");
  };

  const submitHistory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveHistory(historyForm);
    setHistoryForm(emptyHistory);
    flash(historyForm.id ? "admin.historyUpdated" : "admin.historyPublished");
  };

  const submitDonationSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDonationSettings({
      ...donationForm,
      amounts: donationForm.amounts
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value) && value > 0),
    });
    flash("admin.donationSaved");
  };

  const submitAboutPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAboutPage(aboutForm);
    flash("admin.aboutSaved");
  };

  const submitAboutSection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAboutSection(aboutSectionForm);
    setAboutSectionForm(emptyAboutSection);
    flash(aboutSectionForm.id ? "admin.sectionUpdated" : "admin.sectionAdded");
  };

  const giftTotal = donations.reduce(
    (sum, gift) => sum + (Number(gift.amount) || 0),
    0
  );

  return (
    <div className="page">
      <header className="page-hero">
        <p className="kicker">{t("admin.kicker")}</p>
        <h1>{t("admin.title")}</h1>
        <p className="lede">{t("admin.lede")}</p>
      </header>

      <div className="tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? "active" : ""}
            onClick={() => setTab(item.id)}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>
      {notice && <p className="notice">{t(notice)}</p>}

      {tab === "videos" && (
        <div className="admin-grid">
          <form className="panel form" onSubmit={submitVideo}>
            <h2>{t("admin.uploadVideo")}</h2>
            <label>
              {t("admin.titleLabel")}
              <input
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </label>
            <label>
              {t("admin.description")}
              <textarea
                rows={4}
                value={videoForm.description}
                onChange={(e) =>
                  setVideoForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              {t("admin.videoFile")}
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setVideoForm((prev) => ({
                    ...prev,
                    file: e.target.files?.[0] || null,
                  }))
                }
              />
            </label>
            <label>
              {t("admin.videoUrl")}
              <input
                value={videoForm.url}
                placeholder="https://"
                onChange={(e) =>
                  setVideoForm((prev) => ({ ...prev, url: e.target.value }))
                }
              />
            </label>
            <button className="btn" type="submit" disabled={busy}>
              {busy ? t("admin.saving") : t("admin.publishVideo")}
            </button>
          </form>
          <section>
            <h2 className="list-title">{t("admin.publishedVideos")}</h2>
            {videos.length === 0 ? (
              <p className="empty">{t("admin.noneYet")}</p>
            ) : (
              <ul className="admin-list">
                {videos.map((video) => (
                  <li key={video.id}>
                    <div>
                      <strong>{video.title}</strong>
                      <p>{video.type === "file" ? video.fileName || t("admin.uploadedFile") : video.url}</p>
                    </div>
                    <button
                      type="button"
                      className="text-btn danger"
                      onClick={() => {
                        void deleteVideo(video.id);
                      }}
                    >
                      {t("admin.remove")}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {tab === "calendar" && (
        <div className="admin-grid">
          <form className="panel form" onSubmit={submitEvent}>
            <h2>{eventForm.id ? t("admin.editEvent") : t("admin.createEvent")}</h2>
            <label>
              {t("admin.titleLabel")}
              <input
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </label>
            <div className="form-row">
              <label>
                {t("admin.date")}
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, date: e.target.value }))
                  }
                  required
                />
              </label>
              <label>
                {t("admin.time")}
                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, time: e.target.value }))
                  }
                />
              </label>
            </div>
            <label>
              {t("admin.location")}
              <input
                value={eventForm.location}
                onChange={(e) =>
                  setEventForm((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </label>
            <label>
              {t("admin.description")}
              <textarea
                rows={4}
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </label>
            <div className="form-actions">
              <button className="btn" type="submit">
                {eventForm.id ? t("admin.saveChanges") : t("admin.addEvent")}
              </button>
              {eventForm.id && (
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => setEventForm(emptyEvent)}
                >
                  {t("admin.cancelEdit")}
                </button>
              )}
            </div>
          </form>
          <section>
            <h2 className="list-title">{t("admin.scheduledEvents")}</h2>
            <ul className="admin-list">
              {events.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>
                      {item.date}
                      {item.time ? ` · ${item.time}` : ""}
                    </p>
                  </div>
                  <div className="list-actions">
                    <button type="button" className="text-btn" onClick={() => setEventForm(item)}>
                      {t("admin.edit")}
                    </button>
                    <button
                      type="button"
                      className="text-btn danger"
                      onClick={() => deleteEvent(item.id)}
                    >
                      {t("admin.remove")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {tab === "history" && (
        <div className="admin-grid">
          <form className="panel form" onSubmit={submitHistory}>
            <h2>{historyForm.id ? t("admin.editHistory") : t("admin.enterHistory")}</h2>
            <label>
              {t("admin.year")}
              <input
                value={historyForm.year}
                placeholder="1612"
                onChange={(e) =>
                  setHistoryForm((prev) => ({ ...prev, year: e.target.value }))
                }
                required
              />
            </label>
            <label>
              {t("admin.titleLabel")}
              <input
                value={historyForm.title}
                onChange={(e) =>
                  setHistoryForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </label>
            <label>
              {t("admin.historicalText")}
              <textarea
                rows={8}
                value={historyForm.body}
                onChange={(e) =>
                  setHistoryForm((prev) => ({ ...prev, body: e.target.value }))
                }
                required
              />
            </label>
            <div className="form-actions">
              <button className="btn" type="submit">
                {historyForm.id ? t("admin.saveChanges") : t("admin.publishEntry")}
              </button>
              {historyForm.id && (
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => setHistoryForm(emptyHistory)}
                >
                  {t("admin.cancelEdit")}
                </button>
              )}
            </div>
          </form>
          <section>
            <h2 className="list-title">{t("admin.publishedHistory")}</h2>
            <ul className="admin-list">
              {history.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>
                      {item.year} · {item.title}
                    </strong>
                    <p>{item.body.slice(0, 140)}{item.body.length > 140 ? "…" : ""}</p>
                  </div>
                  <div className="list-actions">
                    <button type="button" className="text-btn" onClick={() => setHistoryForm(item)}>
                      {t("admin.edit")}
                    </button>
                    <button
                      type="button"
                      className="text-btn danger"
                      onClick={() => deleteHistory(item.id)}
                    >
                      {t("admin.remove")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {tab === "about" && (
        <div className="admin-grid">
          <form className="panel form" onSubmit={submitAboutPage}>
            <h2>{t("admin.aboutPage")}</h2>
            <label>
              {t("admin.aboutKicker")}
              <input
                value={aboutForm.kicker}
                onChange={(e) =>
                  setAboutForm((prev) => ({ ...prev, kicker: e.target.value }))
                }
              />
            </label>
            <label>
              {t("admin.headline")}
              <input
                value={aboutForm.title}
                onChange={(e) =>
                  setAboutForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </label>
            <label>
              {t("admin.aboutIntro")}
              <textarea
                rows={4}
                value={aboutForm.lede}
                onChange={(e) =>
                  setAboutForm((prev) => ({ ...prev, lede: e.target.value }))
                }
                required
              />
            </label>
            <label>
              {t("admin.aboutHomeBlurb")}
              <textarea
                rows={3}
                value={aboutForm.homeBlurb}
                onChange={(e) =>
                  setAboutForm((prev) => ({ ...prev, homeBlurb: e.target.value }))
                }
              />
            </label>
            <label>
              {t("admin.aboutPhone")}
              <input
                value={aboutForm.phone}
                onChange={(e) =>
                  setAboutForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="(201) 555-0161"
              />
            </label>
            <label>
              {t("admin.aboutPhoneLabel")}
              <input
                value={aboutForm.phoneLabel}
                onChange={(e) =>
                  setAboutForm((prev) => ({ ...prev, phoneLabel: e.target.value }))
                }
              />
            </label>
            <label>
              {t("admin.aboutPhoneHint")}
              <textarea
                rows={2}
                value={aboutForm.phoneHint}
                onChange={(e) =>
                  setAboutForm((prev) => ({ ...prev, phoneHint: e.target.value }))
                }
              />
            </label>
            <button className="btn" type="submit">
              {t("admin.saveAbout")}
            </button>
          </form>
          <div>
            <form className="panel form" onSubmit={submitAboutSection}>
              <h2>
                {aboutSectionForm.id
                  ? t("admin.editAboutSection")
                  : t("admin.addAboutSection")}
              </h2>
              <label>
                {t("admin.titleLabel")}
                <input
                  value={aboutSectionForm.title}
                  onChange={(e) =>
                    setAboutSectionForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                {t("admin.sectionText")}
                <textarea
                  rows={6}
                  value={aboutSectionForm.body}
                  onChange={(e) =>
                    setAboutSectionForm((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <div className="form-actions">
                <button className="btn" type="submit">
                  {aboutSectionForm.id ? t("admin.saveChanges") : t("admin.addSection")}
                </button>
                {aboutSectionForm.id && (
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => setAboutSectionForm(emptyAboutSection)}
                  >
                    {t("admin.cancelEdit")}
                  </button>
                )}
              </div>
            </form>
            <section>
              <h2 className="list-title">{t("admin.aboutSections")}</h2>
              {about.sections.length === 0 ? (
                <p className="empty">{t("admin.noAboutSections")}</p>
              ) : (
                <ul className="admin-list">
                  {about.sections.map((item) => (
                    <li key={item.id}>
                      <div>
                        <strong>{item.title}</strong>
                        <p>
                          {item.body.slice(0, 140)}
                          {item.body.length > 140 ? "…" : ""}
                        </p>
                      </div>
                      <div className="list-actions">
                        <button
                          type="button"
                          className="text-btn"
                          onClick={() => setAboutSectionForm(item)}
                        >
                          {t("admin.edit")}
                        </button>
                        <button
                          type="button"
                          className="text-btn danger"
                          onClick={() => deleteAboutSection(item.id)}
                        >
                          {t("admin.remove")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      )}

      {tab === "donations" && (
        <div className="admin-grid">
          <form className="panel form" onSubmit={submitDonationSettings}>
            <h2>{t("admin.donationPage")}</h2>
            <label>
              {t("admin.headline")}
              <input
                value={donationForm.headline}
                onChange={(e) =>
                  setDonationForm((prev) => ({ ...prev, headline: e.target.value }))
                }
                required
              />
            </label>
            <label>
              {t("admin.invitation")}
              <textarea
                rows={5}
                value={donationForm.blurb}
                onChange={(e) =>
                  setDonationForm((prev) => ({ ...prev, blurb: e.target.value }))
                }
                required
              />
            </label>
            <label>
              {t("admin.amounts")}
              <input
                value={donationForm.amounts}
                onChange={(e) =>
                  setDonationForm((prev) => ({ ...prev, amounts: e.target.value }))
                }
                placeholder="10, 25, 50, 100"
              />
            </label>
            <label>
              {t("admin.paypal")}
              <input
                value={donationForm.paypalUrl}
                onChange={(e) =>
                  setDonationForm((prev) => ({
                    ...prev,
                    paypalUrl: e.target.value,
                  }))
                }
                placeholder="email@example.com or https://paypal.me/yourpage"
              />
            </label>
            <label>
              {t("admin.venmo")}
              <input
                value={donationForm.venmoUrl}
                onChange={(e) =>
                  setDonationForm((prev) => ({
                    ...prev,
                    venmoUrl: e.target.value,
                  }))
                }
                placeholder="@username or https://venmo.com/u/username"
              />
            </label>
            <label>
              {t("admin.cashApp")}
              <input
                value={donationForm.cashAppUrl}
                onChange={(e) =>
                  setDonationForm((prev) => ({
                    ...prev,
                    cashAppUrl: e.target.value,
                  }))
                }
                placeholder="$cashtag or https://cash.app/$cashtag"
              />
            </label>
            <label>
              {t("admin.zelle")}
              <input
                value={donationForm.zelleHandle}
                onChange={(e) =>
                  setDonationForm((prev) => ({
                    ...prev,
                    zelleHandle: e.target.value,
                  }))
                }
                placeholder="email@example.com or (201) 555-0161"
              />
            </label>
            <p className="hint">{t("admin.donationHint")}</p>
            <button className="btn" type="submit">
              {t("admin.saveDonation")}
            </button>
          </form>
          <section>
            <h2 className="list-title">
              {t("admin.recordedGifts")}
              {donations.length > 0 && (
                <span className="gift-total">
                  {" "}
                  · {giftTotal.toLocaleString(locale, {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              )}
            </h2>
            {donations.length === 0 ? (
              <p className="empty">{t("admin.noGifts")}</p>
            ) : (
              <ul className="admin-list">
                {donations.map((gift) => (
                  <li key={gift.id}>
                    <div>
                      <strong>
                        {Number(gift.amount).toLocaleString(locale, {
                          style: "currency",
                          currency: "USD",
                        })}{" "}
                        · {gift.name === "Anonymous" ? t("donate.anonymous") : gift.name}
                      </strong>
                      <p>
                        {new Date(gift.createdAt).toLocaleString(locale)}
                        {gift.method === "paypal"
                          ? " · PayPal"
                          : gift.method === "venmo"
                            ? " · Venmo"
                            : gift.method === "cashapp"
                              ? " · Cash App"
                              : gift.method === "zelle"
                                ? " · Zelle"
                                : ` · ${t("admin.recorded")}`}
                        {gift.message ? ` · ${gift.message}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-btn danger"
                      onClick={() => deleteDonation(gift.id)}
                    >
                      {t("admin.remove")}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Admin;
