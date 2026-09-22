import type { CalendarEvent } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { formatLocaleDate, formatWeekday } from "../utils/dates";

const toKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

type CalendarGridProps = {
  monthDate: Date;
  events: CalendarEvent[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onChangeMonth: (delta: number) => void;
};

const CalendarGrid = ({
  monthDate,
  events,
  selectedDate,
  onSelectDate,
  onChangeMonth,
}: CalendarGridProps) => {
  const { t, locale } = useLanguage();
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = toKey(new Date());
  const counts = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.date] = (acc[event.date] || 0) + 1;
    return acc;
  }, {});

  const cells: Array<Date | null> = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => new Date(year, month, index + 1)
    ),
  ];

  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(2024, 8, 1 + index);
    return formatWeekday(date, locale, "narrow");
  });

  const label = formatLocaleDate(monthDate, locale, {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="cal-wrap">
      <div className="cal-head">
        <button type="button" onClick={() => onChangeMonth(-1)} aria-label={t("calendar.prevMonth")}>
          ‹
        </button>
        <h2>{label}</h2>
        <button type="button" onClick={() => onChangeMonth(1)} aria-label={t("calendar.nextMonth")}>
          ›
        </button>
      </div>
      <div className="cal-grid">
        {weekdays.map((day) => (
          <div key={day} className="cal-dow">
            {day}
          </div>
        ))}
        {cells.map((date, index) => {
          if (!date) return <div key={`empty-${index}`} className="cal-cell empty" />;
          const key = toKey(date);
          const count = counts[key] || 0;
          const classes = [
            "cal-cell",
            key === todayKey ? "today" : "",
            key === selectedDate ? "selected" : "",
            count ? "has-event" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={key}
              type="button"
              className={classes}
              onClick={() => onSelectDate(key === selectedDate ? "" : key)}
            >
              <span>{date.getDate()}</span>
              {count > 0 && <i>{count}</i>}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarGrid;
