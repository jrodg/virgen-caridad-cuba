import type { AboutPage, AboutSection, CalendarEvent, DonationSettings, HistoryEntry } from "../types";

export const historyEs: Record<string, Pick<HistoryEntry, "year" | "title" | "body">> = {
  "hist-1612": {
    year: "1612",
    title: "Los tres Juanes hallan la imagen en la bahía de Nipe",
    body: "Según el testimonio que más tarde dio Juan Moreno, dos hermanos indígenas, Rodrigo y Juan de Hoyos, y el joven africano Juan Moreno recogían sal en la bahía de Nipe cuando encontraron una pequeña estatua de la Virgen María flotando sobre el agua. La imagen llevaba las palabras “Yo soy la Virgen de la Caridad.” El hallazgo se convirtió en el origen de la devoción mariana más querida de Cuba.",
  },
  "hist-1630": {
    year: "1630–1635",
    title: "De Barajagua a El Cobre",
    body: "La imagen se guardó primero en Barajagua y luego fue llevada al poblado minero de Santiago del Prado, conocido como El Cobre, en las montañas cerca de Santiago de Cuba. Allí se levantó una ermita para que mineros, familias indígenas y africanos esclavizados pudieran orar ante Nuestra Señora de la Caridad.",
  },
  "hist-1687": {
    year: "1687",
    title: "El juramento de Juan Moreno",
    body: "A unos ochenta y cinco años de edad, Juan Moreno dio cuenta formal del hallazgo ante las autoridades eclesiásticas. Su declaración sigue siendo el principal testimonio histórico del origen de la devoción y ayudó a la Iglesia a reconocer el santuario de El Cobre.",
  },
  "hist-1766": {
    year: "1766",
    title: "Terremoto y nueva ermita",
    body: "Un terremoto grave destruyó la ermita original. Los fieles reconstruyeron una iglesia mayor con tres altares, manteniendo a la Virgen en el centro de la vida del pueblo de El Cobre y atribuyendo a su intercesión muchos favores.",
  },
  "hist-1895": {
    year: "Siglo XIX",
    title: "La Virgen Mambisa",
    body: "Durante las guerras de independencia de Cuba, los mambises llevaban su imagen, cosían su medalla a los uniformes y pedían su protección. Los veteranos la llamaron después La Virgen Mambisa — la Virgen de la lucha independentista —, un título que aún une la fe y la memoria nacional Cubana.",
  },
  "hist-1916": {
    year: "1916",
    title: "Patrona de Cuba",
    body: "A petición de los veteranos de la Guerra de Independencia, el papa Benedicto XV declaró a Nuestra Señora de la Caridad del Cobre Patrona de Cuba el 10 de mayo de 1916. El 8 de septiembre, Natividad de María, quedó fijado como su fiesta en toda la isla.",
  },
  "hist-1927": {
    year: "1927",
    title: "Se concluye el santuario de El Cobre",
    body: "Tras el daño de un terremoto a una iglesia anterior, se terminó e inauguró el 8 de septiembre de 1927 un nuevo santuario de cúpulas cobrizas. Se alza sobre el pueblo de El Cobre, mirando hacia la Sierra Maestra.",
  },
  "hist-1936": {
    year: "1936",
    title: "Coronación canónica",
    body: "El papa Pío XI concedió la coronación canónica de la imagen. El 20 de diciembre de 1936, durante el Congreso Eucarístico Nacional en Santiago de Cuba, la estatua fue coronada ante una vasta congregación.",
  },
  "hist-1977": {
    year: "1977",
    title: "Basílica menor",
    body: "El papa Pablo VI elevó el Santuario Nacional de Nuestra Señora de la Caridad del Cobre al rango de basílica menor el 22 de diciembre de 1977, confirmando su lugar como corazón de la peregrinación católica Cubana.",
  },
  "hist-1998": {
    year: "1998",
    title: "San Juan Pablo II corona la imagen",
    body: "En la primera visita papal a Cuba, san Juan Pablo II viajó a Santiago y coronó solemnemente la imagen de la Virgen de la Caridad el 24 de enero de 1998, llamando a los Cubanos a la esperanza, la reconciliación y la caridad.",
  },
  "hist-2012": {
    year: "2012",
    title: "Benedicto XVI y la Rosa de Oro",
    body: "El papa Benedicto XVI visitó El Cobre por el 400 aniversario de la aparición, oró ante la imagen y honró el santuario con una Rosa de Oro.",
  },
  "hist-2015": {
    year: "2015",
    title: "El papa Francisco en El Cobre",
    body: "El papa Francisco hizo peregrinación a la basílica, oró en silencio ante la pequeña estatua y pidió a Nuestra Señora de la Caridad que cuidara del pueblo Cubano en la isla y en la diáspora.",
  },
};

