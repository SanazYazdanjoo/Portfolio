// Case study content for the Welcome Lounge Companion (Bauhaus-Universität
// Weimar, International Office, Winter Semester 2026/27).
// Source: Sanaz's own case study page (claude.ai artifact, Sep 2026). Every
// fact below restates that page; nothing is added. Evidence base: her own
// shifts at the desk (from July 2026), a tutor survey (Sep 2026, n=4, all
// Welcome Lounge tutors) and requests from the team during the pilot.
//
// Status honesty, as on the IBS page: built, internally checked, and used by
// the team as an operational pilot — effect on users NOT measured yet.
//
// All student records in the screenshots are synthetic sample data; tutor
// names appear with their agreement (stated on the source page).
import card from './card';
import systemMap from './system-map.webp';
import screenToday from './screens/screen-today.webp';
import screenJourneyPhone from './screens/screen-journey-phone.webp';
import screenStudents from './screens/screen-students.webp';
import screenShiftsTutor from './screens/screen-shifts-tutor.webp';
import screenStatistics from './screens/screen-statistics.webp';
import screenTutorPhone from './screens/screen-tutor-phone.webp';
import screenFeedback from './screens/screen-feedback.webp';

const PHONE_SHOT = 'w-full h-auto block sm:max-w-[300px] sm:mx-auto';

