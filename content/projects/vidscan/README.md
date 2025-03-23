# Instrukcja dodawania nowych projektów

Aby dodać nowy projekt do strony, wykonaj następujące kroki:

## 1. Stwórz katalog projektu

Stwórz nowy katalog w folderze `content/projects/` o nazwie odpowiadającej projektowi, np. `orthoscan`, `xaoc`, `popscan`, `fpga_board` itp.

```bash
mkdir -p content/projects/nazwa_projektu
mkdir -p content/projects/nazwa_projektu/media
```

## 2. Stwórz plik JSON z danymi kafelka

Stwórz plik JSON o nazwie `nazwa_projektu-card.json` w katalogu projektu. Możesz skopiować i zmodyfikować plik z szablonu:

```bash
cp content/projects/template/template-card.json content/projects/nazwa_projektu/nazwa_projektu-card.json
```

Następnie edytuj plik, aby zawierał odpowiednie dane:

```json
{
    "title": "Nazwa Projektu",
    "image": "main_image.jpg",
    "description": "Krótki opis projektu, który będzie wyświetlany na kafelku.",
    "authors": 
    {
        "Adam Łuczak": {},
        "Współautor 1": {},
        "Współautor 2": {}
    },
    "tags": 
    {
        "tag1": {},
        "tag2": {},
        "tag3": {}
    }
}
```

## 3. Stwórz plik Markdown z pełnym opisem projektu

Stwórz plik Markdown o nazwie `nazwa_projektu-description.md` w katalogu projektu. Możesz skopiować i zmodyfikować plik z szablonu:

```bash
cp content/projects/template/template-description.md content/projects/nazwa_projektu/nazwa_projektu-description.md
```

Następnie edytuj plik, aby zawierał odpowiedni opis projektu.

## 4. Dodaj obrazy projektu

Dodaj obrazy projektu do katalogu `content/projects/nazwa_projektu/media/`. Upewnij się, że nazwy plików odpowiadają nazwom użytym w plikach JSON i Markdown.

## 5. Dodaj projekt do listy projektów

Edytuj plik `content/projects_and_applications.md` i dodaj nowy katalog projektu do listy `projectDirs`:

```javascript
const projectDirs = [
  'projects/aerosafety',
  'projects/barrel_distortion',
  'projects/template',
  'projects/nazwa_projektu',
  // Tutaj można dodać więcej katalogów projektów
];
```

## Wskazówki

- Upewnij się, że nazwy plików są zgodne z nazwą katalogu projektu (np. `orthoscan-card.json` i `orthoscan-description.md` dla katalogu `orthoscan`).
- Obrazy powinny być zoptymalizowane pod kątem rozmiaru i jakości, aby strona ładowała się szybko.
- Krótki opis w pliku JSON powinien być zwięzły i informować o głównych cechach projektu.
- W pełnym opisie projektu możesz używać wszystkich funkcji Markdown, w tym nagłówków, list, linków, obrazów itp. 