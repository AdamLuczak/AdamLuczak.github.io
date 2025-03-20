# VidScan - System do tworzenia modeli 3D na podstawie filmu

## Przegląd projektu

VidScan to kompleksowe rozwiązanie do tworzenia modeli 3D na podstawie filmów. System przetwarza nagrania wideo, wyodrębnia z nich klatki, analizuje je za pomocą sieci neuronowej w celu wykrycia obiektów, a następnie generuje trójwymiarowe modele obiektów przy użyciu technologii fotogrametrycznych.

System został zaprojektowany przede wszystkim do zastosowań medycznych, ze szczególnym uwzględnieniem skanowania kończyn osób z amputacją. Głównym celem jest tworzenie dokładnych modeli 3D zarówno kikutów, jak i zdrowych kończyn (rąk i nóg), które mogą być wykorzystane w procesie projektowania i dopasowywania protez.

## Architektura systemu

System składa się z kilku kluczowych komponentów:
- Serwer WWW do zarządzania danymi użytkowników i plikami
- Moduł przetwarzania wideo
- Sieć neuronowa do wykrywania obiektów i generowania masek
- Moduł rekonstrukcji 3D (Meshroom)

## Przepływ danych i etapy przetwarzania

### 1. Ekstrakcja klatek z filmu
Film wejściowy jest przetwarzany przez moduł `st00_extract_images.py`, który wyodrębnia klatki z określoną częstotliwością (domyślnie 5 FPS) i dostosowuje ich rozmiar do rozdzielczości 1280px.

### 2. Konwersja przestrzeni kolorów
Moduł `st01_convert_color_space.py` przetwarza wyodrębnione klatki, konwertując je z przestrzeni RGB do przestrzeni LAB, co jest istotne dla dalszego przetwarzania i segmentacji obiektów.

#### Znaczenie przestrzeni kolorów LAB
Przestrzeń kolorów LAB została wybrana nieprzypadkowo dla tego konkretnego zastosowania:

- **Separacja jasności od koloru**: LAB oddziela jasność (kanał L) od informacji o kolorze (kanały a i b), co umożliwia bardziej efektywną identyfikację skóry niezależnie od warunków oświetleniowych
- **Konsystencja odcieni skóry**: W przestrzeni LAB odcienie ludzkiej skóry grupują się w określonych zakresach wartości kanałów a i b, mimo różnic w jasności czy etnicznym pochodzeniu
- **Większa odporność na zmienne oświetlenie**: Dzięki separacji jasności, sieć neuronowa może lepiej koncentrować się na rzeczywistych różnicach w kolorze skóry, ignorując zmiany w jasności spowodowane cieniami czy różnym oświetleniem
- **Lepsza wykrywalność granic**: Przestrzeń LAB zapewnia lepsze rozróżnianie granic między obszarami o podobnym kolorze, co jest kluczowe dla dokładnej segmentacji kończyn i kikutów

Ta konwersja znacząco poprawia skuteczność sieci neuronowej w wykrywaniu i segmentacji ludzkiej skóry, co jest niezbędne dla prawidłowego wyodrębnienia kończyn i kikutów z tła.

### 3. Generowanie masek obiektów
Moduł `st02_evaluated_masks.py` wykorzystuje sieć neuronową (U-Net) do wykrywania obiektów na obrazach i generowania masek, które identyfikują obszary zainteresowania. Sieć została przeszkolona do rozpoznawania określonych typów obiektów, w szczególności:
- Fragmentów skóry ludzkiej
- Kończyn (rąk i nóg)
- Kikutów poamputacyjnych

#### Architektura sieci neuronowej
System wykorzystuje zaawansowaną architekturę sieci neuronowej opartą na modelu ResNetFlexUNet, która łączy zalety sieci ResNet z architekturą U-Net:

