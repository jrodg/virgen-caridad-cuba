import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  defaultAboutPage,
  defaultDonationSettings,
  seedEvents,
  seedHistory,
  seedVideos,
} from "../data/seed";
import type {
  AboutPage,
  AboutPageInput,
  AboutSection,
  AboutSectionDraft,
  CalendarEvent,
  DonationDraft,
  DonationRecord,
  DonationSettings,
  DonationSettingsInput,
  EventDraft,
  HistoryDraft,
  HistoryEntry,
  SaveVideoInput,
  VideoMeta,
  VideoRecord,
} from "../types";
import {
  createId,
  deleteVideoBlob,
  getVideoBlob,
  hasSeeded,
  loadJson,
  markSeeded,
  parseVideoUrl,
  saveJson,
  saveVideoBlob,
} from "../utils/storage";

type ContentContextValue = {
  ready: boolean;
  history: HistoryEntry[];
  events: CalendarEvent[];
  videos: VideoRecord[];
  donations: DonationRecord[];
  donationSettings: DonationSettings;
  about: AboutPage;
  saveHistory: (entry: HistoryDraft) => void;
  deleteHistory: (id: string) => void;
  saveEvent: (entry: EventDraft) => void;
  deleteEvent: (id: string) => void;
  saveVideo: (input: SaveVideoInput) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  saveDonationSettings: (settings: DonationSettingsInput) => void;
  saveDonation: (entry: DonationDraft) => DonationRecord;
  deleteDonation: (id: string) => void;
  saveAboutPage: (page: AboutPageInput) => void;
  saveAboutSection: (entry: AboutSectionDraft) => void;
  deleteAboutSection: (id: string) => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

const toVideoMeta = ({ playbackUrl: _playbackUrl, ...meta }: VideoRecord): VideoMeta =>
  meta;

const hydrateVideos = async (records: VideoMeta[]): Promise<VideoRecord[]> =>
  Promise.all(
    records.map(async (video) => {
      if (video.type === "file") {
        try {
          const blob = await getVideoBlob(video.id);
          return {
            ...video,
            playbackUrl: blob ? URL.createObjectURL(blob) : "",
          };
        } catch {
          return { ...video, playbackUrl: "" };
        }
      }
      return { ...video, playbackUrl: video.embedUrl || "" };
    })
  );

type ContentProviderProps = {
  children: ReactNode;
};

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [donationSettings, setDonationSettings] = useState<DonationSettings>(
    defaultDonationSettings
  );
  const [about, setAbout] = useState<AboutPage>(defaultAboutPage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      if (!hasSeeded()) {
        saveJson("history", seedHistory);
        saveJson("events", seedEvents);
        saveJson(
          "videos",
          seedVideos.filter((video) => video.type !== "none")
        );
        saveJson("donationSettings", defaultDonationSettings);
        saveJson("about", defaultAboutPage);
        saveJson("donations", []);
        markSeeded();
      }

      const historyData = loadJson("history", seedHistory);
      const eventsData = loadJson("events", seedEvents);
      const videoMeta = loadJson<VideoMeta[]>("videos", []);
      const hydrated = await hydrateVideos(videoMeta);
      const loadedAbout = loadJson<Partial<AboutPage>>("about", defaultAboutPage);
      if (cancelled) return;
      setHistory(historyData);
      setEvents(eventsData);
      setVideos(hydrated);
      setDonationSettings({
        ...defaultDonationSettings,
        ...loadJson("donationSettings", defaultDonationSettings),
      });
      setAbout({
        ...defaultAboutPage,
        ...loadedAbout,
        sections: Array.isArray(loadedAbout.sections)
          ? loadedAbout.sections
          : defaultAboutPage.sections,
      });
      setDonations(loadJson("donations", []));
      setReady(true);
    };

    boot().catch(() => {
      if (cancelled) return;
      setHistory(loadJson("history", seedHistory));
      setEvents(loadJson("events", seedEvents));
      setVideos(loadJson("videos", []));
      setDonationSettings({
        ...defaultDonationSettings,
        ...loadJson("donationSettings", defaultDonationSettings),
      });
      setAbout(loadJson("about", defaultAboutPage));
      setDonations(loadJson("donations", []));
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const videosRef = useRef(videos);
  videosRef.current = videos;
  useEffect(
    () => () => {
      videosRef.current.forEach((video) => {
        if (video.type === "file" && video.playbackUrl) {
          URL.revokeObjectURL(video.playbackUrl);
        }
      });
    },
    []
  );

  const value = useMemo<ContentContextValue>(
    () => ({
      ready,
      history: [...history].sort((a, b) =>
        String(a.year).localeCompare(String(b.year), undefined, {
          numeric: true,
        })
      ),
      events: [...events].sort((a, b) => a.date.localeCompare(b.date)),
      videos: [...videos].sort((a, b) =>
        (b.createdAt || "").localeCompare(a.createdAt || "")
      ),
      donations: [...donations].sort((a, b) =>
        (b.createdAt || "").localeCompare(a.createdAt || "")
      ),
      donationSettings,
      about,
      saveHistory: (entry) => {
        setHistory((prev) => {
          const record: HistoryEntry = {
            ...entry,
            id: entry.id || createId("hist"),
            year: entry.year.trim(),
            title: entry.title.trim(),
            body: entry.body.trim(),
          };
          const next = entry.id
            ? prev.map((item) => (item.id === entry.id ? record : item))
            : [record, ...prev];
          saveJson("history", next);
          return next;
        });
      },
      deleteHistory: (id) => {
        setHistory((prev) => {
          const next = prev.filter((item) => item.id !== id);
          saveJson("history", next);
          return next;
        });
      },
      saveEvent: (entry) => {
        setEvents((prev) => {
          const record: CalendarEvent = {
            ...entry,
            id: entry.id || createId("evt"),
            title: entry.title.trim(),
            date: entry.date,
            time: entry.time || "",
            location: entry.location.trim(),
            description: entry.description.trim(),
          };
          const next = entry.id
            ? prev.map((item) => (item.id === entry.id ? record : item))
            : [record, ...prev];
          saveJson("events", next);
          return next;
        });
      },
      deleteEvent: (id) => {
        setEvents((prev) => {
          const next = prev.filter((item) => item.id !== id);
          saveJson("events", next);
          return next;
        });
      },
      saveVideo: async ({ id, title, description, file, url }) => {
        const recordId = id || createId("vid");
        let record: VideoRecord;

        if (file) {
          await saveVideoBlob(recordId, file);
          record = {
            id: recordId,
            title: title.trim(),
            description: description.trim(),
            type: "file",
            url: "",
            embedUrl: "",
            createdAt: new Date().toISOString(),
            playbackUrl: URL.createObjectURL(file),
            fileName: file.name,
          };
        } else {
          const parsed = parseVideoUrl(url);
          record = {
            id: recordId,
            title: title.trim(),
            description: description.trim(),
            type: parsed.type,
            url: url.trim(),
            embedUrl: parsed.embedUrl,
            createdAt: new Date().toISOString(),
            playbackUrl: parsed.embedUrl,
            fileName: "",
          };
        }

        setVideos((prev) => {
          const without = prev.filter((item) => item.id !== recordId);
          const next = [record, ...without];
          saveJson("videos", next.map(toVideoMeta));
          return next;
        });
      },
      deleteVideo: async (id) => {
        await deleteVideoBlob(id);
        setVideos((prev) => {
          const target = prev.find((item) => item.id === id);
          if (target?.type === "file" && target.playbackUrl) {
            URL.revokeObjectURL(target.playbackUrl);
          }
          const next = prev.filter((item) => item.id !== id);
          saveJson("videos", next.map(toVideoMeta));
          return next;
        });
      },
      saveDonationSettings: (settings) => {
        const next: DonationSettings = {
          ...defaultDonationSettings,
          ...settings,
          headline: settings.headline.trim(),
          blurb: settings.blurb.trim(),
          paypalUrl: settings.paypalUrl.trim(),
          venmoUrl: (settings.venmoUrl || "").trim(),
          cashAppUrl: (settings.cashAppUrl || "").trim(),
          zelleHandle: (settings.zelleHandle || "").trim(),
          amounts: (settings.amounts || defaultDonationSettings.amounts)
            .map((value) => Number(value))
            .filter((value) => Number.isFinite(value) && value > 0),
        };
        saveJson("donationSettings", next);
        setDonationSettings(next);
      },
      saveDonation: (entry) => {
        const record: DonationRecord = {
          id: createId("gift"),
          amount: Number(entry.amount),
          name: (entry.name || "").trim() || "Anonymous",
          email: (entry.email || "").trim(),
          message: (entry.message || "").trim(),
          method: entry.method || "recorded",
          createdAt: new Date().toISOString(),
        };
        setDonations((prev) => {
          const next = [record, ...prev];
          saveJson("donations", next);
          return next;
        });
        return record;
      },
      deleteDonation: (id) => {
        setDonations((prev) => {
          const next = prev.filter((item) => item.id !== id);
          saveJson("donations", next);
          return next;
        });
      },
      saveAboutPage: (page) => {
        setAbout((prev) => {
          const next: AboutPage = {
            ...prev,
            kicker: page.kicker.trim(),
            title: page.title.trim(),
            lede: page.lede.trim(),
            phone: page.phone.trim(),
            phoneLabel: page.phoneLabel.trim(),
            phoneHint: page.phoneHint.trim(),
            homeBlurb: page.homeBlurb.trim(),
          };
          saveJson("about", next);
          return next;
        });
      },
      saveAboutSection: (entry) => {
        setAbout((prev) => {
          const record: AboutSection = {
            id: entry.id || createId("about"),
            title: entry.title.trim(),
            body: entry.body.trim(),
          };
          const sections = entry.id
            ? prev.sections.map((item) => (item.id === entry.id ? record : item))
            : [...prev.sections, record];
          const next = { ...prev, sections };
          saveJson("about", next);
          return next;
        });
      },
      deleteAboutSection: (id) => {
        setAbout((prev) => {
          const next = {
            ...prev,
            sections: prev.sections.filter((item) => item.id !== id),
          };
          saveJson("about", next);
          return next;
        });
      },
    }),
    [about, donations, donationSettings, events, history, ready, videos]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
};
