# Wieloogniskowa Kamera Śledząca w Systemie AeroSafety

System Kamery Wiloogniskowej był opracowywany dla projektu AerosafetyShow Demostrator+PL.
W projekcie tym brało udziała X osób, były to dwa zespoły kierowane przez kolegę Sławomira Mackowiaka i przezemnie.

Kontakt do osób bioracych udziała w projekcie:

Adam Łuczak : 
- outlook adam.luczak@outlook.com, 
- github AdamLuczak.github.com
- linkedin www.linkedin.com/in/adam%C5%82uczak

Jakub Siast : 
- gmail jakubsiast@gmail.com, 
- github JakubSiast@gitchub.com
- linkedin www.linkedin.com/in/jakub-siast

Sławomi Mackowiak
- email slawomir.mackowiak@put.poznan.pl
- linkedin www.linkedin.com/in/slawomir-mackowiak-22a06b180

XXX

Mój udział w projekcie:
- Team Leader 
- System Architect
- Wybór obiektuwów, opracowanie i wykonanie płyek sterujacych kamerami (ogniskowa/przesłona) 
- Współpraca przy zaprojektowaniu i wykoniu konstrukcji urządzenia oraz części sterującej ruchem kamer


## Wstęp

W kontekście nieustannie rosnących wymagań bezpieczeństwa i dokładności w lotnictwie akrobacyjnym, projekt AeroSafety Demonstrator+PL (ASSD+PL) stanowi przełom w automatyzacji metod szkoleniowych oraz oceny wykonań lotów akrobacyjnych. Finansowany przez Unię Europejską, ASSD+PL jest inteligentnym systemem nadzoru lotów w czasie rzeczywistym, dedykowanym dla lotnictwa ogólnego, ze szczególnym uwzględnieniem akrobacji szybowcowej i samolotowej. Jego głównym celem jest poprawa jakości treningu, sędziowania oraz ogólnego poziomu bezpieczeństwa operacji lotniczych.

### Wieloogniskowa Kamera Śledząca - Podprojekt Systemu AeroSafety

Niniejszy dokument koncentruje się na kluczowym komponencie systemu AeroSafety - wieloogniskowej kamerze śledzącej. Ta innowacyjna technologia pozwala na automatyczne śledzenie statków powietrznych w trakcie wykonywania skomplikowanych manewrów akrobacyjnych, zapewniając niezrównaną dokładność i ciągłość obrazu. Dzięki zastosowaniu zaawansowanych algorytmów przetwarzania obrazu i danych z GPS, wieloogniskowa kamera śledząca stanowi fundament dla skutecznej analizy i oceny lotów, otwierając nowe możliwości dla trenerów, sędziów oraz samych pilotów.

W dalszej części dokumentu szczegółowo omówione zostaną aspekty techniczne i praktyczne zastosowanie wieloogniskowej kamery śledzącej, podkreślając jej znaczenie i wpływ na rewolucję w lotnictwie akrobacyjnym.


## Architektura Systemu Wieloogniskowego

System wieloogniskowy składa się z czterech kamer rozmieszczonych blisko siebie, tak aby uzyskane obrazy można było traktować jako współosiowe. Każda kamera rejestruje obraz przez obiektyw o różnej ogniskowej, od najmniejszej do największej, co pozwala na uzyskanie kilku obrazów o tej samej rozdzielczości, ale różnym kącie widzenia. Dzięki temu możliwe jest śledzenie obiektu na kilku płaszczyznach obrazu jednocześnie, co znacznie zwiększa efektywność śledzenia, nawet w przypadku błędów algorytmu lub szybkich ruchów obiektu.

Główne zalety:

