import { useEffect, useMemo, useState } from "react";
import CalendarGrid from "../components/CalendarGrid";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedContent } from "../i18n/localize";
import { formatLocaleDate } from "../utils/dates";

const PAGE_SIZE = 3;

const Calendar = () => {
  const { t, locale } = useLanguage();
  const { events, ready } = useLocalizedContent();
  const [monthDate, setMonthDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(0);

  const formatDate = (iso: string) =>
    formatLocaleDate(new Date(`${iso}T12:00:00`), locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const visible = useMemo(() => {
    if (!selectedDate) return events;
    return events.filter((event) => event.date === selectedDate);
  }, [events, selectedDate]);

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));

  useEffect(() => {
    setPage(0);
  }, [selectedDate]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const paged = visible.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="page">
      <header className="page-hero">
        <p className="kicker">{t("calendar.kicker")}</p>
        <h1>{t("calendar.title")}</h1>
        <p className="lede">{t("calendar.lede")}</p>
      </header>
      <div className="calendar-layout">
        <CalendarGrid
          monthDate={monthDate}
          events={events}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onChangeMonth={(delta) =>
            setMonthDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
            )
          }
        />
        <section className="event-pane">
          <div className="section-head">
            <h2>{selectedDate ? formatDate(selectedDate) : t("calendar.allEvents")}</h2>
            {selectedDate && (
              <button type="button" className="text-btn" onClick={() => setSelectedDate("")}>
                {t("calendar.showAll")}
              </button>
            )}
          </div>
          {!ready ? null : visible.length === 0 ? (
            <p className="empty">
              {selectedDate ? t("calendar.emptyDate") : t("calendar.emptyAll")}
            </p>
          ) : (
            <>
              <p className="event-count">
                {visible.length === 1
                  ? t("calendar.eventCountOne")
                  : t("calendar.eventCount", { count: visible.length })}
              </p>
              {pageCount > 1 && (
                <div className="event-pager">
                  <button
                    type="button"
                    className="btn ghost"
                    disabled={page === 0}
                    onClick={() => setPage((current) => Math.max(0, current - 1))}
                  >
                    {t("calendar.prevEvents")}
                  </button>
                  <p>{t("calendar.pageOf", { page: page + 1, pages: pageCount })}</p>
                  <button
                    type="button"
                    className="btn ghost"
                    disabled={page >= pageCount - 1}
                    onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
                  >
                    {t("calendar.nextEvents")}
                  </button>
                </div>
              )}
              <ul className="event-cards">
                {paged.map((event) => (
                  <li key={event.id}>
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                    <h3>{event.title}</h3>
                    <p className="event-when">
                      {event.time && <span>{event.time}</span>}
                      {event.location && <span>{event.location}</span>}
                    </p>
                    {event.description && <p>{event.description}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Calendar;
