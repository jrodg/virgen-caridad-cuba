import type {
  AboutPage,
  CalendarEvent,
  DonationSettings,
  HistoryEntry,
  VideoMeta,
} from "../types";

export const seedHistory: HistoryEntry[] = [
  {
    id: "hist-1612",
    year: "1612",
    title: "The three Juanes find the image in the Bay of Nipe",
    body: "According to the testimony later given by Juan Moreno, two Indigenous brothers, Rodrigo and Juan de Hoyos, and the young African Juan Moreno were gathering salt in the Bay of Nipe when they found a small statue of the Virgin Mary floating on the water. The image bore the words “Yo soy la Virgen de la Caridad.” The discovery became the origin story of Cuba’s most beloved Marian devotion.",
  },
  {
    id: "hist-1630",
    year: "1630–1635",
    title: "From Barajagua to El Cobre",
    body: "The image was first kept at Barajagua, then carried to the copper-mining settlement of Santiago del Prado, known as El Cobre, in the mountains near Santiago de Cuba. A hermitage was raised there so miners, Indigenous families, and enslaved Africans could pray before Our Lady of Charity.",
  },
  {
    id: "hist-1687",
    year: "1687",
    title: "Juan Moreno’s sworn testimony",
    body: "At about eighty-five years of age, Juan Moreno gave a formal account of the finding before church authorities. His statement remains the principal historical witness to the origin of the devotion and helped the Church recognize the shrine at El Cobre.",
  },
  {
    id: "hist-1766",
    year: "1766",
    title: "Earthquake and a new hermitage",
    body: "A severe earthquake destroyed the original hermitage. The faithful rebuilt a larger church with three altars, keeping the Virgin at the center of village life in El Cobre and attributing many favors to her intercession.",
  },
  {
    id: "hist-1895",
    year: "19th century",
    title: "La Virgen Mambisa",
    body: "During Cuba’s wars of independence, mambí soldiers carried her image, sewed her medal onto uniforms, and asked her protection. Veterans later called her La Virgen Mambisa — the Virgin of the independence struggle — a title that still joins faith and Cuban national memory.",
  },
  {
    id: "hist-1916",
    year: "1916",
    title: "Patroness of Cuba",
    body: "At the petition of veterans of the War of Independence, Pope Benedict XV declared Our Lady of Charity of El Cobre Patroness of Cuba on May 10, 1916. September 8, the Nativity of Mary, was set as her feast throughout the island.",
  },
  {
    id: "hist-1927",
    year: "1927",
    title: "The sanctuary of El Cobre is completed",
    body: "After an earlier church was damaged by earthquake, a new sanctuary with copper-red domes was finished and inaugurated on September 8, 1927. It stands above the village of El Cobre, looking toward the Sierra Maestra.",
  },
  {
    id: "hist-1936",
    year: "1936",
    title: "Canonical coronation",
    body: "Pope Pius XI granted a canonical coronation of the image. On December 20, 1936, during the National Eucharistic Congress in Santiago de Cuba, the statue was crowned before a vast congregation.",
  },
  {
    id: "hist-1977",
    year: "1977",
    title: "Minor basilica",
    body: "Pope Paul VI raised the National Shrine of Our Lady of Charity of El Cobre to the rank of minor basilica on December 22, 1977, confirming its place as the heart of Cuban Catholic pilgrimage.",
  },
  {
    id: "hist-1998",
    year: "1998",
    title: "Saint John Paul II crowns the image",
    body: "During the first papal visit to Cuba, Saint John Paul II traveled to Santiago and solemnly crowned the image of the Virgin of Charity on January 24, 1998, calling Cubans to hope, reconciliation, and charity.",
  },
  {
    id: "hist-2012",
    year: "2012",
    title: "Pope Benedict XVI and the Golden Rose",
    body: "Pope Benedict XVI visited El Cobre for the 400th anniversary of the apparition, prayed before the image, and honored the shrine with a Golden Rose.",
  },
  {
    id: "hist-2015",
    year: "2015",
    title: "Pope Francis at El Cobre",
    body: "Pope Francis made pilgrimage to the basilica, prayed in silence before the small statue, and asked Our Lady of Charity to care for the Cuban people at home and in the diaspora.",
  },
];