export const projectData = {
  ...card,

  stage: {
    en: 'Operational pilot · effect on users not yet measured',
    de: 'Operativer Pilot · Wirkung auf Nutzende noch nicht gemessen',
  },
  timeline: {
    en: 'July – September 2026',
    de: 'Juli – September 2026',
  },

  brief: {
    problem: {
      en: 'Arrival information for international students was spread across university pages, PDFs and WhatsApp. Tutors kept students, shifts and handovers in separate sheets and chats.',
      de: 'Ankunftsinformationen für internationale Studierende waren über Universitätsseiten, PDFs und WhatsApp verteilt. Tutor:innen führten Studierende, Schichten und Übergaben in getrennten Tabellen und Chats.',
    },
    context: {
      en: 'International Office Welcome Lounge, Bauhaus-Universität Weimar, Winter Semester 2026/27. I work there as a tutor, so the research started from my own shifts at the desk.',
      de: 'Welcome Lounge des International Office, Bauhaus-Universität Weimar, Wintersemester 2026/27. Ich arbeite dort als Tutorin, deshalb begann die Forschung bei meinen eigenen Schichten am Tresen.',
    },
    methods: {
      en: 'Own observation at the desk · tutor survey (n=4) · requests during the pilot · evidence → requirement tracing · interaction design · full-stack implementation',
      de: 'Eigene Beobachtung am Tresen · Tutor:innen-Umfrage (n=4) · Anfragen während des Piloten · Evidenz → Anforderung · Interaktionsdesign · Full-Stack-Umsetzung',
    },
    scale: {
      en: '2 audiences · a ten-step student journey · 7 staff views · 4 server-enforced roles · 1 shared Excel workbook · 108 automated tests',
      de: '2 Zielgruppen · eine Studierenden-Journey in zehn Schritten · 7 Staff-Ansichten · 4 serverseitig erzwungene Rollen · 1 gemeinsame Excel-Arbeitsmappe · 108 automatisierte Tests',
    },
    outcome: {
      en: 'In use by the Welcome Lounge team as an operational pilot; two production failures traced and fixed. No task-based testing yet, so no effect on users is claimed.',
      de: 'Vom Welcome-Lounge-Team als operativer Pilot genutzt; zwei Produktionsfehler nachverfolgt und behoben. Noch keine aufgabenbasierten Tests, daher wird keine Wirkung auf Nutzende behauptet.',
    },
  },

  heroImage: card.thumbnail,

  sectionTitles: {
    about: {
      label: { en: 'Situation', de: 'Ausgangslage' },
      kicker: { en: '01 · The situation', de: '01 · Die Ausgangslage' },
      heading: { en: 'Everything a new student needs exists. It is just in too many places.', de: 'Alles, was neue Studierende brauchen, existiert. Nur an zu vielen Orten.' },
    },
    challenge: {
      label: { en: 'Discovery', de: 'Discovery' },
      kicker: { en: '02 · Discovery', de: '02 · Discovery' },
      heading: { en: 'Starting from inside the team, then checking with a survey', de: 'Von innen aus dem Team starten, dann mit einer Umfrage prüfen' },
    },
    solution: {
      label: { en: 'Requirements', de: 'Anforderungen' },
      kicker: { en: '03 · From evidence to requirements', de: '03 · Von der Evidenz zu Anforderungen' },
      heading: { en: 'Why the interface looks the way it does', de: 'Warum die Oberfläche so aussieht, wie sie aussieht' },
    },
    design: {
      label: { en: 'Workflow', de: 'Workflow' },
      kicker: { en: '04 · Designing the workflow', de: '04 · Den Workflow gestalten' },
      heading: { en: 'Two front doors to one workbook', de: 'Zwei Eingänge zu einer Arbeitsmappe' },
    },
    prototype: {
      label: { en: 'The product', de: 'Das Produkt' },
      kicker: { en: '05 · The product', de: '05 · Das Produkt' },
      heading: { en: 'One product, two audiences', de: 'Ein Produkt, zwei Zielgruppen' },
    },
    methodology: {
      label: { en: 'Building', de: 'Umsetzung' },
      kicker: { en: '06 · Building with constraints', de: '06 · Bauen unter Randbedingungen' },
      heading: { en: 'Keep the spreadsheet. Give it a better front door.', de: 'Die Tabelle behalten. Ihr einen besseren Eingang geben.' },
    },
    results: {
      label: { en: 'Status', de: 'Status' },
      kicker: { en: '07 · Status', de: '07 · Status' },
      heading: { en: 'What the pilot still has to prove', de: 'Was der Pilot noch beweisen muss' },
    },
    limitations: {
      label: { en: 'Limitations', de: 'Limitationen' },
      kicker: { en: '08 · Evidence limits', de: '08 · Grenzen der Evidenz' },
      heading: { en: 'How strong the evidence is', de: 'Wie belastbar die Evidenz ist' },
    },
    implications: {
      label: { en: 'Reflection', de: 'Reflexion' },
      kicker: { en: '09 · Reflection', de: '09 · Reflexion' },
      heading: { en: 'What I would keep, and what I would change', de: 'Was ich beibehalten und was ich ändern würde' },
    },
  },

  about: {
    en: 'Every semester, international students arrive in Weimar and work through the same list: health insurance, a room, the semester fee, enrolment, city registration, a bank account, a residence permit. The university publishes all of it, across many pages, PDFs and a WhatsApp group. The Welcome Lounge tutors fill the gaps in person, while keeping their own work in an Excel file, a shift sheet and chat. I work at that desk as a tutor. From there I saw where arrival information and the team’s own coordination broke down, turned what I saw into requirements, and built a student journey and a staff workspace around the spreadsheet the team already trusted. Students need to know the next step and reach the official answer quickly, on a phone, with no account and no tracking. The team needs one current, shared picture of students, shifts and handovers, at spreadsheet speed, with clear attribution and a semester handover that needs no developer.',
    de: 'Jedes Semester kommen internationale Studierende nach Weimar und arbeiten dieselbe Liste ab: Krankenversicherung, ein Zimmer, der Semesterbeitrag, Immatrikulation, Anmeldung in der Stadt, ein Bankkonto, ein Aufenthaltstitel. Die Universität veröffentlicht all das, verteilt über viele Seiten, PDFs und eine WhatsApp-Gruppe. Die Tutor:innen der Welcome Lounge schließen die Lücken persönlich und führen ihre eigene Arbeit in einer Excel-Datei, einer Schichttabelle und im Chat. Ich arbeite an diesem Tresen als Tutorin. Von dort sah ich, wo Ankunftsinformationen und die Koordination im Team zusammenbrachen, übersetzte das Beobachtete in Anforderungen und baute eine Studierenden-Journey und einen Staff-Workspace rund um die Tabelle, der das Team bereits vertraute. Studierende müssen den nächsten Schritt kennen und die offizielle Antwort schnell erreichen, am Smartphone, ohne Konto und ohne Tracking. Das Team braucht ein aktuelles, gemeinsames Bild von Studierenden, Schichten und Übergaben, in Tabellengeschwindigkeit, mit klarer Zuordnung und einer Semesterübergabe ohne Entwickler:in.',
  },

  evidenceChain: [
    {
      stage: { en: 'Research', de: 'Research' },
      note: {
        en: 'My own shifts at the desk from July 2026, a tutor survey in September 2026 (four responses), and requests from the team during the pilot.',
        de: 'Meine eigenen Schichten am Tresen ab Juli 2026, eine Tutor:innen-Umfrage im September 2026 (vier Antworten) und Anfragen des Teams während des Piloten.',
      },
    },
    {
      stage: { en: 'Requirements', de: 'Anforderungen' },
      note: {
        en: 'Four traced rows, each running from what I saw or was told to the problem, the requirement and the design response.',
        de: 'Vier nachverfolgte Zeilen, jede vom Beobachteten oder Gehörten über das Problem und die Anforderung bis zur Designantwort.',
      },
    },
    {
      stage: { en: 'Design', de: 'Design' },
      note: {
        en: 'Two front doors to one workbook: a calm, read-only student journey and a staff workspace whose screens answer the team’s daily questions.',
        de: 'Zwei Eingänge zu einer Arbeitsmappe: eine ruhige Studierenden-Journey zum Lesen und ein Staff-Workspace, dessen Screens die täglichen Fragen des Teams beantworten.',
      },
    },
    {
      stage: { en: 'Implementation', de: 'Implementierung' },
      note: {
        en: 'React and Vite in front of a small Node API that reads and writes the team’s Excel workbook in the university’s Nextcloud, with four roles checked on the server.',
        de: 'React und Vite vor einer kleinen Node-API, die die Excel-Arbeitsmappe des Teams in der Nextcloud der Universität liest und schreibt, mit vier serverseitig geprüften Rollen.',
      },
    },
    {
      stage: { en: 'Pilot', de: 'Pilot' },
      note: {
        en: 'Used by the team, with changes shipped in small loops, usually within hours. 108 automated tests; two production failures traced and fixed.',
        de: 'Vom Team genutzt, Änderungen in kleinen Schleifen ausgeliefert, meist innerhalb von Stunden. 108 automatisierte Tests; zwei Produktionsfehler nachverfolgt und behoben.',
      },
    },
    {
      stage: { en: 'Validation', de: 'Validierung' },
      pending: true,
      note: {
        en: 'No task-based testing with tutors or students so far, and no comparison with the old workflow. Whether it makes the work easier is not measured yet.',
        de: 'Bisher keine aufgabenbasierten Tests mit Tutor:innen oder Studierenden und kein Vergleich mit dem alten Ablauf. Ob es die Arbeit erleichtert, ist noch nicht gemessen.',
      },
    },
  ],

  challengeQuote: {
    en: 'My view could be mistaken for the team’s, so I checked it with the other tutors.',
    de: 'Meine Sicht konnte mit der des Teams verwechselt werden, also habe ich sie mit den anderen Tutor:innen überprüft.',
  },
  challenge: {
    en: 'The project started from my own shifts at the desk: repeated arrival questions, student notes in Excel, shifts in a separate sheet, handovers in chat messages. That gave me direct access, but it was one person’s view. Once the first version was running, I sent a survey to the other tutors. It confirmed some decisions and reordered others. During the pilot, the team’s requests while using the tool, later also sent through the in-app Feedback button, became the third source. The evidence is directional, not representative: it shaped priorities; it does not prove outcomes.',
    de: 'Das Projekt begann bei meinen eigenen Schichten am Tresen: wiederkehrende Ankunftsfragen, Notizen zu Studierenden in Excel, Schichten in einer separaten Tabelle, Übergaben als Chatnachrichten. Das gab mir direkten Zugang, war aber die Sicht einer Person. Sobald die erste Version lief, schickte ich eine Umfrage an die anderen Tutor:innen. Sie bestätigte einige Entscheidungen und ordnete andere neu. Während des Piloten wurden die Anfragen des Teams aus der Nutzung, später auch über den Feedback-Button in der App, zur dritten Quelle. Die Evidenz ist richtungsweisend, nicht repräsentativ: Sie hat Prioritäten geformt; Ergebnisse belegt sie nicht.',
  },

  researchEvidence: {
    title: { en: 'What the research found · with its source', de: 'Was die Forschung ergab · mit Quelle' },
    items: [
      {
        value: '4/4',
        label: { en: 'tutors said information is spread across different places and students don’t know where to look', de: 'Tutor:innen sagten, Informationen seien auf verschiedene Orte verteilt und Studierende wüssten nicht, wo sie suchen sollen' },
        source: { en: 'Tutor survey · Sep 2026 · n=4', de: 'Tutor:innen-Umfrage · Sep. 2026 · n=4' },
      },
      {
        value: '3/4',
        label: { en: 'said information between colleagues is sometimes lost or unclear', de: 'sagten, Informationen zwischen Kolleg:innen gingen manchmal verloren oder seien unklar' },
        source: { en: 'Tutor survey · n=4', de: 'Tutor:innen-Umfrage · n=4' },
      },
      {
        value: '3/4',
        label: { en: 'said it is hard to know who changed information', de: 'sagten, es sei schwer zu erkennen, wer Informationen geändert hat' },
        source: { en: 'Tutor survey · n=4', de: 'Tutor:innen-Umfrage · n=4' },
      },
      {
        value: '4/4',
        label: { en: 'rated Excel, WhatsApp and shared documents 4 or 5 on a 1 (very difficult) to 5 (very easy) scale', de: 'bewerteten Excel, WhatsApp und geteilte Dokumente mit 4 oder 5 auf einer Skala von 1 (sehr schwierig) bis 5 (sehr einfach)' },
        source: { en: 'Tutor survey · n=4', de: 'Tutor:innen-Umfrage · n=4' },
      },
    ],
  },

  verbatimsIn: 'challenge',
  verbatims: [
    {
      quote: { en: 'Having a big WhatsApp group is good.', de: 'Eine große WhatsApp-Gruppe zu haben ist gut.' },
      attribution: { en: 'Tutor survey, open answer', de: 'Tutor:innen-Umfrage, offene Antwort · aus dem Englischen übersetzt' },
    },
    {
      quote: { en: 'As a tutor I should only be able to put in my own name.', de: 'Als Tutor:in sollte ich nur meinen eigenen Namen eintragen können.' },
      attribution: { en: 'Team request during the pilot', de: 'Anfrage aus dem Team während des Piloten · aus dem Englischen übersetzt' },
    },
  ],

  solutionQuote: {
    en: 'The evidence said the team trusted its Excel file. So I kept it.',
    de: 'Die Evidenz sagte, dass das Team seiner Excel-Datei vertraute. Also habe ich sie behalten.',
  },
  solution: {
    en: 'Each row below runs from what I saw or was told, to the requirement it became, to the design response and what the code does to hold it. Sources are marked. The rows explain why the interface looks the way it does: one ordered journey instead of a dashboard, a change log instead of trust, the old workbook instead of a new database, and buttons instead of free-text shift cells.',
    de: 'Jede Zeile unten führt vom Beobachteten oder Gehörten zur Anforderung, die daraus wurde, zur Designantwort und dazu, was der Code tut, um sie einzuhalten. Die Quellen sind markiert. Die Zeilen erklären, warum die Oberfläche so aussieht: eine geordnete Journey statt eines Dashboards, ein Änderungsprotokoll statt Vertrauen, die bestehende Arbeitsmappe statt einer neuen Datenbank und Buttons statt Freitext-Schichtzellen.',
  },

  traceChains: {
    title: { en: 'Observed → Requirement → Design response → Implementation', de: 'Beobachtet → Anforderung → Designantwort → Umsetzung' },
    intro: {
      en: 'Status describes what is built. None of these rows has been validated with users in task-based testing yet — see section 07.',
      de: 'Der Status beschreibt, was gebaut ist. Keine dieser Zeilen wurde bisher in aufgabenbasierten Tests mit Nutzenden validiert — siehe Abschnitt 07.',
    },
    columns: {
      evidence: { en: 'Observed', de: 'Beobachtet' },
      requirement: { en: 'Requirement', de: 'Anforderung' },
      decision: { en: 'Design response', de: 'Designantwort' },
      implementation: { en: 'Implementation', de: 'Umsetzung' },
    },
    statusLabels: {
      built: { en: 'Built', de: 'Gebaut' },
    },
    items: [
      {
        id: 'journey',
        featured: true,
        status: 'built',
        title: { en: 'The official answers exist, but in too many places', de: 'Die offiziellen Antworten existieren, aber an zu vielen Orten' },
        evidence: {
          text: { en: 'Tutors answer the same arrival questions many times a day. All four survey respondents said information is spread across different places and that students don’t know where to look.', de: 'Tutor:innen beantworten dieselben Ankunftsfragen viele Male am Tag. Alle vier Befragten sagten, Informationen seien auf verschiedene Orte verteilt und Studierende wüssten nicht, wo sie suchen sollen.' },
          source: { en: 'My shifts · tutor survey n=4', de: 'Meine Schichten · Tutor:innen-Umfrage n=4' },
        },
        requirement: {
          code: 'R-01',
          text: { en: 'A student can see the next step and reach the official source, without an account.', de: 'Studierende sehen den nächsten Schritt und erreichen die offizielle Quelle, ohne Konto.' },
        },
        decision: {
          text: { en: 'One ordered ten-step journey. Each step links to the university page. Progress stays in the browser.', de: 'Eine geordnete Journey in zehn Schritten. Jeder Schritt verlinkt auf die Universitätsseite. Der Fortschritt bleibt im Browser.' },
        },
        implementation: {
          text: { en: 'Official pages are fetched server-side and cached; if a page changes unexpectedly, the last good version is kept. No student accounts, no analytics, no server-side profile.', de: 'Offizielle Seiten werden serverseitig abgerufen und zwischengespeichert; ändert sich eine Seite unerwartet, bleibt die letzte gute Version erhalten. Keine Studierendenkonten, keine Analytics, kein serverseitiges Profil.' },
        },
      },
      {
        id: 'attribution',
        featured: true,
        status: 'built',
        title: { en: 'No shared picture, and no way to see who changed what', de: 'Kein gemeinsames Bild und kein Weg zu sehen, wer was geändert hat' },
        evidence: {
          text: { en: 'Notes in one Excel file, shifts in another sheet, handovers in chat. 3 of 4 said information between colleagues is sometimes lost or unclear; 3 of 4 that it’s hard to know who changed information.', de: 'Notizen in einer Excel-Datei, Schichten in einer anderen Tabelle, Übergaben im Chat. 3 von 4 sagten, Informationen zwischen Kolleg:innen gingen manchmal verloren oder seien unklar; 3 von 4, es sei schwer zu erkennen, wer etwas geändert hat.' },
          source: { en: 'My shifts · tutor survey n=4', de: 'Meine Schichten · Tutor:innen-Umfrage n=4' },
        },
        requirement: {
          code: 'R-02',
          text: { en: 'One place for students, shifts and handovers that records who changed what.', de: 'Ein Ort für Studierende, Schichten und Übergaben, der festhält, wer was geändert hat.' },
        },
        decision: {
          text: { en: 'A staff workspace where every change is logged with who, when and what changed (old → new for shifts), plus a shared handover feed.', de: 'Ein Staff-Workspace, in dem jede Änderung mit wer, wann und was protokolliert wird (alt → neu bei Schichten), dazu ein gemeinsamer Übergabe-Feed.' },
        },
        implementation: {
          text: { en: 'The table behaves like a sheet: cells save themselves, the empty last row adds a student, and “Added by” fills in automatically. The activity log is a tab in the same workbook.', de: 'Die Tabelle verhält sich wie ein Sheet: Zellen speichern sich selbst, die leere letzte Zeile legt Studierende an, und „Hinzugefügt von“ füllt sich automatisch. Das Aktivitätsprotokoll ist ein Tab in derselben Arbeitsmappe.' },
        },
      },
      {
        id: 'workbook',
        featured: true,
        status: 'built',
        title: { en: 'Replacing tools that work would add risk', de: 'Funktionierende Werkzeuge zu ersetzen, brächte Risiko' },
        evidence: {
          text: { en: 'All four rated Excel, WhatsApp and shared documents 4 or 5 on a scale from very difficult (1) to very easy (5). Replacing them would add migration risk and tie the team to a new app.', de: 'Alle vier bewerteten Excel, WhatsApp und geteilte Dokumente mit 4 oder 5 auf einer Skala von sehr schwierig (1) bis sehr einfach (5). Sie zu ersetzen, brächte Migrationsrisiko und bände das Team an eine neue App.' },
          source: { en: 'Tutor survey n=4', de: 'Tutor:innen-Umfrage n=4' },
        },
        requirement: {
          code: 'R-03',
          text: { en: 'The team keeps its Excel file and can hand it to the next semester’s team without a developer.', de: 'Das Team behält seine Excel-Datei und kann sie ohne Entwickler:in an das Team des nächsten Semesters übergeben.' },
        },
        decision: {
          text: { en: 'The workbook stays the source of truth. The web workspace reads and writes the same file.', de: 'Die Arbeitsmappe bleibt die maßgebliche Quelle. Der Web-Workspace liest und schreibt dieselbe Datei.' },
        },
        implementation: {
          text: { en: 'A small Node API reads and writes the workbook over WebDAV, parsed with ExcelJS and validated on every read. Every write is version-checked; on autosaved fields the second editor chooses “Use mine” or “Use latest”.', de: 'Eine kleine Node-API liest und schreibt die Arbeitsmappe über WebDAV, geparst mit ExcelJS und bei jedem Lesen validiert. Jeder Schreibvorgang wird versionsgeprüft; bei automatisch gespeicherten Feldern wählt die zweite Person „Meine verwenden“ oder „Neueste verwenden“.' },
        },
      },
      {
        id: 'shifts',
        featured: true,
        status: 'built',
        title: { en: 'Any tutor could change anyone’s shift', de: 'Jede:r Tutor:in konnte jede Schicht ändern' },
        evidence: {
          text: { en: '“As a tutor I should only be able to put in my own name.” With free-text shift cells, anyone could edit anyone’s shift.', de: '„Als Tutor:in sollte ich nur meinen eigenen Namen eintragen können.“ Mit Freitext-Schichtzellen konnte jede Person jede Schicht bearbeiten.' },
          source: { en: 'Team request during the pilot', de: 'Anfrage aus dem Team während des Piloten' },
        },
        requirement: {
          code: 'R-04',
          text: { en: 'Tutors change only their own shifts. Coordinators keep full control.', de: 'Tutor:innen ändern nur ihre eigenen Schichten. Koordinator:innen behalten die volle Kontrolle.' },
        },
        decision: {
          text: { en: '“+ Add me” and × instead of text fields. Your own total and the fair share sit above the grid.', de: '„+ Mich eintragen“ und × statt Textfeldern. Die eigene Summe und der faire Anteil stehen über dem Raster.' },
        },
        implementation: {
          text: { en: 'The same rule is enforced on the server, which checks every staff request against the signed-in role.', de: 'Dieselbe Regel wird auf dem Server durchgesetzt, der jede Staff-Anfrage gegen die angemeldete Rolle prüft.' },
        },
      },
    ],
  },

  design: {
    en: 'Three ways in, one source of truth: students open the journey without an account, the team signs in to the workspace by role, and anyone can still open the workbook in Excel or the Nextcloud editor as before. For students I first explored a home page with recommendations and event promotions, then cut it back to the journey alone, because every extra panel competed with the next step. For staff, each screen answers one daily question: Today (who’s on duty, who needs attention, what’s coming up), Students (what do we know about this student), Shifts (when am I working, and am I doing my share) and Statistics for coordinators (is the work spread evenly). Tutors don’t see the Today summary cards; they only answered questions tutors never ask. There is no IT department to manage accounts, so every permission follows from one ladder — Tutor, Coordinator, Admin, and exactly one Super Admin — and nobody can give anyone, including themselves, a role above their own. I found that gap while designing the ladder: a coordinator could have raised their own role and then set a personal login.',
    de: 'Drei Wege hinein, eine maßgebliche Quelle: Studierende öffnen die Journey ohne Konto, das Team meldet sich rollenbasiert im Workspace an, und alle können die Arbeitsmappe weiterhin wie bisher in Excel oder im Nextcloud-Editor öffnen. Für Studierende habe ich zuerst eine Startseite mit Empfehlungen und Event-Hinweisen erkundet und sie dann auf die Journey allein reduziert, weil jedes zusätzliche Panel mit dem nächsten Schritt konkurrierte. Für das Team beantwortet jeder Screen eine tägliche Frage: Heute (wer hat Dienst, wer braucht Aufmerksamkeit, was steht an), Studierende (was wissen wir über diese Person), Schichten (wann arbeite ich, und leiste ich meinen Anteil) und Statistik für Koordinator:innen (ist die Arbeit gleichmäßig verteilt). Tutor:innen sehen die Übersichtskarten auf „Heute“ nicht; sie beantworteten nur Fragen, die Tutor:innen nie stellen. Es gibt keine IT-Abteilung für Konten, also folgt jede Berechtigung aus einer Leiter — Tutor:in, Koordinator:in, Admin und genau ein:e Super Admin — und niemand kann jemandem, auch sich selbst, eine Rolle über der eigenen geben. Diese Lücke fand ich beim Entwurf der Leiter: Ein:e Koordinator:in hätte die eigene Rolle anheben und dann ein persönliches Login setzen können.',
  },

  prototype: {
    en: 'Tutors coordinate in the dark staff workspace; students follow ten first steps on their phones, without an account. The staff table behaves like a spreadsheet so the team keeps its speed, and attribution costs nobody any typing. The shift grid mirrors the team’s existing sheet and refreshes every 20 seconds. On a phone, tutors get fewer menu items and nothing scrolls sideways. All student records in these screenshots are synthetic sample data; tutor names appear with their agreement.',
    de: 'Tutor:innen koordinieren im dunklen Staff-Workspace; Studierende folgen am Smartphone zehn ersten Schritten, ohne Konto. Die Staff-Tabelle verhält sich wie eine Tabellenkalkulation, damit das Team sein Tempo behält, und die Zuordnung kostet niemanden Tipparbeit. Das Schichtraster spiegelt die bestehende Tabelle des Teams und aktualisiert sich alle 20 Sekunden. Am Smartphone sehen Tutor:innen weniger Menüpunkte, und nichts scrollt seitwärts. Alle Studierendendaten in diesen Screenshots sind synthetische Beispieldaten; Namen von Tutor:innen erscheinen mit deren Einverständnis.',
  },

  methodologyQuote: {
    en: 'The fix was mostly about making the system’s state readable to the person responsible for it.',
    de: 'Die Lösung bestand vor allem darin, den Zustand des Systems für die verantwortliche Person lesbar zu machen.',
  },
  methodology: {
    en: 'The easy story would be “the old tools are bad, replace them.” The evidence said the team trusted its Excel file, so I kept it: one workbook in the university’s Nextcloud stays the source of truth, Excel and the web workspace read and write the same file, and the workbook doubles as backup and semester handover document. That had costs. Two ways to edit means conflicts, so every write is version-checked. Hand-edited rows can be invalid. The workbook lives on a server I don’t run: when it is unreachable, tutors keep working from the last loaded data with a banner showing when it was loaded, and everyday edits queue and replay through the same conflict checks. A queued edit that clashes with a newer change is not forced; it is dropped and shown to the tutor to enter again. The browser never talks to Nextcloud directly — a small Node API reads and writes the workbook and checks every staff request against the signed-in role, with a signed session cookie, CSRF protection, and passwords salted and hashed with scrypt, never stored in the workbook. It runs on Vercel, with daily and before-major-change backups in Nextcloud. The checks below include the two production failures from the pilot, and what each one changed.',
    de: 'Die einfache Geschichte wäre: „Die alten Werkzeuge sind schlecht, ersetze sie.“ Die Evidenz sagte, dass das Team seiner Excel-Datei vertraute, also habe ich sie behalten: Eine Arbeitsmappe in der Nextcloud der Universität bleibt die maßgebliche Quelle, Excel und der Web-Workspace lesen und schreiben dieselbe Datei, und die Arbeitsmappe dient zugleich als Backup und Übergabedokument fürs nächste Semester. Das hatte Kosten. Zwei Wege zum Bearbeiten bedeuten Konflikte, deshalb wird jeder Schreibvorgang versionsgeprüft. Von Hand bearbeitete Zeilen können ungültig sein. Die Arbeitsmappe liegt auf einem Server, den ich nicht betreibe: Ist er nicht erreichbar, arbeiten Tutor:innen mit den zuletzt geladenen Daten weiter, mit einem Banner, das zeigt, wann sie geladen wurden, und alltägliche Änderungen werden in eine Warteschlange gestellt und durch dieselben Konfliktprüfungen nachgespielt. Eine wartende Änderung, die mit einer neueren kollidiert, wird nicht erzwungen; sie wird verworfen und der Person zur erneuten Eingabe angezeigt. Der Browser spricht nie direkt mit Nextcloud — eine kleine Node-API liest und schreibt die Arbeitsmappe und prüft jede Staff-Anfrage gegen die angemeldete Rolle, mit signiertem Session-Cookie, CSRF-Schutz und Passwörtern, die mit scrypt gesalzen und gehasht und nie in der Arbeitsmappe gespeichert werden. Sie läuft auf Vercel, mit täglichen Backups und Backups vor größeren Änderungen in Nextcloud. Die Prüfungen unten enthalten die zwei Produktionsfehler aus dem Piloten und was jeder davon verändert hat.',
  },

  qualityChecks: {
    title: { en: 'Internal checks · and the two pilot failures behind them', de: 'Interne Prüfungen · und die zwei Pilotfehler dahinter' },
    columns: {
      guards: { en: 'What it covers', de: 'Was sie abdeckt' },
      result: { en: 'Result', de: 'Ergebnis' },
    },
    stateLabels: {
      pass: { en: 'In place', de: 'Vorhanden' },
      open: { en: 'Open', de: 'Offen' },
    },
    items: [
      {
        check: { en: 'Automated tests', de: 'Automatisierte Tests' },
        state: 'pass',
        guards: { en: 'Parsing, permissions, roles, conflicts, logins, statistics and the offline queue.', de: 'Parsing, Berechtigungen, Rollen, Konflikte, Logins, Statistik und die Offline-Warteschlange.' },
        result: { en: '108 automated tests', de: '108 automatisierte Tests' },
      },
      {
        check: { en: 'Workbook validation · pilot failure 1', de: 'Validierung der Arbeitsmappe · Pilotfehler 1' },
        state: 'pass',
        guards: { en: 'Edits stopped showing up on the site. Traced layer by layer: one invalid row (a step name typed into the Section column) failed validation for the whole workbook; the site quietly fell back to built-in sample steps that looked real; and the university’s document editor had lost its connection, so later edits never reached the file.', de: 'Änderungen erschienen nicht mehr auf der Seite. Schicht für Schicht nachverfolgt: Eine ungültige Zeile (ein Schrittname in der Spalte „Section“) ließ die Validierung der ganzen Arbeitsmappe scheitern; die Seite fiel still auf eingebaute Beispielschritte zurück, die echt aussahen; und der Dokumenteneditor der Universität hatte die Verbindung verloren, sodass spätere Änderungen die Datei nie erreichten.' },
        result: { en: 'The server keeps serving the last valid workbook; admins see the exact validation message, e.g. “Content row 4: choose First Step, Useful Info, …”', de: 'Der Server liefert weiter die letzte gültige Arbeitsmappe; Admins sehen die genaue Validierungsmeldung, z. B. „Content row 4: choose First Step, Useful Info, …“' },
      },
      {
        check: { en: 'Sign-in for every role · pilot failure 2', de: 'Anmeldung für jede Rolle · Pilotfehler 2' },
        state: 'pass',
        guards: { en: 'After I added the Super Admin login, a correct password returned a server error. I reproduced it live, traced it to a helper used before it was defined, fixed the order, and added the missing test — confirmed failing on the old code and passing on the new. The tutor path had a test; the new role didn’t.', de: 'Nachdem ich das Super-Admin-Login ergänzt hatte, lieferte ein korrektes Passwort einen Serverfehler. Ich habe ihn live reproduziert, auf eine Hilfsfunktion zurückgeführt, die vor ihrer Definition verwendet wurde, die Reihenfolge korrigiert und den fehlenden Test ergänzt — er scheitert am alten Code und besteht am neuen. Der Tutor:innen-Pfad hatte einen Test; die neue Rolle nicht.' },
        result: { en: 'Every role’s sign-in tested; tutor and Super Admin through the full API', de: 'Anmeldung jeder Rolle getestet; Tutor:in und Super Admin über die vollständige API' },
      },
      {
        check: { en: 'No sideways scroll', de: 'Kein seitliches Scrollen' },
        state: 'pass',
        guards: { en: 'Every page, from 390 to 1920 px wide. Tables fit their container and become cards on narrow screens.', de: 'Jede Seite, von 390 bis 1920 px Breite. Tabellen passen in ihren Container und werden auf schmalen Screens zu Karten.' },
        result: { en: 'Checked on every page', de: 'Auf jeder Seite geprüft' },
      },
      {
        check: { en: 'Accessibility', de: 'Barrierefreiheit' },
        state: 'open',
        guards: { en: 'Basics built in. A formal WCAG 2.1 AA audit, including screen readers on the map and tables, is planned.', de: 'Grundlagen eingebaut. Ein formales WCAG-2.1-AA-Audit, auch mit Screenreadern auf Karte und Tabellen, ist geplant.' },
        result: { en: 'No formal audit yet', de: 'Noch kein formales Audit' },
      },
    ],
    note: {
      en: 'These are checks on the build. They say the product does what its requirements describe; they do not say that it makes anyone’s work easier.',
      de: 'Das sind Prüfungen am Build. Sie zeigen, dass das Produkt tut, was seine Anforderungen beschreiben — nicht, dass es irgendjemandem die Arbeit erleichtert.',
    },
  },

  methods: [
    { en: 'Own observation at the desk (from July 2026)', de: 'Eigene Beobachtung am Tresen (ab Juli 2026)' },
    { en: 'Tutor survey (n=4)', de: 'Tutor:innen-Umfrage (n=4)' },
    { en: 'Requests and in-app feedback during the pilot', de: 'Anfragen und In-App-Feedback während des Piloten' },
    { en: 'Evidence → requirement tracing', de: 'Evidenz → Anforderung' },
    { en: 'Interaction design', de: 'Interaktionsdesign' },
    { en: 'Iterative releases with the team', de: 'Iterative Releases mit dem Team' },
  ],

  techStack: [
    'React',
    'Vite',
    'JavaScript',
    'Node.js',
    'ExcelJS',
    'Nextcloud WebDAV',
    'scrypt',
    'Vercel',
  ],

  results: {
    en: 'Building something is not the same as showing that it helps. What exists: the ten-step student journey; a staff workspace with Today, Students, Shifts, Handover, Events, Statistics and Change log; four roles enforced on the server; 28 written design decisions. What I checked: 108 automated tests, sideways scroll on every page from 390 to 1920 px, and use by the team during the pilot, in which two production failures were fixed. What is not measured: there has been no task-based testing with tutors or students, so I can’t yet say whether the tool makes their work easier, and no comparison with the old spreadsheet and chat workflow exists, so there is no evidence of time saved or fewer repeated questions.',
    de: 'Etwas zu bauen ist nicht dasselbe wie zu zeigen, dass es hilft. Was existiert: die Studierenden-Journey in zehn Schritten; ein Staff-Workspace mit Heute, Studierende, Schichten, Übergabe, Events, Statistik und Änderungsprotokoll; vier serverseitig erzwungene Rollen; 28 schriftlich festgehaltene Designentscheidungen. Was ich geprüft habe: 108 automatisierte Tests, seitliches Scrollen auf jeder Seite von 390 bis 1920 px und die Nutzung durch das Team während des Piloten, in dem zwei Produktionsfehler behoben wurden. Was nicht gemessen ist: Es gab keine aufgabenbasierten Tests mit Tutor:innen oder Studierenden, daher kann ich noch nicht sagen, ob das Werkzeug ihre Arbeit erleichtert, und es gibt keinen Vergleich mit dem alten Ablauf aus Tabelle und Chat, also keine Evidenz für gesparte Zeit oder weniger wiederholte Fragen.',
  },

  statusTiers: {
    title: { en: 'Output, validation and outcome, kept apart', de: 'Output, Validierung und Wirkung, getrennt gehalten' },
    items: [
      {
        key: 'implemented',
        title: { en: 'What exists', de: 'Was existiert' },
        points: [
          { en: 'Student journey with ten steps', de: 'Studierenden-Journey mit zehn Schritten' },
          { en: 'Staff workspace: Today, Students, Shifts, Handover, Events, Statistics, Change log', de: 'Staff-Workspace: Heute, Studierende, Schichten, Übergabe, Events, Statistik, Änderungsprotokoll' },
          { en: 'Four roles, enforced on the server', de: 'Vier Rollen, serverseitig erzwungen' },
          { en: '28 written design decisions', de: '28 schriftlich festgehaltene Designentscheidungen' },
        ],
      },
      {
        key: 'tested',
        title: { en: 'What I checked', de: 'Was ich geprüft habe' },
        points: [
          { en: '108 automated tests: parsing, permissions, roles, conflicts, logins, statistics, offline queue', de: '108 automatisierte Tests: Parsing, Berechtigungen, Rollen, Konflikte, Logins, Statistik, Offline-Warteschlange' },
          { en: 'Every page checked from 390 to 1920 px for sideways scroll', de: 'Jede Seite von 390 bis 1920 px auf seitliches Scrollen geprüft' },
          { en: 'Used by the team during the pilot; two production failures fixed', de: 'Vom Team während des Piloten genutzt; zwei Produktionsfehler behoben' },
          { en: 'Accessibility basics built in; no formal audit yet', de: 'Grundlagen der Barrierefreiheit eingebaut; noch kein formales Audit' },
        ],
      },
      {
        key: 'notValidated',
        title: { en: 'Not measured yet', de: 'Noch nicht gemessen' },
        points: [
          { en: 'User outcome: no task-based testing with tutors or students so far', de: 'Wirkung auf Nutzende: bisher keine aufgabenbasierten Tests mit Tutor:innen oder Studierenden' },
          { en: 'Operational outcome: no comparison with the old spreadsheet and chat workflow, so no evidence of time saved or fewer repeated questions', de: 'Operative Wirkung: kein Vergleich mit dem alten Ablauf aus Tabelle und Chat, also keine Evidenz für gesparte Zeit oder weniger wiederholte Fragen' },
        ],
      },
    ],
  },

  resultsAtAGlance: {
    title: { en: 'Pilot status', de: 'Stand des Piloten' },
    items: [
      { value: '10', label: { en: 'steps in the student journey', de: 'Schritte in der Studierenden-Journey' } },
      { value: '7', label: { en: 'staff views, four server-enforced roles', de: 'Staff-Ansichten, vier serverseitig erzwungene Rollen' } },
      { value: '—', pending: true, label: { en: 'task success with tutors and students', de: 'Aufgabenerfolg mit Tutor:innen und Studierenden' } },
      { value: '—', pending: true, label: { en: 'time saved compared with the old workflow', de: 'gesparte Zeit im Vergleich zum alten Ablauf' } },
    ],
  },

  metrics: [
    { value: '4/4', label: { en: 'tutors: information spread across too many places', de: 'Tutor:innen: Informationen auf zu viele Orte verteilt' } },
    { value: '3/4', label: { en: 'tutors: hard to know who changed information', de: 'Tutor:innen: schwer zu erkennen, wer etwas geändert hat' } },
    { value: '108', label: { en: 'automated tests', de: 'automatisierte Tests' } },
    { value: '2', label: { en: 'production failures traced and fixed', de: 'Produktionsfehler nachverfolgt und behoben' } },
  ],
  metricsIntro: {
    en: 'What is built is counted here. The outcome numbers stay empty until task-based testing has run.',
    de: 'Was gebaut ist, wird hier gezählt. Die Ergebniszahlen bleiben leer, bis aufgabenbasierte Tests gelaufen sind.',
  },

  notBuilt: {
    title: { en: 'Next', de: 'Als Nächstes' },
    items: [
      { en: 'Task-based testing: time tutors on real tasks against the old workflow.', de: 'Aufgabenbasierte Tests: Tutor:innen bei echten Aufgaben im Vergleich zum alten Ablauf messen.' },
      { en: 'Student validation: do incoming students reach the right official page without asking?', de: 'Validierung mit Studierenden: Erreichen neue Studierende die richtige offizielle Seite, ohne zu fragen?' },
      { en: 'Accessibility audit: WCAG 2.1 AA, including screen readers on the map and tables.', de: 'Barrierefreiheits-Audit: WCAG 2.1 AA, auch mit Screenreadern auf Karte und Tabellen.' },
      { en: 'Institutional login: university single sign-on before the next semester’s handover.', de: 'Institutionelles Login: Single Sign-on der Universität vor der Übergabe zum nächsten Semester.' },
    ],
  },

  outcome: {
    body: {
      en: 'The Welcome Lounge team uses the tool as an operational pilot. I shipped the team’s requests in small loops, usually within hours, and most changes removed things. A Feedback button on every workspace page now closes the loop inside the tool: one click, three choices, one message, arriving in the change log with the sender’s name and page.',
      de: 'Das Welcome-Lounge-Team nutzt das Werkzeug als operativen Piloten. Ich habe die Anfragen des Teams in kleinen Schleifen ausgeliefert, meist innerhalb von Stunden, und die meisten Änderungen haben etwas entfernt. Ein Feedback-Button auf jeder Workspace-Seite schließt die Schleife jetzt im Werkzeug selbst: ein Klick, drei Auswahlen, eine Nachricht, die mit Name und Seite im Änderungsprotokoll ankommt.',
    },
    adoption: 'deferred',
    decisions: [
      { en: '“We don’t need check-in.” → Removed it everywhere, and kept old records readable.', de: '„Wir brauchen keinen Check-in.“ → Überall entfernt, alte Einträge bleiben lesbar.' },
      { en: '“Each student should be one row, edited right there.” → Inline editing with autosave and short headers.', de: '„Jede:r Studierende sollte eine Zeile sein, direkt dort bearbeitet.“ → Inline-Bearbeitung mit Autosave und kurzen Spaltenköpfen.' },
      { en: '“I don’t want horizontal scroll anywhere.” → Tables fit their container and become cards on narrow screens.', de: '„Ich will nirgends horizontal scrollen.“ → Tabellen passen in ihren Container und werden auf schmalen Screens zu Karten.' },
      { en: '“This looks like an error.” → The red fair-share box became an informational blue note.', de: '„Das sieht wie ein Fehler aus.“ → Der rote Fair-Share-Kasten wurde zu einem informativen blauen Hinweis.' },
      { en: '“Who added this student?” → A read-only “Added by” column, back-filled from the activity history.', de: '„Wer hat diese Person angelegt?“ → Eine schreibgeschützte Spalte „Hinzugefügt von“, aus dem Aktivitätsverlauf nachgefüllt.' },
      { en: '“People should be able to report problems.” → A Feedback button on every workspace page; messages land in the change log with name and page.', de: '„Man sollte Probleme melden können.“ → Ein Feedback-Button auf jeder Workspace-Seite; Nachrichten landen mit Name und Seite im Änderungsprotokoll.' },
    ],
  },

  limitations: [
    {
      en: 'The tutor survey has four responses, all from Welcome Lounge tutors. It is directional, not representative: it shaped priorities; it does not prove outcomes.',
      de: 'Die Tutor:innen-Umfrage hat vier Antworten, alle von Tutor:innen der Welcome Lounge. Sie ist richtungsweisend, nicht repräsentativ: Sie hat Prioritäten geformt; Ergebnisse belegt sie nicht.',
    },
    {
      en: 'The survey was sent once the first version was running, so some early decisions rested on my own view of the work as a member of the team.',
      de: 'Die Umfrage wurde verschickt, als die erste Version bereits lief; einige frühe Entscheidungen beruhten daher auf meiner eigenen Sicht auf die Arbeit als Teil des Teams.',
    },
    {
      en: 'Students were not surveyed or tested. The student journey rests on the tutors’ view of students’ questions.',
      de: 'Studierende wurden weder befragt noch getestet. Die Studierenden-Journey beruht auf der Sicht der Tutor:innen auf die Fragen der Studierenden.',
    },
    {
      en: 'No task-based testing and no comparison with the old workflow exist, so the page reports what is built and checked, not measured improvement.',
      de: 'Es gibt weder aufgabenbasierte Tests noch einen Vergleich mit dem alten Ablauf; die Seite berichtet daher, was gebaut und geprüft ist, nicht gemessene Verbesserung.',
    },
  ],

  implications: {
    en: 'Keep: the most useful decision was not a screen. It was keeping Excel as the source of truth. It lowered the risk for the team, gave them a way out, and turned each new feature into a question of presentation instead of migration. Keep: letting real use drive removals — “we don’t need this” was worth more than any feature request. Change: I would run the tutor survey before building the staff workspace, not after. Being on the team gave me a head start, but some early decisions rested on my own view of the work. The main lesson: the hardest calls were about what not to build — no new database, no student accounts, no replacement for the Excel file the team already trusted. The engineering went into making that one file safe to share, and the design into making its state readable to the people who rely on it.',
    de: 'Beibehalten: Die nützlichste Entscheidung war kein Screen. Es war, Excel als maßgebliche Quelle zu behalten. Das senkte das Risiko für das Team, ließ ihm einen Ausweg und machte aus jedem neuen Feature eine Frage der Darstellung statt der Migration. Beibehalten: echte Nutzung über das Entfernen entscheiden lassen — „Das brauchen wir nicht“ war mehr wert als jeder Feature-Wunsch. Ändern: Ich würde die Tutor:innen-Umfrage vor dem Bau des Staff-Workspace durchführen, nicht danach. Teil des Teams zu sein, gab mir einen Vorsprung, aber einige frühe Entscheidungen beruhten auf meiner eigenen Sicht auf die Arbeit. Die wichtigste Lektion: Die schwierigsten Entscheidungen betrafen, was nicht gebaut wird — keine neue Datenbank, keine Studierendenkonten, kein Ersatz für die Excel-Datei, der das Team bereits vertraute. Die Technik floss darin, diese eine Datei sicher teilbar zu machen, und das Design darin, ihren Zustand für die Menschen lesbar zu machen, die sich auf sie verlassen.',
  },

  figures: {
    design: [
      {
        type: 'image',
        src: systemMap,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Who touches what', de: 'Wer greift worauf zu' },
        title: { en: 'Three ways in, one source of truth', de: 'Drei Wege hinein, eine maßgebliche Quelle' },
        description: {
          en: 'Students open the journey without an account; the team signs in by role; Excel and the Nextcloud editor still edit the workbook directly. The team can always fall back to the file they already know.',
          de: 'Studierende öffnen die Journey ohne Konto; das Team meldet sich rollenbasiert an; Excel und der Nextcloud-Editor bearbeiten die Arbeitsmappe weiterhin direkt. Das Team kann jederzeit auf die Datei zurückgreifen, die es schon kennt.',
        },
        alt: {
          en: 'System map: incoming students open the read-only student journey with no account; the Welcome Lounge team signs in by role to the staff workspace or edits in Excel or the Nextcloud editor as before; all three lead to Welcome-Lounge.xlsx, one workbook in the university’s Nextcloud whose tabs hold content, students, shifts, staff and the activity log',
          de: 'Systemkarte: Neue Studierende öffnen die schreibgeschützte Studierenden-Journey ohne Konto; das Welcome-Lounge-Team meldet sich rollenbasiert im Staff-Workspace an oder bearbeitet wie bisher in Excel oder im Nextcloud-Editor; alle drei führen zu Welcome-Lounge.xlsx, einer Arbeitsmappe in der Nextcloud der Universität, deren Tabs Inhalte, Studierende, Schichten, Personal und das Aktivitätsprotokoll enthalten',
        },
        caption: { en: 'System map · two front doors, one workbook', de: 'Systemkarte · zwei Eingänge, eine Arbeitsmappe' },
      },
      {
        type: 'image',
        src: screenStudents,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Requirement R-02 · Students', de: 'Anforderung R-02 · Studierende' },
        title: { en: 'Spreadsheet speed, with accountability built in', de: 'Tabellengeschwindigkeit, mit eingebauter Nachvollziehbarkeit' },
        description: {
          en: 'Cells save themselves, the empty last row adds a student, and “Added by” fills in automatically.',
          de: 'Zellen speichern sich selbst, die leere letzte Zeile legt Studierende an, und „Hinzugefügt von“ füllt sich automatisch.',
        },
        alt: {
          en: 'The Students table: one line per student with editable cells for name, matriculation number, country, programme, checkboxes for Enrolled, Accommodation and City registration, contact and note, then read-only Added by and Date added columns, and an empty New student row at the bottom',
          de: 'Die Studierendentabelle: eine Zeile pro Person mit bearbeitbaren Zellen für Name, Matrikelnummer, Land, Studiengang, Checkboxen für Immatrikuliert, Unterkunft und Anmeldung, Kontakt und Notiz, danach schreibgeschützte Spalten Hinzugefügt von und Datum sowie eine leere Zeile für neue Studierende',
        },
        caption: { en: 'Students · synthetic sample data', de: 'Studierende · synthetische Beispieldaten' },
      },
      {
        type: 'image',
        src: screenShiftsTutor,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Requirement R-04 · Shifts', de: 'Anforderung R-04 · Schichten' },
        title: { en: 'Tutors schedule themselves, and can only move their own name', de: 'Tutor:innen tragen sich selbst ein und können nur ihren eigenen Namen bewegen' },
        description: {
          en: 'The grid mirrors the team’s existing sheet and refreshes every 20 seconds.',
          de: 'Das Raster spiegelt die bestehende Tabelle des Teams und aktualisiert sich alle 20 Sekunden.',
        },
        alt: {
          en: 'The Shifts grid as the tutor Sanaz sees it: a blue note with the fair share per tutor and her own scheduled hours, then the grid with other tutors’ names as plain text, her own name with a remove button, + Add me buttons in empty weekday cells, and weekend rows without buttons',
          de: 'Das Schichtraster aus Sicht der Tutorin Sanaz: ein blauer Hinweis mit dem fairen Anteil pro Person und ihren eigenen geplanten Stunden, darunter das Raster mit den Namen anderer als reinem Text, ihrem eigenen Namen mit Entfernen-Button, „+ Mich eintragen“-Buttons in leeren Wochentagszellen und Wochenendzeilen ohne Buttons',
        },
        caption: { en: 'Shifts · tutor view', de: 'Schichten · Ansicht für Tutor:innen' },
      },
      {
        type: 'image',
        src: screenStatistics,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Coordinators · Statistics', de: 'Koordination · Statistik' },
        title: { en: 'Is anyone carrying too much or too little?', de: 'Trägt jemand zu viel oder zu wenig?' },
        description: {
          en: 'Hours per tutor against the fair share: open days × (S1 hours + S2 hours) × tutors per shift ÷ tutors. Open days are weekdays in the semester period, plus any weekend day with someone scheduled. The table repeats every value. In this sample schedule most slots are still open, so every tutor sits below the fair share.',
          de: 'Stunden pro Person im Vergleich zum fairen Anteil: offene Tage × (S1-Stunden + S2-Stunden) × Tutor:innen pro Schicht ÷ Tutor:innen. Offene Tage sind Wochentage im Semesterzeitraum plus jeder Wochenendtag, an dem jemand eingeplant ist. Die Tabelle wiederholt jeden Wert. In diesem Beispielplan sind die meisten Slots noch offen, daher liegen alle unter dem fairen Anteil.',
        },
        alt: {
          en: 'The Statistics page: hours per tutor as horizontal bars split into worked and planned, with a dashed fair-share marker, and a table of S1 shifts, S2 shifts, worked, planned, total and difference from the fair share',
          de: 'Die Statistikseite: Stunden pro Person als horizontale Balken, geteilt in geleistet und geplant, mit gestrichelter Fair-Share-Markierung, und eine Tabelle mit S1-Schichten, S2-Schichten, geleistet, geplant, gesamt und Abweichung vom fairen Anteil',
        },
        caption: { en: 'Statistics · sample schedule', de: 'Statistik · Beispielplan' },
      },
    ],

    prototype: [
      {
        type: 'image',
        src: screenToday,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Staff workspace · Today', de: 'Staff-Workspace · Heute' },
        title: { en: 'Who’s on duty, who needs attention, what’s coming up', de: 'Wer hat Dienst, wer braucht Aufmerksamkeit, was steht an' },
        description: {
          en: 'Summary cards, a Needs attention list, the latest handover, and on the right who is on duty today and the events, split into Today and Coming up.',
          de: 'Übersichtskarten, eine Liste „Braucht Aufmerksamkeit“, die letzte Übergabe und rechts, wer heute Dienst hat, sowie die Events, geteilt in Heute und Demnächst.',
        },
        alt: {
          en: 'The staff Today page: black header with a magenta Staff Workspace badge, black sidebar with the menu, four summary cards, a Needs attention list, Latest handover, and on the right On duty today and Events, split into Today and Coming up',
          de: 'Die Staff-Seite Heute: schwarzer Kopf mit magentafarbenem Staff-Workspace-Badge, schwarze Seitenleiste mit Menü, vier Übersichtskarten, eine Liste Braucht Aufmerksamkeit, Letzte Übergabe und rechts Heute im Dienst und Events, geteilt in Heute und Demnächst',
        },
        caption: { en: 'Today · Super Admin view · synthetic sample data', de: 'Heute · Super-Admin-Ansicht · synthetische Beispieldaten' },
      },
      {
        type: 'image',
        src: screenJourneyPhone,
        span: 1,
        className: PHONE_SHOT,
        label: { en: 'Student journey · phone', de: 'Studierenden-Journey · Smartphone' },
        title: { en: 'A calm path instead of a dashboard', de: 'Ein ruhiger Weg statt eines Dashboards' },
        description: {
          en: 'Ten first steps in one column, with the next step outlined. No account.',
          de: 'Zehn erste Schritte in einer Spalte, der nächste Schritt hervorgehoben. Kein Konto.',
        },
        alt: {
          en: 'The student journey on a phone: the heading Your first steps, then numbered circles in one column joined by a dotted line, with Health insurance outlined in magenta as the next step',
          de: 'Die Studierenden-Journey am Smartphone: die Überschrift Your first steps, darunter nummerierte Kreise in einer Spalte, verbunden durch eine gepunktete Linie, mit Health insurance magentafarben umrandet als nächstem Schritt',
        },
        caption: { en: 'Student journey · 390 px', de: 'Studierenden-Journey · 390 px' },
      },
      {
        type: 'image',
        src: screenTutorPhone,
        span: 1,
        className: PHONE_SHOT,
        label: { en: 'Tutor · phone', de: 'Tutor:in · Smartphone' },
        title: { en: 'Fewer menu items, nothing scrolls sideways', de: 'Weniger Menüpunkte, nichts scrollt seitwärts' },
        description: {
          en: 'The menu wraps at the top, followed by quick actions, who is on duty, and the events.',
          de: 'Das Menü bricht oben um, gefolgt von Schnellaktionen, dem Dienstplan des Tages und den Events.',
        },
        alt: {
          en: 'The Today page on a phone for a tutor: the black menu wraps at the top with the signed-in tutor and Sign out below it, followed by quick actions, the On duty today card and the start of the Events card',
          de: 'Die Seite Heute am Smartphone für eine Tutorin: Das schwarze Menü bricht oben um, darunter die angemeldete Person und Abmelden, gefolgt von Schnellaktionen, der Karte Heute im Dienst und dem Anfang der Events-Karte',
        },
        caption: { en: 'Today · tutor view · 390 px', de: 'Heute · Ansicht für Tutor:innen · 390 px' },
      },
      {
        type: 'image',
        src: screenFeedback,
        span: 2,
        className: 'w-full h-auto block',
        label: { en: 'Feedback, inside the tool', de: 'Feedback, im Werkzeug selbst' },
        title: { en: 'One click, three choices, one message', de: 'Ein Klick, drei Auswahlen, eine Nachricht' },
        description: {
          en: 'Each report arrives in the change log with the sender’s name and the page it came from.',
          de: 'Jede Meldung kommt mit dem Namen der Person und der Seite, von der sie stammt, im Änderungsprotokoll an.',
        },
        alt: {
          en: 'The Feedback panel open above the bottom-right Feedback button: choices for Suggestion, Problem / error, and Other, a message field, a note that the name and page are sent along, and Send and Cancel buttons',
          de: 'Das Feedback-Panel, geöffnet über dem Feedback-Button unten rechts: Auswahl zwischen Vorschlag, Problem / Fehler und Sonstiges, ein Nachrichtenfeld, ein Hinweis, dass Name und Seite mitgesendet werden, sowie Senden- und Abbrechen-Buttons',
        },
        caption: { en: 'Feedback panel', de: 'Feedback-Panel' },
      },
    ],
  },

  tagEvidence: [
    { tag: 'UX Research', evidence: 'challenge + researchEvidence + evidenceChain: own observation at the desk, tutor survey n=4, pilot requests', status: 'evidenced' },
    { tag: 'Requirements Engineering', evidence: 'solution + traceChains: observations turned into four requirements R-01 to R-04', status: 'evidenced' },
    { tag: 'Requirements Traceability', evidence: 'traceChains: observed → requirement → design response → implementation rows with sources', status: 'evidenced' },
    { tag: 'Interaction Design', evidence: 'design + figures.design + traceChains: journey cut back from a dashboard, sheet-like table, “+ Add me” shift buttons', status: 'evidenced' },
    { tag: 'Information Architecture', evidence: 'design + figures.design: three ways into one workbook; staff screens organised by daily question; role ladder', status: 'evidenced' },
    { tag: 'Iterative Design', evidence: 'outcome.decisions + figures.prototype: six pilot requests shipped as changes, in-app feedback loop', status: 'evidenced' },
    { tag: 'Responsive Design', evidence: 'qualityChecks + figures.prototype: 390–1920 px sideways-scroll check, tables become cards, phone screenshots', status: 'evidenced' },
    { tag: 'Privacy by Design', evidence: 'traceChains (journey) + methodology: no student accounts, no analytics, no server-side profile; hashed passwords never in the workbook', status: 'evidenced' },
    { tag: 'Role-Based Access Control', evidence: 'design + traceChains (shifts) + qualityChecks: four-role ladder enforced on the server, no self-promotion, every role sign-in tested', status: 'evidenced' },
    { tag: 'React', evidence: 'techStack + evidenceChain + figures.prototype: working student journey and staff workspace', status: 'evidenced' },
    { tag: 'Vite', evidence: 'techStack + evidenceChain: React and Vite front end', status: 'evidenced' },
    { tag: 'Node.js', evidence: 'methodology + techStack + traceChains (workbook): Node API reading and writing the workbook over WebDAV', status: 'evidenced' },
  ],
};

export default projectData;
