const capitalizeWord = (value: string, locale: string) =>
  value ? value.charAt(0).toLocaleUpperCase(locale) + value.slice(1) : value;

export const formatLocaleDate = (
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions
) =>
  new Intl.DateTimeFormat(locale, options)
    .formatToParts(date)
    .map((part) => {
      if ((part.type !== "month" && part.type !== "weekday") || !part.value) {
        return part.value;
      }
      return capitalizeWord(part.value, locale);
    })
    .join("");

export const formatWeekday = (
  date: Date,
  locale: string,
  weekday: Intl.DateTimeFormatOptions["weekday"] = "narrow"
) =>
  capitalizeWord(
    new Intl.DateTimeFormat(locale, { weekday }).format(date),
    locale
  );
