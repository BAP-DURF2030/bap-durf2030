# BAP DURF2030
Dit is een bachelorproef voor Devine, waarbij we voor 2030 een platform hebben uitgewerkt.
DURF2030 is een platform voor inwoners, ondernemers, jongeren, (hoge) scholen, verbinders en veranderaars die de krachten bundelen voor een veerkrachtig Kortrijk en regio.

Het finale prototype kan je hier zien.
https://durf2030-kortrijk.vercel.app/

# Local setup

## Front-end

DURF2030 is een webapp gemaakt via NextJS. Als eerste gaan we de front-end van de NextJS webapp klaarzetten voor gebruik. 

1. Download de master folder
2. In de terminal navigeer je naar de gedownloade folder
3. Installeer alle packages via de commando `yarn`

## Back-end

### Client opstarten

1. Surf naar [`https://firebase.google.com/`](https://firebase.google.com/)
2. Maak een nieuw project aan.
    1. Geef een duidelijke naam aan je project
    2. Google Analytics aanzetten is optioneel
3. Start een Firebase voor web binnen je project
    1. Geef dit een naam
    2. Klik op registreren
    3. Kopieer de Firebase-SDK
    4. Binnen de root map maak je een file aan `next-config.js`
    5. Kopieer de content hier onderaan, en voeg de verkregen Firebase-SDK informatie toe

```
module.exports = {
  env: {
    NEXT_PUBLIC_DB_API_KEY: // From Firebase SDK,
    NEXT_PUBLIC_DB_AUTH_DOMAIN: // From Firebase SDK,
    NEXT_PUBLIC_DB_PROJECT_ID: // From Firebase SDK,
    NEXT_PUBLIC_DB_STORAGE_BUCKET: // From Firebase SDK,
    NEXT_PUBLIC_DB_MESSAGING_SENDER_ID: // From Firebase SDK,
    NEXT_PUBLIC_DB_APP_ID: '// From Firebase SDK,
  },
};
```
### Authenticatie

Binnen het bestaande Firebase project, zijn er aantal stappen die overlopen moet worden om de authenticatie binnen het project te laten werken.

1. Binnen je project klik je aan de linkerkant op 'Authentication'
2. Creëer een inlogmethode
3. Schakel e-mail, Google en Facebook in
    1. Let op: voor Facebook heb je de correcte keys nodig, deze kan je ophalen via [https://developers.facebook.com/](https://developers.facebook.com/)

### Database opstarten

1. Binnen je project klik je aan de linkerkant op 'Cloud Firestore'
2. Klik op 'Database maken'
3. Start je project in productiemodus met als locatie 'eur3'

## Project runnen

Nadat bovenstaande stappen zijn doorlopen, kan je je project opstarten door te navigeren naar de folder waar je code inzit, en het commando `yarn dev` uitvoeren in je terminal.

---

# Online deployment

## Font-end

De website kan gehost worden op Vercel. Om dit te doen moet je het project op een Github repository plaatsen, deze kan dan gehost worden.

1. Maak een nieuwe Vercel project aan
2. Selecteer je Github repo
    1. Project naam kan je kiezen
    2. Gebruik als Framework preset 'Next.js'
    3. Root directory is `./`
3. Stel je environment variabelen in (Firebase SDK). Dit kan je doen bij instellingen
4. Bij instellingen ga je naar 'Git', maak een nieuwe deploy hook aan.
5. Kopieer de URL deploy hook, deze moet je instellen onder `./pages/maak-project/index.js` bij de `handleSubmit` boven de `fetch`,  in productie raden we aan om dit bij de environment variabelen te zetten en zo op te halen

## Back-end

1. Binnen je Firebase project, navigeer je bij de linkerkant naar authenticatie
2. Onderaan plaats je bij Gemachtigde domeinen, de URL die overeenkomt met je online Vercel link
