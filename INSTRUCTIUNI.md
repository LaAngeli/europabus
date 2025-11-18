# Instrucțiuni pentru EuropaBus

## Instalare și Pornire

1. **Instalează dependențele:**
```bash
npm install
```

2. **Pornește serverul de dezvoltare:**
```bash
npm run dev
```
Site-ul va fi disponibil la `http://localhost:3000`

3. **Construiește pentru producție:**
```bash
npm run build
```

## Procesarea Logo-ului

Logo-ul actual (`img/logo/meta-logo-300x218.png`) necesită un fundal transparent. Opțiuni:

### Opțiunea 1: Folosind un editor online
1. Deschide https://www.remove.bg/ sau https://photopea.com/
2. Încarcă `img/logo/meta-logo-300x218.png`
3. Elimină fundalul
4. Salvează ca PNG cu transparență
5. Înlocuiește fișierul original

### Opțiunea 2: Folosind Photoshop/GIMP
1. Deschide logo-ul în editor
2. Elimină fundalul (Magic Wand sau Select Subject)
3. Salvează ca PNG-24 cu transparență

### Opțiunea 3: Folosind SVG (recomandat)
Dacă ai acces la logo-ul SVG original, folosește-l direct - SVG-urile suportă nativ transparența.

## Adăugarea Imaginilor în Galerie

1. Creează folderul `public/img/gallery/` dacă nu există
2. Adaugă imaginile autobuzelor (formate recomandate: JPG, WebP)
3. Numește-le descriptiv: `bus1.jpg`, `bus2.jpg`, etc.
4. Actualizează array-ul `images` din `src/pages/Galerie.jsx` cu numele corecte

## Configurarea Formularelor

Formularele (Rezervări și Contact) necesită un backend pentru funcționalitate completă. Opțiuni:

1. **Email direct** - Modifică `handleSubmit` pentru a trimite email prin `mailto:`
2. **Backend API** - Integrează cu un serviciu de backend (Node.js, PHP, etc.)
3. **Servicii third-party** - Folosește Formspree, Netlify Forms, etc.

Exemplu cu Formspree:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  // ...
}
```

## Personalizare Culori

Modifică culorile în `tailwind.config.js`:
- `primary` - Culoarea principală (navbar, titluri)
- `secondary` - Culoarea secundară (butoane, accent)
- `accent` - Culoarea de accent (highlight-uri)

## Traduceri

Traducerile se găsesc în:
- `src/locales/ro.json` - Română
- `src/locales/ru.json` - Rusă

Pentru a adăuga o nouă traducere:
1. Adaugă cheia în ambele fișiere JSON
2. Folosește `t('cheia.noua')` în componente

## Optimizare pentru Producție

1. **Optimizează imagini:**
   - Folosește WebP pentru imagini
   - Comprimă imagini cu TinyPNG sau similar
   - Folosește dimensiuni adecvate

2. **Build pentru producție:**
```bash
npm run build
```
Output-ul va fi în folderul `dist/`

3. **Deploy:**
   - Netlify, Vercel, GitHub Pages, etc.
   - Sau upload folderul `dist/` pe serverul tău

## Note Importante

- Site-ul este optimizat pentru mobile-first
- Toate animațiile sunt performante și nu afectează UX-ul
- Design-ul este complet responsive
- Sistemul de traduceri salvează preferința utilizatorului în localStorage

## Suport

Pentru întrebări sau probleme, contactează echipa de dezvoltare.

