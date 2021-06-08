# Studio projektowe - WEB OCR

#### Autorzy:

* Kamil Sikora
* Konrad Kalita
* Karol Widuch

## Sekcje:

* [Założenia projektu](#założenia-projektu)
* [Wybrana metodyka](#wybrana-metodyka)
* [Licencja](#licencja)
* [Funkcjonalności](#funkcjonalności)
* [Architektura](#architektura)
  * [Frontend](#frontend)
  * [Backend](#backend)
  * [Struktura aplikacji](#struktura-aplikacji)
  * [Opis poszczególnych komponentów](#opis-poszczególnych-komponentów)
* [Wymagania niefunkcjonalne](#wymagania-niefunkcjonalne)
* [Interakcja użytkownika](#interakcja-użytkownika)

## Założenia projektu

Aplikacja ma umożliwiać wykorzystanie Google OCR API do analizy tekstów
(plików PDF). Wyświetlane będą właściwości tekstu oraz będzie możliwość
jego edycji już po sparsowaniu poprzez API.
Użytkownik będzie miał podgląd przetwarzanego pliku wraz z możliwością
nawigacji między stronami.

## Wybrana metodyka

Klasyczna - wybraliśmy ją ze względu na to, że pozwala na dokładne
zaplanowanie poszczególnych prac oraz bezwzględne trzymanie się terminów.
Projekt będzie realizowany krok po kroku, bez jakichkolwiek zmian, ponieważ
jest to dość wąska tematyka to nie przewidujemy żadnych większych zmian.

## Licencja

W projekcie użyta będzie licencja GPL3.0 License

## Funkcjonalności

* Pole tekstowe wyświetlające zawartość detekcji wraz z możliwością edycji
* Podgląd PDF - widoczna aktualna strona przesłanego pliku
* Miniaturowy podgląd wszystkich stron wraz z możliwością nawigacji pomiędzy nimi
* Podgląd właściwości wykrytego tekstu
* Przycisk wywołujący modal do obsługi przesyłanie plików
* Przesyłanie plików z własnego urządzenia poprzez interakcje użytkownika z wyświetlanym modalem
* Przesyłanie plików z własnego urządzenia na zasobnik cloud storage
* Wysyłanie zapytań i otrzymywanie odpowiedzi z Google Vision Api

## Architektura

### Frontend

#### Wykorzystane technologie:

* React
* TypeScript
* ChakraUI
* Axios (biblioteka do wysyłania zapytań i komunikacji z backendem)

### Backend

Do stworzenia backendu wykorzystamy Framework Next JS API Routes wraz z
Node.JS.  
Backend będzie odpowiadał za komunikacje z Google Vision Api
oraz Cloud Storage Bucket.

### Struktura aplikacji

![diagram](https://github.com/KalitaKonrad/web-ocr/blob/main/architektura.png)
### Opis poszczególnych komponentów

#### Main Content:

* W głównym oknie znajdują się dwa komponenty główne - TextArea, PDF Viewer. Znajdują się one na środku widoku.
* Komponent po lewej stronie umożliwia podgląd (odpowiednio duże okno, tak aby było czytelne) obecnie wybranej strony PDFa. Na dole tego komponentu znajdują się przyciski do nawigacji pomiędzy stronami. Wszystkie zmiany stron są zsynchronizowane z widokiem znajdującym się w panelu bocznym po lewej stronie (opis tego komponentu poniżej).
* Drugi komponent typu TextArea znajdujący się po prawej stronie daje wynikowy tekst po przepuszczeniu go poprzez Google OCR API. Zwrócony tekst jest w pełni edytowalny - użytkownik może w niego ingerować, a jego akcje zapisywane są w stanie aplikacji.

#### Left Panel: 

* Panel boczny znajdujący się po lewej stronie umożliwia podgląd załadowanego lokalnie pliku PDF. Zawiera on listę komponentów SiteThumbnail, które reprezentują poszczególne strony PDFa. Możemy tam swobodnie poruszać się po wszystkich stronach i przełączać między nimi. Widoczne tam strony PDFa nie mają żadnych zmian i są czystym plikiem wczytanym przez użytkownika. Do poprawnego wyświetlenia PDFa użyta została biblioteka react-pdf.

#### Right Panel: 

* Panel boczny znajdujący się po prawej stronie prezentuje właściwości wykrytego przy użyciu Google OCR API tekstu.

#### Upload File Modal: 

* Komponent odpowiedzialny za umożliwienie wrzucenie pliku lokalnie od użytkownika i przesłanie go na backend (NextJS). Komponent ten używa biblioteki react-dropzone, która poza zwykłym wybraniem pliku z systemu plików umożliwia funkcjonalność drag'n'drop. Wybierany plik jest walidowany i w przypadku, gdy jego rozszerzenie różni się od .pdf to stosowna informacja zwortna wyświetlana jest użytkownikowi.
* Jeśli plik zostanie zaakceptowany (ma rozszerzenie PDF) to jest on przesyłany na backend gdzie plik jest przesyłany dalej do Google Cloud Storage. Przechowywanie tam pliku jest wymagane, ponieważ tylko stamtąd Google OCR API jest w stanie wykonać detekcję. Po zapisaniu tego pliku wysyłane jest zapytanie, aby została wykonana detekcja tekstu. Jako rezultat odsyłany jest JSON z wykrytym tekstem i jego parametrami.

#### Store:

* Mechanizm state-management z wykorzystaniem pakietu zustand. Store przechowuje wykrytą detekcje w tablicy tesktów dla każdej strony pliku. Po modyfikacji detekcji przez użytkownika elementy tablicy są modyfikowane. Dzięki takiemu przechowywaniu tekstów można się do nich łatwo odwołać w całej aplikacji oraz zachować zmodyfikowany tekst użytkownika przez cały czas jego użytkowania aplikacji

#### API:

* API umożliwia komunikacje z Cloud Storage oraz Google Vision Api. Frontend do komunikacji z API wykorzystuje pośrednio bibliotekę axios.
* Upload plików do zdefiniowanego zasobnika Cloud Storage wykorzystując metodę POST. Przesyłany plik jest wcześniej wprowadzony przez użytkownika
* Wysyłanie requestów do Google Vision Api o detekcje tekstu na podstawie nazwy do wcześniej zapisanego w zasobniku Cloud Storage pliku PDF. Otrzymywanie odpowiedzi w formacie JSON zawierającej detekcje wraz z dodatkowymi właściwościami.  

Do stylowania każdego z powyższych komponentów została użyta ChakraUI. Do dbania o poprawność typowania i czysty kod zostały użyte odpowiednio TypeScript + Eslint.

## Wymagania niefunkcjonalne

* utworzony odpowiedni zasobnik w Cloud Storage
* posiadanie odpowiedniego pliku autoryzacyjnego aby uzyskać dostęp do zdefiniowanego zasobnika Cloud Storage
* poprawne działanie Google Vision Api
* poprawne działanie Api Cloud Storage
* termin ukończenia aplikacji na 16 czerwca 2021

## Interakcja użytkownika

Użytkownik po wejściu w naszą aplikację ma dostępny interfejs opisany wyżej. W skrócie jest to panel boczny z miniaturkowym podglądem kilku stron na raz PDFa, w centrum ekranu ma dwa pola tekstowe - po lewym obecna strona na, której się znajduje a po prawej wynik OCR z pliku, który wyśle do analizy. Na dole ekranu znajduje się przycisk z napisem "Dodaj pliki". 
1. Pierwszym krokiem do rozpoczęcia interakcji ze stroną jest jego naciśnięcie.
2. Wyświetlone zostanie okno, gdzie możemy przeciągnąć interesujący nas plik PDF lub możemy wybrać go z kolejnego okna, które pojawi się po kliknięciu w obrębie pola okna. Plik PDF musi znajdować się u nas lokalnie na komputerze. Warto tutaj dodać, że format PDF jest jedynym akceptowalnym formatem przesyłanego pliku - jeśli wybrany plik będzie miał inny format to nie zostanie on zaakceptowany i stosowna informacja zostanie wyświetlona użytkownikowi.
3. Po dodaniu pliku zatwierdzamy przyciskiem "Wyślij" - czekamy aż plik zostanie zapisany w Google Cloud Storage i zostanie wykonana na nim operacja OCR. Gdy to się wykona - zamykane jest okno dodawania pliku i widzimy rezultat. 
4. W centrum ekranu po prawej stronie mamy wynik operacji OCR, który możemy swobodnie edytować. Edycja zostanie zachowana aż do zmiany pliku.
5.  Używając lewego panelu możemy poruszać się po PDFie i podglądać inne strony. Każda ze stron, która aktualnie mamy zaznaczoną widzimy w centrum okna przeglądarki po lewej stronie w powiększeniu. 
6. W prawym panelu możemy podglądnąć właściwości pliku
 
## Instrukcja instalacji i uruchomienia aplikacji

1. W celu instalacji musimy pobrać kod źródłowy z repozytorium poprzez komendę w terminalu - `git clone https://github.com/KalitaKonrad/web-ocr`.
2. Do uruchomienia aplikacji potrzebne będzie również środowisko `Node`, które możemy pobrać dla każdego z najpopularniejszych systemów operacyjnych stąd: `https://nodejs.org/en/download/`.
3. Następnie potrzebne będzie nam konto Google Cloud. Należy stworzyć plik `account.json` w folderze `./secrets`, który tworzymy w głównym katalogu projektu. Instrukcja do wygenerowania tego pliku opisana jest w dokumentacji Google Cloud - `https://cloud.google.com/iam/docs/creating-managing-service-account-keys`
4. Potrzebny będzie jeszcze plik .env znajdujący się w głównym katalogu projektu - należy go samemu stworzyć i wypełnić wartościami na podstawie pliku `env.example`. Gdzie odpowiednio:
- `GOOGLE_APPLICATION_CREDENTIALS` - lokalizacja pliku account.json -> normalnie będzie to ./secrets/account.json
- `CLOUD_BUCKET_OUTPUT_PREFIX` - nazwa podfolderu, w którym zapisują się wyniki operacji OCR wykonywanej przez API Google'a
- `CLOUD_BUCKET_NAME` - nazwa bucketu, na którym będziemy operować podczas korzystania z aplikacji
5. Po wykonaniu powyższych kroków możemy uruchomić aplikację z terminala komendą `yarn dev`. Należy znajdować się w głównym katalogu projektu. 

Aplikacja domyślnie będzie znajdować się na porcie `3000` i tam też z niej można korzystać po wejściu w przeglądarce na adres `localhost:3000`. 
