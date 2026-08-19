# ELEKTRO MARKET – Moderní E-shop Šablona pro Klienty

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.3-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.11-38bdf8.svg)](https://tailwindcss.com/)

Plně funkční, responzivní prezentační šablona moderního e-shopu se spotřební elektronikou, navržená přesně podle grafické předlohy. Připravena k okamžitému nasazení a ukázce potenciálním klientům.

---

## 🌟 Klíčové Funkce

- 🎯 **Věrný Design 1:1 dle předlohy**: Hlavička s logem, navigační menu s dropdowny, moderní Hero Banner a katalog v odpovídajícím rozložení.
- ⚡ **Živé Vyhledávání & Našeptávač**: Okamžité vyhledávání mezi produkty v reálném čase s náhledem cen a dostupnosti.
- 👥 **Živé Statistiky Návštěvnosti**:
  - Pulzující zelený indikátor online zákazníků v horní liště, banneru, kartách i patičce.
  - Celkové počítadlo zhlédnutí a denní počet objednávek.
  - Plovoucí notifikace nedávných nákupů zákazníků (Social Proof).
- 🛒 **Interaktivní Nákupní Košík (Slide-over Cart)**:
  - Přepočet cen v reálném čase, změna počtu kusů.
  - Ukazatel dopravy zdarma s progress barem (od 2 000 Kč).
  - Uplatnění slevových kupónů (`ELEKTRO10`, `VIP20`, `LETO2026`).
- 💳 **Kompletní Pokladna (Multi-Step Checkout)**:
  - Výběr dopravy (Zásilkovna, PPL, Balíkovna, Osobní odběr).
  - Výběr platby (Karta 3D Secure, Apple/Google Pay, QR Převod, Dobírka).
  - Kontaktní a fakturační údaje (s volbou nákupu na firmu IČO/DIČ).
  - Dokončení objednávky s konfetovým efektem a tiskem potvrzení.
- 🔍 **Detail Produktu (Quick View Modal)**: Galerie fotografií, technické specifikace, zákaznické recenze.
- ⚖️ **Porovnávač Produktů & Oblíbené (Wishlist)**: Srovnání až 4 produktů v přehledné tabulce.
- 🎛️ **Klientský Demo Panel**: Plovoucí lišta vlevo dole pro rychlou ukázku (naplnění košíku 1 kliknutím, přepínání měn CZK / EUR, testovací kupóny).

---

## 🚀 Spuštění a Instalace

### Lokální vývoj:
```bash
# 1. Instalace závislostí
npm install

# 2. Spuštění vývojového serveru
npm run dev
```

### Produkční sestavení:
```bash
npm run build
```
Výsledné optimalizované soubory budou uloženy do složky `dist/`.

---

## 🌐 Nasazení na GitHub Pages / Web

### Možnost 1: Automaticky přes GitHub Actions (Doporučeno)
1. Nahrajte kód do vašeho GitHub repozitáře:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Elektro Market E-shop template"
   git branch -M main
   git remote add origin https://github.com/<vase-jmeno>/<nazev-repozitare>.git
   git push -u origin main
   ```
2. Na GitHubu v repozitáři přejděte do: **Settings** -> **Pages** -> pod **Build and deployment** zvolte **Source: GitHub Actions**.
3. Při každém pushnutí na větev `main` se web automaticky zkompiluje a nasadí!

### Možnost 2: Vercel / Netlify
- Propojte repozitář na [Vercel](https://vercel.com) nebo [Netlify](https://netlify.com).
- Build command: `npm run build`
- Output directory: `dist`

---

## 🧪 Testovací Slevové Kódy

Při prezentaci košíku můžete použít tyto připravené kódy:
- `ELEKTRO10` – Sleva 10 %
- `VIP20` – Sleva 20 %
- `LETO2026` – Sleva 15 %
- `SLEVA500` – Sleva 500 Kč

---

## 🛠️ Použité Technologie

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Ikony**: Lucide React
- **Efekty**: Canvas Confetti
