Datum: 2024-10-21

Vad jag gjorde !

På detta projekt behövde man ändra så att det gick att boka biostolar där användaren kan:

- Välja en film från en dynamisk lista som laddas från en extern JSON-fil.
- Markera lediga stolar som "Selected" eller "N/A" (inte valda).
- Se vilka stolar som redan är bokade (Occupied) och inte kan väljas.
- Uppdatera antalet valda stolar och totalpriset baserat på den valda filmen och stolarna.

Själva HTML- och CSS-koden fanns redan när jag började, och mitt fokus låg på att lägga till JavaScript-funktionalitet och dynamisk filmdatahantering.

Funktioner som jag  implementerade

1. Dynamisk filmval

Jag tog bort den hårdkodade filmlistan i "select" och la till istället en JSON.fil så hade då samma data men får den att ser mer clean och lättare att sätta in fler/eller ta bort filmer. Jag gjorde det med hjälp av "fetch" i JavaScript och uppdaterar dropdown-listan på sidan.

- När sidan laddas, hämtas filmerna från JSON-filen och visas i dropdown-menyn. Detta gör applikationen flexibel, då nya filmer kan läggas till utan att ändra HTML-koden.

2. Klickbar bokning av stolar

Jag la till så att användare kan klicka på lediga stolar och markera dem som valda. Stolarna har 3 "statusar" vilket är:
- Ledig (N/A) Kan markeras och bokas.
- Vald (Selected) När en stol väljs av användaren ändras dess status till "Selected".
- Bokad (Occupied) Dessa stolar är redan bokade och kan inte väljas.

3. Prisberäkning

När användaren väljer en film från dropdown-menyn, laddas filmens pris dynamiskt från JSON-filen. Varje gång en stol markeras, uppdateras det totala priset automatiskt. 

Totalpriset baseras på:
- Antalet valda stolar.
- Priset för den valda filmen.

Jag använde mig utav "innertext" för att uppdatera antal valda stolar och pris i realtid.
