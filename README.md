# Notes

Ovaj projekat predstavlja aplikaciju za biljezenje zabiljeski koja omogućava korisnicima da jednostavno stvaraju, uređuju i brišu zabiljeske.
Projekat je razvijen kao dio mog internešipa kako bih demonstrirao svoje vještine u programiranju.

## Funkcionalnosti

- **Kreiranje korisnika:** Korisnici se mogu registrovati kao korisnici neke kompanije
- **Role za korisnike:** Korisnici mogu biti admini ili useri. Admin ima uvid u sve zabiljeske usera svoje kompanije.
- **Dodavanje zabiljeski:** Korisnici mogu dodavati nove zabiljeske unosom naslova i sadržaja beleške.
- **Uređivanje zabiljeski:** Postojeće zabiljeske mogu se jednostavno uređivati kako bi se ažurirao naslov ili sadržaj.
- **Brisanje zabiljeski:** Korisnici mogu brisati zabiljeske koje više nisu potrebne.
- **Pretraga zabiljeski:** Aplikacija omogućava pretragu zabiljeski po naslovu.

## Instalacija

1. Klonirajte repozitorijum na vaš lokalni sistem koristeći komandu:

git clone https://github.com/Mure01/notes.git

2. Otvorite projekat u svom omiljenom razvojnom okruženju.
3. Instalirajte sve potrebne zavisnosti pokretanjem komande: npm install
4. U svoje okruzenje dodajte .env fajl sa varijablama:
   port = broj_porta (inace je 3000 po defaultu)
   LINK_BAZE = "vas_link"
   TOKEN_SECRET_KEY = "vas kljuc za token"
5. Pokrenite aplikaciju koristeći komandu: npm run dev

## Tehnologije

Projekat je razvijen koristeći sledeće tehnologije:

- **Backend:** Node.js, Express.js
- **Baza podataka:** MongoDB

Ovaj projekat je razvijen od strane [Belmin Muratović](https://github.com/Mure01) kao dio internešipa u kompaniji Walter Code. Kontaktirajte me ako imate bilo kakvih pitanja ili sugestija.