- **Podstawowa struktura**: Sieć ma strukturę U-Net z ścieżką kodującą (enkoder) i dekodującą (dekoder) z połączeniami skip-connection
- **Enkoder**: Wykorzystuje architekturę ResNet (resnet18, resnet34, resnet50, resnet101 lub resnet152) jako podstawę, z możliwością wykorzystania pretrenowanych wag
- **Dekoder**: Zbudowany z bloków ResNet (ResnetBasicBlock lub ResnetBottelneck) połączonych z odpowiadającymi warstwami ścieżki kodującej
- **Funkcje aktywacji**: Wykorzystuje ReLU (Rectified Linear Unit) jako funkcje aktywacji
- **Normalizacja**: Opcjonalnie wykorzystuje normalizację wsadową (batch normalization) dla stabilności treningu

Sieć jest skonfigurowana przez zestaw plików znajdujących się w katalogu `vs_unet.train_cfg`, które określają:
- Parametry treningu (rozmiar wsadu, współczynnik uczenia, liczba epok)
- Architekturę sieci (głębokość warstw, liczba filtrów, rodzaj bloków)
- Transformacje danych wejściowych
- Inicjalizację wag

Podczas ewaluacji (w katalogu `vs_unet_eval.cfg`), sieć wykorzystuje pliki wag zapisane w postaci `.pth.zip` do generowania masek segmentacji.

#### Specjalizacja w wykrywaniu skóry i kończyn
Sieć została specjalnie przeszkolona na zbiorze danych zawierającym obrazy kończyn i kikutów, aby wykrywać:
- Charakterystyczne cechy struktur anatomicznych kończyn
- Różne typy i kształty kikutów poamputacyjnych
- Różne odcienie skóry niezależnie od pochodzenia etnicznego pacjenta

Wykorzystanie przestrzeni LAB w połączeniu z architekturą U-Net znacząco poprawia dokładność segmentacji w tym specyficznym zastosowaniu medycznym, umożliwiając precyzyjne wyodrębnienie obiektów nawet w trudnych warunkach oświetleniowych czy przy zróżnicowanym tle.

### 4. Usuwanie tła
Po wygenerowaniu masek, moduł `st03_mask_background.py` usuwa tło z obrazów, pozostawiając tylko obiekty, które zostały wykryte przez sieć neuronową. W kontekście skanowania kończyn i kikutów, ten etap jest krytyczny dla uzyskania czystych modeli 3D, bez nieistotnych elementów otoczenia.

### 5. Generowanie modelu 3D
Moduł `st04_gen_obj.py` wykorzystuje oprogramowanie Meshroom (opartego na bibliotece AliceVision) do przetworzenia przygotowanych klatek i wygenerowania modelu 3D. Proces ten obejmuje:
- Analizę cech obrazu
- Dopasowanie punktów między różnymi klatkami
- Rekonstrukcję struktury z ruchu (Structure from Motion)
- Generowanie gęstej chmury punktów
- Tworzenie siatki (mesh) obiektu

### 6. Eksport wyników
Moduł `st05_export_results.py` eksportuje wygenerowane modele 3D do formatów OBJ/STL, które mogą być wykorzystane w różnych aplikacjach do druku 3D lub wizualizacji. W przypadku zastosowań medycznych, te modele mogą być bezpośrednio wykorzystane do projektowania spersonalizowanych protez lub ortez.

## Interfejs użytkownika

System zawiera interfejs webowy (`vs_www`) umożliwiający:
- Zarządzanie danymi pacjentów/użytkowników
- Przesyłanie plików wideo
- Monitorowanie statusu przetwarzania
- Pobieranie i przeglądanie wynikowych modeli 3D

## Infrastruktura techniczna

Projekt wykorzystuje:
- Python do przetwarzania danych i algorytmów komputerowego widzenia
- Biblioteki OpenCV i scikit-image do przetwarzania obrazów
- TensorFlow/PyTorch do implementacji sieci neuronowych
- Meshroom do fotogrametrycznej rekonstrukcji 3D
- Serwer WWW z PHP do interfejsu użytkownika

## Zastosowania

System VidScan może być wykorzystywany w różnych dziedzinach, takich jak:
- Dokumentacja medyczna pacjentów po amputacji
- Projektowanie i dopasowywanie spersonalizowanych protez
- Monitorowanie zmian kształtu kikuta w czasie
- Szkolenie personelu medycznego
- Inne zastosowania w modelowaniu 3D i digitalizacji obiektów 