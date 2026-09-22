export type HistoryEntry = {
  id: string;
  year: string;
  title: string;
  body: string;
};

export type HistoryDraft = {
  id?: string;
  year: string;
  title: string;
  body: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export type EventDraft = {
  id?: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
};

export type VideoType = "none" | "file" | "youtube" | "vimeo" | "url";

export type VideoMeta = {
  id: string;
  title: string;
  description: string;
  type: VideoType;
  url: string;
  embedUrl?: string;
  createdAt: string;
  fileName?: string;
};

export type VideoRecord = VideoMeta & {
  playbackUrl?: string;
};

export type SaveVideoInput = {
  id?: string;
  title: string;
  description: string;
  file?: File | null;
  url: string;
};

export type ParsedVideoUrl = {
  type: VideoType;
  embedUrl: string;
  videoId: string;
};

export type DonationSettings = {
  headline: string;
  blurb: string;
  paypalUrl: string;
  venmoUrl: string;
  cashAppUrl: string;
  zelleHandle: string;
  amounts: number[];
};

export type DonationSettingsInput = {
  headline: string;
  blurb: string;
  paypalUrl: string;
  venmoUrl?: string;
  cashAppUrl?: string;
  zelleHandle?: string;
  amounts?: Array<number | string>;
};

export type DonationRecord = {
  id: string;
  amount: number;
  name: string;
  email: string;
  message: string;
  method: string;
  createdAt: string;
};

export type DonationDraft = {
  amount: number;
  name: string;
  email: string;
  message: string;
  method?: string;
};

export type AboutSection = {
  id: string;
  title: string;
  body: string;
};

export type AboutSectionDraft = {
  id?: string;
  title: string;
  body: string;
};

export type AboutPage = {
  kicker: string;
  title: string;
  lede: string;
  phone: string;
  phoneLabel: string;
  phoneHint: string;
  homeBlurb: string;
  sections: AboutSection[];
};

export type AboutPageInput = {
  kicker: string;
  title: string;
  lede: string;
  phone: string;
  phoneLabel: string;
  phoneHint: string;
  homeBlurb: string;
};

export type StorageKey =
  | "history"
  | "events"
  | "videos"
  | "donations"
  | "donationSettings"
  | "about"
  | "seeded";
