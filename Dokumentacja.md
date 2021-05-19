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




