export const eventsEs: Record<
  string,
  Pick<CalendarEvent, "title" | "location" | "description">
> = {
  "evt-feast-2026": {
    title: "Fiesta de Nuestra Señora de la Caridad",
    location: "Basílica de El Cobre, Santiago de Cuba",
    description:
      "Misa solemne y procesión por la Natividad de María y la fiesta de la patrona de Cuba. Los peregrinos llevan flores, velas y peticiones al santuario.",
  },
  "evt-rosary-2026": {
    title: "Rosario comunitario por Cuba",
    location: "Salón parroquial / transmisión",
    description:
      "Un rosario compartido por las familias en la isla y en el exilio, pidiendo a la Virgen de la Caridad que vele por el pueblo Cubano.",
  },
  "evt-immaculate-2026": {
    title: "Misa de la Inmaculada Concepción",
    location: "Capilla del santuario",
    description:
      "Liturgia en honor de María Inmaculada, con una lectura de la historia de la devoción en El Cobre.",
  },
  "evt-jp2-2027": {
    title: "Aniversario de la coronación papal",
    location: "Basílica de El Cobre",
    description:
      "Conmemoración de la visita de san Juan Pablo II en 1998 y de la coronación de la imagen, con vísperas y una charla sobre la caridad como camino para la nación.",
  },
  "evt-patronage-2027": {
    title: "Aniversario del patronazgo",
    location: "En línea y parroquias locales",
    description:
      "Oración vespertina que marca la declaración de 1916 de Nuestra Señora de la Caridad como Patrona de Cuba.",
  },
  "evt-novena-2027": {
    title: "Comienza la novena a la Virgen de la Caridad",
    location: "Basílica y parroquias afiliadas",
    description:
      "Nueve días de oración rumbo a la fiesta del 8 de septiembre. Cada noche recuerda un capítulo de la historia de El Cobre.",
  },
  "evt-feast-2027": {
    title: "Fiesta de Nuestra Señora de la Caridad",
    location: "Basílica de El Cobre, Santiago de Cuba",
    description:
      "Fiesta principal de la patrona de Cuba: misa solemne, procesión y ofrenda de flores en la basílica.",
  },
};

export const videosEs: Record<string, { title: string; description: string }> = {
  "vid-welcome": {
    title: "Una bienvenida al santuario de El Cobre",
    description:
      "Añade una película de peregrinación, una grabación de misa o un video de enseñanza desde el escritorio de administración. Este texto explica cómo funciona la videoteca hasta que subas el primer archivo o pegues un enlace.",
  },
};

export const donationSettingsEs: Pick<DonationSettings, "headline" | "blurb"> = {
  headline: "Un donativo de caridad",
  blurb:
    "Las ofrendas ayudan a mantener abierta esta casa de memoria: la cronología de El Cobre, las reuniones de fiesta y las películas que cuentan la historia de la patrona de Cuba. Elige una cantidad y dona en honor de La Virgen de la Caridad.",
};

export const aboutPageEs: Omit<AboutPage, "phone" | "sections"> = {
  kicker: "Quiénes somos",
  title: "Cofradía de La Caridad del Cobre en Nueva Jersey",
  lede:
    "Una familia Católica Cubana en Nueva Jersey, reunida en torno a Nuestra Señora de la Caridad — Cachita — para mantener viva la memoria de El Cobre lejos de la isla.",
  phoneLabel: "Nueva Jersey",
  phoneHint: "Llama a la cofradía para fiestas, rosarios e intenciones de familia.",
  homeBlurb:
    "Católicos Cubanos en Nueva Jersey que guardan la devoción de Cachita. Llámanos o lee cómo la cofradía reza, se reúne y sirve.",
};

export const aboutSectionsEs: Record<string, Pick<AboutSection, "title" | "body">> = {
  "about-mission": {
    title: "Nuestra misión",
    body: "Honramos a La Virgen de la Caridad del Cobre entre las familias Cubanas y sus amigos en Nueva Jersey. Guardamos su fiesta el 8 de septiembre, rezamos el rosario, acompañamos a los enfermos y enseñamos la historia de los tres Juanes a los hijos de la diáspora.",
  },
  "about-gather": {
    title: "Cómo nos reunimos",
    body: "Las misas, novenas y procesiones se publican en este calendario. Para horarios, indicaciones o para anotar una intención, llama al número de arriba. Las ofrendas de este sitio ayudan a sostener el archivo, la fiesta y las obras de caridad.",
  },
};
