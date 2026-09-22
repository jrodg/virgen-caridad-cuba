import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import {
  defaultAboutPage,
  defaultDonationSettings,
  seedEvents,
  seedHistory,
  seedVideos,
} from "../data/seed";
import type {
  AboutPage,
  CalendarEvent,
  DonationSettings,
  HistoryEntry,
  VideoRecord,
} from "../types";
import { aboutPageEs, aboutSectionsEs, donationSettingsEs, eventsEs, historyEs, videosEs } from "./seed.es";
import type { Language } from "./messages";

const unchangedFromSeed = (current: string, original: string) =>
  current.trim() === original.trim();

export const localizeHistory = (
  items: HistoryEntry[],
  language: Language
): HistoryEntry[] => {
  if (language === "en") return items;
  return items.map((item) => {
    const seed = seedHistory.find((entry) => entry.id === item.id);
    const es = historyEs[item.id];
    if (!seed || !es) return item;
    if (
      !unchangedFromSeed(item.title, seed.title) ||
      !unchangedFromSeed(item.body, seed.body)
    ) {
      return item;
    }
    return { ...item, year: es.year, title: es.title, body: es.body };
  });
};

export const localizeEvents = (
  items: CalendarEvent[],
  language: Language
): CalendarEvent[] => {
  if (language === "en") return items;
  return items.map((item) => {
    const seed = seedEvents.find((entry) => entry.id === item.id);
    const es = eventsEs[item.id];
    if (!seed || !es) return item;
    if (
      !unchangedFromSeed(item.title, seed.title) ||
      !unchangedFromSeed(item.description, seed.description)
    ) {
      return item;
    }
    return {
      ...item,
      title: es.title,
      location: es.location,
      description: es.description,
    };
  });
};

export const localizeVideos = (
  items: VideoRecord[],
  language: Language
): VideoRecord[] => {
  if (language === "en") return items;
  return items.map((item) => {
    const seed = seedVideos.find((entry) => entry.id === item.id);
    const es = videosEs[item.id];
    if (!seed || !es) return item;
    if (
      !unchangedFromSeed(item.title, seed.title) ||
      !unchangedFromSeed(item.description, seed.description)
    ) {
      return item;
    }
    return { ...item, title: es.title, description: es.description };
  });
};

export const localizeDonationSettings = (
  settings: DonationSettings,
  language: Language
): DonationSettings => {
  if (language === "en") return settings;
  if (
    !unchangedFromSeed(settings.headline, defaultDonationSettings.headline) ||
    !unchangedFromSeed(settings.blurb, defaultDonationSettings.blurb)
  ) {
    return settings;
  }
  return {
    ...settings,
    headline: donationSettingsEs.headline,
    blurb: donationSettingsEs.blurb,
  };
};

export const localizeAbout = (page: AboutPage, language: Language): AboutPage => {
  if (language === "en") return page;
  const fieldsMatch =
    unchangedFromSeed(page.kicker, defaultAboutPage.kicker) &&
    unchangedFromSeed(page.title, defaultAboutPage.title) &&
    unchangedFromSeed(page.lede, defaultAboutPage.lede) &&
    unchangedFromSeed(page.phoneLabel, defaultAboutPage.phoneLabel) &&
    unchangedFromSeed(page.phoneHint, defaultAboutPage.phoneHint) &&
    unchangedFromSeed(page.homeBlurb, defaultAboutPage.homeBlurb);
  return {
    ...page,
    ...(fieldsMatch ? aboutPageEs : {}),
    sections: page.sections.map((section) => {
      const seed = defaultAboutPage.sections.find((item) => item.id === section.id);
      const es = aboutSectionsEs[section.id];
      if (!seed || !es) return section;
      if (
        !unchangedFromSeed(section.title, seed.title) ||
        !unchangedFromSeed(section.body, seed.body)
      ) {
        return section;
      }
      return { ...section, title: es.title, body: es.body };
    }),
  };
};

export const useLocalizedContent = () => {
  const content = useContent();
  const { language } = useLanguage();
  return {
    ...content,
    history: localizeHistory(content.history, language),
    events: localizeEvents(content.events, language),
    videos: localizeVideos(content.videos, language),
    donationSettings: localizeDonationSettings(
      content.donationSettings,
      language
    ),
    about: localizeAbout(content.about, language),
  };
};
