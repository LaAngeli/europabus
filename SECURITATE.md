# Securitate Formulare - EuropaBus

## Măsuri de Securitate Implementate

### 1. **Validare Input**
- ✅ Validare în timp real pentru fiecare câmp
- ✅ Sanitizare automată a input-urilor
- ✅ Filtrare caractere nepermise
- ✅ Validare format specific pentru fiecare tip de câmp

### 2. **Protecție Anti-Bot**

#### Honeypot Field
- Câmp ascuns completat doar de boti
- Dacă este completat, formularul este blocat silențios
- Invisible pentru utilizatori reali

#### Rate Limiting
- Maxim 5 încercări de trimitere în 15 minute
- Blocare automată după depășirea limită
- Resetare automată după expirarea perioadei

### 3. **Validare Specifică pe Câmpuri**

#### Nume
- **Format**: Litere (română, rusă, engleză), spații, cratime, apostroafe
- **Lungime**: 2-50 caractere
- **Sanitizare**: Elimină tag-uri HTML și script-uri

#### Telefon
- **Format**: Acceptă formate internaționale (+373, 0, spații, paranteze)
- **Lungime**: 8-15 cifre (după eliminarea separatoarelor)
- **Exemple valide**: 
  - +373 69 876 660
  - 069876660
  - (069) 876-660

#### Email
- **Format**: Standard email (user@domain.com)
- **Lungime**: Maxim 100 caractere
- **Sanitizare**: Conversie automată la lowercase

#### Locație (Plecare/Destinație)
- **Format**: Litere, cifre, spații, cratime, virgule, puncte
- **Lungime**: 2-100 caractere

#### Dată
- **Validare**: Trebuie să fie în viitor
- **Limită**: Nu mai departe de 1 an
- **Format**: Date HTML5 standard

#### Număr (Pasageri/Colete)
- **Pasageri**: 1-50
- **Colete**: 0-100
- **Validare**: Doar numere întregi pozitive

#### Subiect
- **Format**: Litere, cifre, spații, punctuație comună
- **Lungime**: 3-100 caractere

#### Mesaj
- **Format**: Litere, cifre, spații, punctuație, linii noi
- **Lungime**: 10-1000 caractere

### 4. **Sanitizare Input**

Toate input-urile sunt sanitizate pentru a preveni:
- **XSS (Cross-Site Scripting)**: Elimină tag-uri HTML și JavaScript
- **SQL Injection**: Sanitizare caractere speciale
- **Code Injection**: Elimină pattern-uri de execuție

### 5. **Feedback Utilizator**

- ✅ Mesaje de eroare clare și specifice
- ✅ Validare în timp real după `onBlur`
- ✅ Indicatori vizuali (border roșu pentru erori)
- ✅ Contor caractere pentru câmpurile cu limită
- ✅ Mesaje de succes/eroare după trimitere

## Implementare Backend (Recomandat)

Pentru securitate completă, implementează și pe backend:

```javascript
// Exemplu Node.js/Express
app.post('/api/reservations', async (req, res) => {
  // 1. Re-validare toate câmpurile
  // 2. Verificare rate limiting (folosind Redis/IP)
  // 3. Verificare honeypot
  // 4. Sanitizare suplimentară
  // 5. Verificare CSRF token
  // 6. Logging pentru audit
  // 7. Trimite email de confirmare
})
```

## Măsuri Suplimentare Recomandate

1. **CSRF Protection**: Adaugă CSRF tokens pentru request-uri
2. **reCAPTCHA v3**: Pentru protecție suplimentară (opțional)
3. **IP Blocking**: Blochează IP-uri suspecte
4. **Email Verification**: Verifică email-ul înainte de procesare
5. **Backend Validation**: Re-validează toate datele pe server
6. **Rate Limiting pe IP**: Folosește Redis sau similar
7. **Logging**: Loghează toate încercările de trimitere

## Testare Securitate

Pentru a testa securitatea:

1. **Test Honeypot**: Încearcă să completezi câmpul ascuns
2. **Test Rate Limiting**: Trimite formularul de 6+ ori rapid
3. **Test Validare**: Încearcă să introduci caractere invalide
4. **Test XSS**: Încearcă să introduci `<script>alert('XSS')</script>`
5. **Test SQL Injection**: Încearcă să introduci `'; DROP TABLE--`

## Note Importante

- ✅ Toate validările sunt pe frontend pentru UX
- ⚠️ **OBLIGATORIU**: Re-validează pe backend
- ✅ Rate limiting folosește localStorage (poate fi bypassat)
- ⚠️ Pentru producție, folosește rate limiting pe server
- ✅ Honeypot este eficient împotriva botilor simpli
- ⚠️ Pentru boti avansați, adaugă reCAPTCHA

## Configurare

Toate setările de securitate pot fi modificate în:
- `src/utils/validation.js` - Validări și rate limiting
- `src/components/SecureForm.jsx` - Protecție anti-bot

