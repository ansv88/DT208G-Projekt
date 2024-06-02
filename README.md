# DT208G TypeScript, moment 5 - Projekt

Detta projekt är en webbplats för ett fiktivt universitet "Dalsjöns Universitet", som är skapad som en del av kursen DT208G TypeScript vid Mittuniversitetet. Webbplatsen använder Angular, TypeScript och PrimeNG. På webbplatsen kan man se alla kurser från Mittuniversitetets kurskatalog 2023, söka, filtrera, sortera kurserna samt skapa ett eget ramschema. Kurser i ramschemat sparas i localStorage.

## Användning

### Kurser-sidan
- Visa alla tillgängliga kurser.
- Använd sökfältet för att hitta kurser baserat på kurskod eller kursnamn.
- Filtrera kurser med hjälp av ämneslistan.
- Sortera kurserna i tabellen efter kurskod, kursnamn, poäng eller ämne.
- Lägg till kurser i ett ramschema.

### Mitt ramschema-sidan
- Visa kurser som lagts till i ramschemat.
- Ta bort enskilda kurser eller rensa hela schemat.

## Konstruktion
- **Komponenter:** Startsida, Kurser-sida, Mitt ramschema-sida, 404-sida, header, footer.
- **Datahämtning:** JSON-data hämtas med HttpClient i ' services/courses.service.ts '.

### Komponenternas och services syfte och funktion:
- **CoursesComponent** Visar tillgängliga kurser med sök-, filter- och sorteringsfunktioner. Använder **CoursesService** för att hämta kursdata och MyScheduleService för att hantera ramschemat.
- **MyScheduleComponent** Visar och hanterar ramschemat. Använder **MyScheduleService** för att ladda, ta bort en eller rensa alla tillagda kurser i ramschemat med localStorage.

### Models /course.ts:
Interface som ger strukturen för ett kursobjekt ('courseCode', 'courseName', 'points', 'subject', 'syllabus').

## Styling
Styling sker med CSS där varje komponent har egna stilregler, och globala stilregler finns i styles.css. <br> Webbplatsen är responsiv och fungerar på olika skärmstorlekar.

## Utveckling

Nedan finns en översättning och sammanfattning av den autogenererade readme-instruktionen som skapas när man skapar ett nytt Angularprojekt.
Det är steg-för-steg instruktioner för hur man skapar ett Angularprojekt.

### 1. Installera Angular CLI globalt:

`npm install -g @angular/cli`

### 2. Skapa ett nytt projekt :

`ng new project-name`

### 3. Starta utvecklingsservern:

`ng serve --open` (öppnas i webbläsaren till `http://localhost:4200/`).

### 4. Generera nya komponenter:

`ng generate component component-name`

Man kan också använda `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Bygg projektet:

`ng build`

### Kör enhetstester:

`ng test`

### Kör end-to-end-tester:

`ng e2e`

För att använda detta kommando, lägg först till ett paket som implementerar end-to-end testfunktionalitet.

### Ytterligare hjälp

För mer hjälp om Angular CLI, använd `ng help` eller besök [Angular CLI Overview and Command Reference](https://angular.io/cli).