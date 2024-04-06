import fitz  # PyMuPDF
import os

def generuj_miniature(pdf_path, img_path):
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)  # pierwsza strona
    pix = page.get_pixmap()
    pix.save(img_path)

def przeszukaj_i_generuj(katalog):
    for root, dirs, files in os.walk(katalog):
        for file in files:
            if file.endswith(".pdf"):
                pdf_path = os.path.join(root, file)
                img_path = os.path.join(root, os.path.splitext(file)[0] + ".png")
                print(f"Generowanie miniatury dla: {pdf_path}")
                try:
                    generuj_miniature(pdf_path, img_path)
                except Exception as e:
                    print(f"Błąd przy generowaniu miniatury dla {pdf_path}: {e}")


katalog_glowny = "./"
przeszukaj_i_generuj(katalog_glowny)
