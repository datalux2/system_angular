System demonstracyjny wejść i wyjść w obiektach handlowych
==========================================================

Projekt został zrobiony za pomocą:

- NodeJS 21.2

- Angular 17.0.4

Trzeba doinstalować biblioteki Angulara. Aby uruchomić aplikację trzeba podać polecenie:

ng serve

Po uruchomieniu aplikacji wchodzimy na adres w przeglądarce internetowej http://localhost:4200. W pliku src/app/cameras.service.ts
podajemy we fragmencie kodu adres API serwera NodeJS:

main_url = 'http://localhost:8000';

Po wejściu w menu w link "Kamery" powinna się pojawić lista kamer. Jeśli nie ma kamer w bazie danych to wyświetli się tekst "Brak danych".
Po wejściu w link "Dodaj kamerę" pojawi się formularz dodawania kamery. Podaje się tam wszystkie potrzebne dane i zatwierdza na dole przyciskiem.
Formularz ten zawiera walidację. Gdy z listy kamer wybierzemy kamerę i wciśniemy link "Edytuj" pojawi się formularz aktualizacji kamery. W polach
formularza będą załadowane dane z bazy. Zmiany wartości pól zatwierdzamy na dole przyciskiem. Formularz ten również zawiera walidację. Jeśli
chcemy usunąć wybraną kamerę to wybieramy przy danej kamerze link "Usuń" z listy kamer. Po wciśnięciu linku "Usuń" pojawi się pytanie czy
potwierdzamy akcję usuwania. Jeśli zatwierdzimy pytanie kamera wybrana zostanie usunięta a jak odrzucimy pytanie to nie wykona się nic. Na
górze strony pojawiają się komunikaty.
