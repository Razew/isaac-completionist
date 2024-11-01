# Isaac Completionist

Inlämning 1 - Apputveckling _(React Native)_

## Beskrivning

En React Native applikation vars syfte är att hjälpa spelare av **The Binding of Isaac: Rebirth** under sitt spelande.
Applikationen visar alla collectible items som finns i spelet, med en webbvy av deras respektive wiki-sida direkt i appen. Dessutom visas alla achievements.
I framtiden kan funktionalitet för att automatiskt sortera ut de achievements man ännu inte har låst upp (via utökad Steam API integration), läggas till. Detta skulle underlätta för spelare att se och planera sin achievement hunt!

## Bygg-/Körsteg

1. `git clone https://github.com/Razew/isaac-completionist.git`
2. `npm install`
3. `npm start`

För att kunna hämta achievements krävs en Steam Web API Key. Du kan skaffa en genom att följa instruktionerna här: [Steam Dev](https://steamcommunity.com/dev). </br>
Alternativt, om du heter **David** och har tillgång till `steam_api_key.txt`-filen, finns en key där. </br>
I Isaac Completionist-appen kan man sedan spara denna under `Settings`-menyn.

## Krav för att köra appen

För att kunna använda **Isaac Completionist** krävs antingen:

- [Expo Go](https://expo.dev/client) installerat på din mobil.
- En emulator, som Android Studio, för att köra appen på din dator (se notering).

**Notering:** Appen är testad med Android API 34, så se till att din emulator är inställd på denna version för bästa kompatibilitet.

## Använda komponenter

| React Native             | Expo              |
| ------------------------ | ----------------- |
| FlatList                 | Image             |
| Pressable                | WebView           |
| View                     | Video (expo-av)   |
| TouchableWithoutFeedback | ScreenOrientation |
| Text (Paper)             | NavigationBar     |
| TextInput (Paper)        | StatusBar         |
| Modal (Paper)            | SafeAreaContext   |
| Button (Paper)           | SecureStore       |
| Linking _(module)_       |                   |

_Obs. Linking finns även som en expo component_

## Ytterligare externa moduler

- `cheerio-without-node-native`
- `react-native-paper`

## Krav

**Godkänt:**

- [x] Projektet använder minst 4 stycken RN-komponenter och minst 4 stycken Expo
      komponenter.
- [x] De utvalda komponenterna MÅSTE antecknas i README filen tillsammans med en
      lista över genomförda krav.
- [x] React Navigation används för att skapa en bättre upplevelse i appen.
- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
- [x] Uppgiften lämnas in i tid!
- [x] Muntlig presentation är genomförd

**Väl godkänt:**

- [x] Alla punkter för godkänt är uppfyllda
- [x] Ytterligare en valfri extern modul används i projektet (ex. react-hook-form).
- [x] Appen ska prata med ett Web-API för att hämta data.
- [x] Appen ska förberedas för lansering till en Appstore (Deadline samma dag som kursen
      slutar)
