export type Language = "en" | "es";

export const languageOptions: Array<{ value: Language; label: string }> = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export const locales: Record<Language, string> = {
  en: "en-US",
  es: "es-ES",
};

const en = {
  language: {
    label: "Language",
  },
  nav: {
    home: "Home",
    history: "History",
    videos: "Videos",
    calendar: "Calendar",
    whoWeAre: "Who we are",
    donate: "Donate",
    admin: "Admin",
    signOut: "Sign out",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  brand: {
    name: "La Caridad del Cobre",
    tagline: "Patroness of Cuba",
    flag: "Flag of Cuba",
    rose: "Golden Rose of El Cobre",
  },
  footer: {
    kicker: "National Shrine",
    place: "Basilica of Our Lady of Charity of El Cobre · Santiago de Cuba",
    note: "Feast day 8 September · “Yo soy la Virgen de la Caridad”",
    confraternity: "Confraternity of La Caridad del Cobre in New Jersey",
    call: "Call",
  },
  home: {
    kicker: "La Virgen de la Caridad del Cobre",
    title: "Mother of the Cuban people, star over the Bay of Nipe.",
    lede:
      "This house of memory gathers the story of Cuba’s patroness: the small image found on the water, the shrine in the copper hills of El Cobre, and the prayers of a people at home and far from the island.",
    readHistory: "Read the history",
    seeCalendar: "See the calendar",
    statPatroness: "Patroness",
    statPatronessDate: "10 May 1916",
    statPatronessBody:
      "Declared by Pope Benedict XV at the request of independence veterans.",
    statFeast: "Feast day",
    statFeastDate: "8 September",
    statFeastBody: "The Nativity of Mary, kept throughout Cuba and the diaspora.",
    statShrine: "Shrine",
    statShrinePlace: "El Cobre",
    statShrineBody:
      "National basilica in the Sierra Maestra, near Santiago de Cuba.",
    storyKicker: "The story",
    storyTitle: "A sign of charity for every Cuban.",
    storyP1:
      "In the early seventeenth century, two Indigenous brothers and a young African named Juan Moreno found a statue of the Virgin floating in the Bay of Nipe. They brought her to the mining village of El Cobre. From that copper country she became mother to the island: invoked by mambí soldiers, crowned by popes, and loved in exile as Cachita.",
    storyP2:
      "Here you can follow that history in order, watch films and recorded liturgies, keep the feast days of the shrine, and offer a gift of charity.",
    givingKicker: "Charity",
    givingTitle: "Offer a gift for El Cobre.",
    givingBody:
      "Donations help sustain this archive of history, feast days, and pilgrimage films in honor of Cuba’s patroness.",
    upcoming: "Upcoming gatherings",
    fullCalendar: "Full calendar",
    noUpcoming: "No upcoming events are posted yet.",
    videoLibrary: "From the video library",
    allVideos: "All videos",
    watch: "Watch",
    noFeaturedVideo:
      "When an administrator uploads a film or pastes a video link, it will appear here.",
    portraitAlt:
      "The original image of Our Lady of Charity of El Cobre, in her gold mantle at the national shrine",
    portraitCaption: "The original image of La Caridad del Cobre",
    portraitCredit: "Photo: Trinidad14, Wikimedia Commons, CC BY-SA 4.0",
    basilicaAlt:
      "Original icon of the Golden Rose and the Basilica of El Cobre",
    basilicaCaption: "The Golden Rose of El Cobre",
    meetConfraternity: "Meet the confraternity",
  },
  about: {
    kicker: "Who we are",
    title: "Confraternity Of La Caridad del Cobre in New Jersey",
    lede:
      "A Cuban Catholic family in New Jersey, gathered around Our Lady of Charity — Cachita — to keep the memory of El Cobre alive far from the island.",
    phoneLabel: "New Jersey",
    phone: "(201) 555-0161",
    phoneHref: "tel:+12015550161",
    phoneHint: "Call the confraternity for feast days, rosaries, and family intentions.",
    missionTitle: "Our mission",
    mission:
      "We honor La Virgen de la Caridad del Cobre among Cuban families and friends in New Jersey. We keep her feast on 8 September, pray the rosary, accompany the sick, and teach the story of the three Juanes to the children of the diaspora.",
    gatherTitle: "How we gather",
    gather:
      "Masses, novenas, and processions are posted on this calendar. For times, directions, or to enroll an intention, call the number above. Offerings given through this site help sustain the archive, the feast, and works of charity.",
    homeBlurb:
      "Cuban Catholics in New Jersey keeping the devotion of Cachita. Call us or read how the confraternity prays, gathers, and serves.",
    empty: "The confraternity has not published Who we are sections yet.",
  },
  history: {
    kicker: "Chronicle",
    title: "Historical events",
    lede:
      "A living timeline of Our Lady of Charity of El Cobre, from the Bay of Nipe to the basilica in the copper hills. Administrators may add new entries as research and parish memory grow.",
    empty: "No historical entries have been published yet.",
  },
  videos: {
    kicker: "Library",
    title: "Videos",
    lede:
      "Pilgrimage films, feast-day liturgies, and teachings uploaded by the shrine administrator — stored on this site for visitors to watch.",
    empty:
      "No videos have been added yet. An administrator can upload a file or paste a YouTube or Vimeo link from the Admin desk.",
    unavailable: "This video is not available to play yet.",
    unsupported: "Sorry, your browser cannot play this video.",
  },
  calendar: {
    kicker: "Shrine year",
    title: "Calendar of events",
    lede:
      "Feasts, novenas, and parish gatherings. Select a highlighted day to filter the list, or browse the full schedule below.",
    allEvents: "All events",
    showAll: "Show all",
    emptyDate: "No events on this date.",
    emptyAll: "No events have been added yet.",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    prevEvents: "Previous",
    nextEvents: "Next",
    pageOf: "Page {page} of {pages}",
    eventCount: "{count} events",
    eventCountOne: "1 event",
  },
  donate: {
    kicker: "Offerings",
    chooseAmount: "Choose an amount",
    otherAmount: "Or another amount",
    name: "Name",
    email: "Email",
    note: "Intention or note",
    optional: "(optional)",
    notePlaceholder: "In thanksgiving, for a family, for Cuba…",
    submit: "Donate",
    submitAmount: "Donate {amount}",
    hintPaypal:
      "Choose how to send your gift. PayPal, Venmo, and Cash App open in a new window with your amount.",
    hintRecorded:
      "Gifts are recorded on this site. An administrator can add PayPal, Venmo, Cash App, or Zelle to collect live payments.",
    hintZelle:
      "After you continue, send this amount with Zelle to {handle}.",
    errorAmount: "Please choose or enter an amount greater than zero.",
    errorMethod: "Please choose how you would like to give.",
    thanksKicker: "Thank you",
    thanksTitle: "Your gift is received with charity.",
    thanksPaypal:
      " is opening with your payment app. Complete the gift in that window.",
    thanksZelle:
      " — please send this amount with Zelle to {handle}.",
    thanksRecorded:
      " has been recorded for the shrine desk. An administrator can connect PayPal, Venmo, Cash App, or Zelle when ready to collect live payments.",
    returnHome: "Return home",
    giveAgain: "Give again",
    anonymous: "Anonymous",
    chooseMethod: "Give with",
    methodPaypal: "PayPal",
    methodVenmo: "Venmo",
    methodCashApp: "Cash App",
    methodZelle: "Zelle",
  },
  adminLogin: {
    kicker: "Stewardship",
    title: "Administrator sign in",
    lede:
      "Sign in to upload videos, publish calendar events, and write historical entries. This demo keeps the session in your browser only.",
    username: "Username",
    password: "Password",
    submit: "Enter the desk",
    error: "Those credentials were not recognized.",
  },
  admin: {
    kicker: "Administrator",
    title: "Shrine desk",
    lede:
      "Publish videos, calendar events, historical text, who we are, and donation settings. Changes are saved in this browser so the public pages update immediately.",
    tabVideos: "Videos",
    tabCalendar: "Calendar",
    tabHistory: "History",
    tabAbout: "Who we are",
    tabDonations: "Donations",
    uploadVideo: "Upload or link a video",
    titleLabel: "Title",
    description: "Description",
    videoFile: "Video file",
    videoUrl: "Or YouTube / Vimeo / video URL",
    publishVideo: "Publish video",
    saving: "Saving…",
    publishedVideos: "Published videos",
    noneYet: "None yet.",
    uploadedFile: "Uploaded file",
    remove: "Remove",
    edit: "Edit",
    createEvent: "Create calendar event",
    editEvent: "Edit event",
    date: "Date",
    time: "Time",
    location: "Location",
    addEvent: "Add event",
    saveChanges: "Save changes",
    cancelEdit: "Cancel edit",
    scheduledEvents: "Scheduled events",
    enterHistory: "Enter historical event",
    editHistory: "Edit historical event",
    year: "Year or period",
    historicalText: "Historical text",
    publishEntry: "Publish entry",
    publishedHistory: "Published history",
    donationPage: "Donation page",
    headline: "Headline",
    invitation: "Invitation text",
    amounts: "Suggested amounts (USD, comma separated)",
    paypal: "PayPal email or donate URL",
    venmo: "Venmo username or URL",
    cashApp: "Cash App $cashtag or URL",
    zelle: "Zelle email or phone",
    donationHint:
      "Fill in any methods you accept. Leave all blank to record gifts on the site only. Donors will choose among the methods you add.",
    saveDonation: "Save donation settings",
    recordedGifts: "Recorded gifts",
    noGifts: "No gifts recorded yet.",
    recorded: "Recorded",
    needVideo: "Choose a video file or paste a link.",
    videoTooLarge: "Please keep uploads under 80 MB.",
    videoPublished: "Video published.",
    videoFailed: "The video could not be saved in this browser.",
    eventUpdated: "Event updated.",
    eventAdded: "Event added to the calendar.",
    historyUpdated: "Historical entry updated.",
    historyPublished: "Historical entry published.",
    donationSaved: "Donation settings saved.",
    aboutPage: "Who we are page",
    aboutKicker: "Eyebrow label",
    aboutIntro: "Introduction",
    aboutHomeBlurb: "Home page summary",
    aboutPhone: "Phone number",
    aboutPhoneLabel: "Phone label",
    aboutPhoneHint: "Phone note",
    saveAbout: "Save who we are",
    aboutSaved: "Who we are page saved.",
    addAboutSection: "Add a section",
    editAboutSection: "Edit section",
    sectionText: "Section text",
    addSection: "Add section",
    aboutSections: "Sections on this page",
    noAboutSections: "No sections yet. Add one to appear on Who we are.",
    sectionAdded: "Section added.",
    sectionUpdated: "Section updated.",
  },
};

const es: typeof en = {
  language: {
    label: "Idioma",
  },
  nav: {
    home: "Inicio",
    history: "Historia",
    videos: "Videos",
    calendar: "Calendario",
    whoWeAre: "Quiénes somos",
    donate: "Donar",
    admin: "Admin",
    signOut: "Salir",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  brand: {
    name: "La Caridad del Cobre",
    tagline: "Patrona de Cuba",
    flag: "Bandera de Cuba",
    rose: "Rosa de Oro de El Cobre",
  },
  footer: {
    kicker: "Santuario Nacional",
    place: "Basílica de Nuestra Señora de la Caridad del Cobre · Santiago de Cuba",
    note: "Fiesta el 8 de septiembre · “Yo soy la Virgen de la Caridad”",
    confraternity: "Cofradía de La Caridad del Cobre en Nueva Jersey",
    call: "Llamar",
  },
  home: {
    kicker: "La Virgen de la Caridad del Cobre",
    title: "Madre del pueblo Cubano, estrella sobre la bahía de Nipe.",
    lede:
      "Esta casa de memoria reúne la historia de la patrona de Cuba: la pequeña imagen hallada sobre las aguas, el santuario en los cerros de cobre de El Cobre, y las oraciones de un pueblo en la isla y lejos de ella.",
    readHistory: "Leer la historia",
    seeCalendar: "Ver el calendario",
    statPatroness: "Patrona",
    statPatronessDate: "10 de mayo de 1916",
    statPatronessBody:
      "Declarada por el papa Benedicto XV a petición de los veteranos de la independencia.",
    statFeast: "Fiesta",
    statFeastDate: "8 de septiembre",
    statFeastBody: "La Natividad de María, celebrada en Cuba y en la diáspora.",
    statShrine: "Santuario",
    statShrinePlace: "El Cobre",
    statShrineBody:
      "Basílica nacional en la Sierra Maestra, cerca de Santiago de Cuba.",
    storyKicker: "La historia",
    storyTitle: "Una señal de caridad para cada cubano.",
    storyP1:
      "A principios del siglo XVII, dos hermanos indígenas y un joven africano llamado Juan Moreno hallaron una estatua de la Virgen flotando en la bahía de Nipe. La llevaron al pueblo minero de El Cobre. Desde aquel país del cobre se hizo madre de la isla: invocada por los mambises, coronada por los papas y amada en el exilio como Cachita.",
    storyP2:
      "Aquí puedes seguir esa historia en orden, ver películas y liturgias grabadas, guardar las fiestas del santuario y ofrecer un donativo de caridad.",
    givingKicker: "Caridad",
    givingTitle: "Ofrece un donativo por El Cobre.",
    givingBody:
      "Las ofrendas ayudan a sostener este archivo de historia, fiestas y películas de peregrinación en honor de la patrona de Cuba.",
    upcoming: "Próximas reuniones",
    fullCalendar: "Calendario completo",
    noUpcoming: "Aún no hay eventos próximos publicados.",
    videoLibrary: "De la videoteca",
    allVideos: "Todos los videos",
    watch: "Ver",
    noFeaturedVideo:
      "Cuando un administrador suba una película o pegue un enlace de video, aparecerá aquí.",
    portraitAlt:
      "La imagen original de Nuestra Señora de la Caridad del Cobre, con su manto de oro en el santuario nacional",
    portraitCaption: "La imagen original de La Caridad del Cobre",
    portraitCredit: "Foto: Trinidad14, Wikimedia Commons, CC BY-SA 4.0",
    basilicaAlt:
      "Icono original de la Rosa de Oro y la Basílica de El Cobre",
    basilicaCaption: "La Rosa de Oro de El Cobre",
    meetConfraternity: "Conoce la cofradía",
  },
  about: {
    kicker: "Quiénes somos",
    title: "Cofradía de La Caridad del Cobre en Nueva Jersey",
    lede:
      "Una familia Católica Cubana en Nueva Jersey, reunida en torno a Nuestra Señora de la Caridad — Cachita — para mantener viva la memoria de El Cobre lejos de la isla.",
    phoneLabel: "Nueva Jersey",
    phone: "(201) 555-0161",
    phoneHref: "tel:+12015550161",
    phoneHint: "Llama a la cofradía para fiestas, rosarios e intenciones de familia.",
    missionTitle: "Nuestra misión",
    mission:
      "Honramos a La Virgen de la Caridad del Cobre entre las familias Cubanas y sus amigos en Nueva Jersey. Guardamos su fiesta el 8 de septiembre, rezamos el rosario, acompañamos a los enfermos y enseñamos la historia de los tres Juanes a los hijos de la diáspora.",
    gatherTitle: "Cómo nos reunimos",
    gather:
      "Las misas, novenas y procesiones se publican en este calendario. Para horarios, indicaciones o para anotar una intención, llama al número de arriba. Las ofrendas de este sitio ayudan a sostener el archivo, la fiesta y las obras de caridad.",
    homeBlurb:
      "Católicos Cubanos en Nueva Jersey que guardan la devoción de Cachita. Llámanos o lee cómo la cofradía reza, se reúne y sirve.",
    empty: "La cofradía aún no ha publicado secciones de Quiénes somos.",
  },
  history: {
    kicker: "Crónica",
    title: "Hechos históricos",
    lede:
      "Una línea de tiempo viva de Nuestra Señora de la Caridad del Cobre, desde la bahía de Nipe hasta la basílica en los cerros de cobre. Los administradores pueden añadir entradas a medida que crecen la investigación y la memoria parroquial.",
    empty: "Aún no se han publicado entradas históricas.",
  },
  videos: {
    kicker: "Videoteca",
    title: "Videos",
    lede:
      "Películas de peregrinación, liturgias de fiesta y enseñanzas subidas por el administrador del santuario, guardadas en este sitio para que los visitantes las vean.",
    empty:
      "Aún no se han añadido videos. Un administrador puede subir un archivo o pegar un enlace de YouTube o Vimeo desde el escritorio de Admin.",
    unavailable: "Este video aún no se puede reproducir.",
    unsupported: "Lo sentimos, tu navegador no puede reproducir este video.",
  },
  calendar: {
    kicker: "Año del santuario",
    title: "Calendario de eventos",
    lede:
      "Fiestas, novenas y reuniones parroquiales. Selecciona un día destacado para filtrar la lista, o recorre el programa completo abajo.",
    allEvents: "Todos los eventos",
    showAll: "Ver todos",
    emptyDate: "No hay eventos en esta fecha.",
    emptyAll: "Aún no se han añadido eventos.",
    prevMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
    prevEvents: "Anterior",
    nextEvents: "Siguiente",
    pageOf: "Página {page} de {pages}",
    eventCount: "{count} eventos",
    eventCountOne: "1 evento",
  },
  donate: {
    kicker: "Ofrendas",
    chooseAmount: "Elige una cantidad",
    otherAmount: "Otra cantidad",
    name: "Nombre",
    email: "Correo",
    note: "Intención o nota",
    optional: "(opcional)",
    notePlaceholder: "En acción de gracias, por una familia, por Cuba…",
    submit: "Donar",
    submitAmount: "Donar {amount}",
    hintPaypal:
      "Elige cómo enviar tu ofrenda. PayPal, Venmo y Cash App se abren en una ventana nueva con tu cantidad.",
    hintRecorded:
      "Los donativos se registran en este sitio. Un administrador puede añadir PayPal, Venmo, Cash App o Zelle para recibir pagos en vivo.",
    hintZelle:
      "Después de continuar, envía esta cantidad con Zelle a {handle}.",
    errorAmount: "Elige o escribe una cantidad mayor que cero.",
    errorMethod: "Elige cómo quieres donar.",
    thanksKicker: "Gracias",
    thanksTitle: "Tu ofrenda se recibe con caridad.",
    thanksPaypal:
      " se está abriendo con tu aplicación de pago. Completa el donativo en esa ventana.",
    thanksZelle:
      " — envía esta cantidad con Zelle a {handle}.",
    thanksRecorded:
      " ha quedado registrada en el escritorio del santuario. Un administrador puede conectar PayPal, Venmo, Cash App o Zelle cuando esté listo para recibir pagos en vivo.",
    returnHome: "Volver al inicio",
    giveAgain: "Donar de nuevo",
    anonymous: "Anónimo",
    chooseMethod: "Donar con",
    methodPaypal: "PayPal",
    methodVenmo: "Venmo",
    methodCashApp: "Cash App",
    methodZelle: "Zelle",
  },
  adminLogin: {
    kicker: "Mayordomía",
    title: "Entrada de administrador",
    lede:
      "Entra para subir videos, publicar eventos del calendario y escribir entradas históricas. Esta demostración guarda la sesión solo en tu navegador.",
    username: "Usuario",
    password: "Contraseña",
    submit: "Entrar al escritorio",
    error: "Esas credenciales no fueron reconocidas.",
  },
  admin: {
    kicker: "Administrador",
    title: "Escritorio del santuario",
    lede:
      "Publica videos, eventos del calendario, texto histórico, quiénes somos y ajustes de donación. Los cambios se guardan en este navegador para que las páginas públicas se actualicen de inmediato.",
    tabVideos: "Videos",
    tabCalendar: "Calendario",
    tabHistory: "Historia",
    tabAbout: "Quiénes somos",
    tabDonations: "Donaciones",
    uploadVideo: "Sube o enlaza un video",
    titleLabel: "Título",
    description: "Descripción",
    videoFile: "Archivo de video",
    videoUrl: "O URL de YouTube / Vimeo / video",
    publishVideo: "Publicar video",
    saving: "Guardando…",
    publishedVideos: "Videos publicados",
    noneYet: "Ninguno aún.",
    uploadedFile: "Archivo subido",
    remove: "Quitar",
    edit: "Editar",
    createEvent: "Crear evento del calendario",
    editEvent: "Editar evento",
    date: "Fecha",
    time: "Hora",
    location: "Lugar",
    addEvent: "Añadir evento",
    saveChanges: "Guardar cambios",
    cancelEdit: "Cancelar edición",
    scheduledEvents: "Eventos programados",
    enterHistory: "Ingresar hecho histórico",
    editHistory: "Editar hecho histórico",
    year: "Año o período",
    historicalText: "Texto histórico",
    publishEntry: "Publicar entrada",
    publishedHistory: "Historia publicada",
    donationPage: "Página de donación",
    headline: "Titular",
    invitation: "Texto de invitación",
    amounts: "Cantidades sugeridas (USD, separadas por comas)",
    paypal: "Correo de PayPal o URL de donación",
    venmo: "Usuario o URL de Venmo",
    cashApp: "Cashtag o URL de Cash App",
    zelle: "Correo o teléfono de Zelle",
    donationHint:
      "Completa los métodos que aceptes. Déjalos en blanco para registrar ofrendas solo en el sitio. Los donantes elegirán entre los métodos que añadas.",
    saveDonation: "Guardar ajustes de donación",
    recordedGifts: "Ofrendas registradas",
    noGifts: "Aún no hay ofrendas registradas.",
    recorded: "Registrada",
    needVideo: "Elige un archivo de video o pega un enlace.",
    videoTooLarge: "Mantén las subidas por debajo de 80 MB.",
    videoPublished: "Video publicado.",
    videoFailed: "No se pudo guardar el video en este navegador.",
    eventUpdated: "Evento actualizado.",
    eventAdded: "Evento añadido al calendario.",
    historyUpdated: "Entrada histórica actualizada.",
    historyPublished: "Entrada histórica publicada.",
    donationSaved: "Ajustes de donación guardados.",
    aboutPage: "Página de quiénes somos",
    aboutKicker: "Rótulo",
    aboutIntro: "Introducción",
    aboutHomeBlurb: "Resumen en la página de inicio",
    aboutPhone: "Teléfono",
    aboutPhoneLabel: "Etiqueta del teléfono",
    aboutPhoneHint: "Nota del teléfono",
    saveAbout: "Guardar quiénes somos",
    aboutSaved: "Página de quiénes somos guardada.",
    addAboutSection: "Añadir una sección",
    editAboutSection: "Editar sección",
    sectionText: "Texto de la sección",
    addSection: "Añadir sección",
    aboutSections: "Secciones en esta página",
    noAboutSections: "Aún no hay secciones. Añade una para que aparezca en Quiénes somos.",
    sectionAdded: "Sección añadida.",
    sectionUpdated: "Sección actualizada.",
  },
};

export const messages = { en, es };

export type MessageTree = typeof en;

export const translate = (
  language: Language,
  key: string,
  vars?: Record<string, string | number>
) => {
  const value = key.split(".").reduce<unknown>((node, part) => {
    if (!node || typeof node !== "object") return undefined;
    return (node as Record<string, unknown>)[part];
  }, messages[language]);
  const fallback = key.split(".").reduce<unknown>((node, part) => {
    if (!node || typeof node !== "object") return undefined;
    return (node as Record<string, unknown>)[part];
  }, messages.en);
  const template = typeof value === "string" ? value : typeof fallback === "string" ? fallback : key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    vars[name] === undefined ? match : String(vars[name])
  );
};