- Zmniejszenie ograniczeń: System eliminuje potrzebę zmiany ogniskowej, charakterystyczną dla tradycyjnych systemów z zoomem, co pozwala na utrzymanie ciągłej ostrości bez konieczności jej dostosowywania po każdorazowej zmianie ogniskowej.
- Większa kontrola nad głębią ostrości: Umożliwia ustawienie głębi ostrości na bardziej ograniczony obszar, co w połączeniu z możliwością większego otwarcia przysłony, zapewnia lepsze doświetlenie matrycy i wyższą jakość obrazu.
- Efektywne śledzenie: System umożliwia śledzenie obiektu na obrazach o różnym kącie widzenia jednocześnie, co praktycznie eliminuje ryzyko utraty śledzonego obiektu.

Dodatkowo, opisano zastosowanie systemu w monitoringu strefy o wymiarach 1km x 1km x 1km, gdzie założono maksymalną prędkość samolotu na 400 km/h (111 m/s) i minimalną na 0 km/h (0 m/s). Analizując zakładany rozmiar samolotu (min. 6 m) i opóźnienie pozycji z systemu GPS (średnio około 2 sekundy), system wieloogniskowy demonstruje swoją wydajność w różnych scenariuszach monitoringu, uwzględniając różne odległości i kąty widzenia kamery względem samolotu.

Podsumowanie
System wieloogniskowej kamery śledzącej wprowadza znaczące innowacje w dziedzinie monitoringu i analizy ruchu obiektów powietrznych, oferując niezrównaną dokładność i efektywność. Jego zastosowanie w AeroSafety otwiera nowe możliwości dla analizy lotów akrobacyjnych, zapewniając cenne dane dla trenerów, sędziów i pilotów.


System Wieloogniskowy
W rozpatrywanym scenariuszu, mały samolot akrobacyjny jest obiektem, który chcemy śledzić. Ze względu na cel śledzenia, aby zapewnić bezpieczeństwo lotu, wymagane jest uchwycenie wystarczająco dużej przestrzeni wokół samolotu. Kąt widzenia powinien być na tyle duży, aby można było obserwować/wykrywać inny obiekt znajdujący się w pobliżu głównego tematu (potencjalnie sytuacja zabroniona).
Należy zauważyć, że najmniejszy samolot akrobacyjny ma długość około 8m. Oznacza to, że dla maksymalnej odległości obserwacji 2km osiągamy kątowy wymiar samolotu równy 0,45 stopnia.
Ze względu na potrzebę śledzenia samolotu pod kątem 360 stopni konieczne jest użycie ruchomej kamery połączonej z systemem śledzenia obiektów i odpowiednio z pozycjonowaniem kamery.
Zwykle mamy dwie opcje:
a) stosujemy kamerę o bardzo wysokiej rozdzielczości i obiektywie o średnim kącie widzenia około 30-45 stopni. Interesującą część obrazu uzyskuje się poprzez przycięcie obrazu. W wyniku przycięcia otrzymuje się obraz śledzonego obiektu z niewielkim otoczeniem. Ponieważ kamera rejestruje obraz pod dość szerokim kątem, ryzyko, że system śledzenia popełni błąd (i śledzony obiekt zostanie utracony) jest zminimalizowane. W przypadku utraty śledzonego obiektu nie możemy śledzić obiektu za pomocą obrazu i musimy wspierać system innymi danymi telemetrycznymi.
Największą wadą wspomnianego rozwiązania jest wysoka rozdzielczość przetwarzanego obrazu. W rzeczywistej aplikacji potrzebne jest około 12 MPX (4K, z proporcją obrazu 4:3). Dla tak dużej rozdzielczości wymagane jest zastosowanie obiektywu o wysokiej rozdzielczości. Ponadto, po rejestracji wideo mamy duży strumień wideo do przetworzenia (720 Mbyte na sekundę dla 4K/30FPS z chrominancją 4:2:0). Wymagany jest wysokowydajny system obliczeniowy (wysokie zużycie energii). Poza tym, trudno jest przesyłać tak duży strumień wideo do klastra obliczeniowego lub mieć jeden w pobliżu kamery śledzącej.

![trajektoria](./content/projects/aerosafety/media/trajektoria_01.svg) 