export const seedEvents: CalendarEvent[] = [
  {
    id: "evt-feast-2026",
    title: "Feast of Our Lady of Charity",
    date: "2026-09-08",
    time: "10:00",
    location: "Basilica of El Cobre, Santiago de Cuba",
    description:
      "Solemn Mass and procession for the Nativity of Mary and the feast of Cuba’s patroness. Pilgrims bring flowers, candles, and petitions to the shrine.",
  },
  {
    id: "evt-rosary-2026",
    title: "Community rosary for Cuba",
    date: "2026-10-12",
    time: "18:00",
    location: "Parish hall / livestream",
    description:
      "A shared rosary offered for families on the island and in exile, asking the Virgin of Charity to keep watch over the Cuban people.",
  },
  {
    id: "evt-immaculate-2026",
    title: "Mass of the Immaculate Conception",
    date: "2026-12-08",
    time: "11:00",
    location: "Shrine chapel",
    description:
      "Liturgy in honor of Mary Immaculate, with a reading from the history of the devotion at El Cobre.",
  },
  {
    id: "evt-jp2-2027",
    title: "Anniversary of the papal crowning",
    date: "2027-01-24",
    time: "17:00",
    location: "Basilica of El Cobre",
    description:
      "Commemoration of Saint John Paul II’s 1998 visit and crowning of the image, with vespers and a talk on charity as a path for the nation.",
  },
  {
    id: "evt-patronage-2027",
    title: "Patronage anniversary",
    date: "2027-05-10",
    time: "19:00",
    location: "Online and local parishes",
    description:
      "Evening prayer marking the 1916 declaration of Our Lady of Charity as Patroness of Cuba.",
  },
  {
    id: "evt-novena-2027",
    title: "Novena to the Virgin of Charity begins",
    date: "2027-08-30",
    time: "18:30",
    location: "Basilica and affiliated parishes",
    description:
      "Nine days of prayer leading to the September 8 feast. Each night recalls a chapter in the history of El Cobre.",
  },
  {
    id: "evt-feast-2027",
    title: "Feast of Our Lady of Charity",
    date: "2027-09-08",
    time: "10:00",
    location: "Basilica of El Cobre, Santiago de Cuba",
    description:
      "Principal feast of Cuba’s patroness: solemn Mass, procession, and offering of flowers at the basilica.",
  },
];

export const defaultDonationSettings: DonationSettings = {
  headline: "A gift of charity",
  blurb:
    "Offerings help keep this house of memory open: the timeline of El Cobre, feast-day gatherings, and films that tell the story of Cuba’s patroness. Choose an amount and donate in honor of La Virgen de la Caridad.",
  paypalUrl: "",
  venmoUrl: "",
  cashAppUrl: "",
  zelleHandle: "",
  amounts: [10, 25, 50, 100],
};

export const seedVideos: VideoMeta[] = [
  {
    id: "vid-welcome",
    title: "A welcome to the shrine of El Cobre",
    description:
      "Add a pilgrimage film, Mass recording, or teaching video from the admin desk. This placeholder explains how the video library works until you upload the first file or paste a link.",
    type: "none",
    url: "",
    createdAt: "2026-09-01T12:00:00.000Z",
  },
];

export const defaultAboutPage: AboutPage = {
  kicker: "Who we are",
  title: "Confraternity Of La Caridad del Cobre in New Jersey",
  lede:
    "A Cuban Catholic family in New Jersey, gathered around Our Lady of Charity — Cachita — to keep the memory of El Cobre alive far from the island.",
  phone: "(201) 555-0161",
  phoneLabel: "New Jersey",
  phoneHint: "Call the confraternity for feast days, rosaries, and family intentions.",
  homeBlurb:
    "Cuban Catholics in New Jersey keeping the devotion of Cachita. Call us or read how the confraternity prays, gathers, and serves.",
  sections: [
    {
      id: "about-mission",
      title: "Our mission",
      body: "We honor La Virgen de la Caridad del Cobre among Cuban families and friends in New Jersey. We keep her feast on 8 September, pray the rosary, accompany the sick, and teach the story of the three Juanes to the children of the diaspora.",
    },
    {
      id: "about-gather",
      title: "How we gather",
      body: "Masses, novenas, and processions are posted on this calendar. For times, directions, or to enroll an intention, call the number above. Offerings given through this site help sustain the archive, the feast, and works of charity.",
    },
  ],
};
