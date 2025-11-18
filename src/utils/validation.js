// Validare și sanitizare pentru formulare

// Sanitizare input - elimină caractere periculoase
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>]/g, '') // Elimină tag-uri HTML
    .replace(/javascript:/gi, '') // Elimină javascript:
    .replace(/on\w+=/gi, '') // Elimină event handlers
}

// Validare nume complet
export const validateName = (name) => {
  const sanitized = sanitizeInput(name)
  // Permite litere, spații, cratime și apostroafe (pentru nume internaționale)
  // Dar nu permite doar apostroafe sau spații
  const nameRegex = /^[a-zA-ZăâîșțĂÂÎȘȚăâîșțА-Яа-яЁё\s\-']{2,50}$/
  // Verifică că există cel puțin o literă (nu doar spații, cratime sau apostroafe)
  const hasLetter = /[a-zA-ZăâîșțĂÂÎȘȚăâîșțА-Яа-яЁё]/.test(sanitized)
  
  return {
    isValid: nameRegex.test(sanitized) && hasLetter && sanitized.trim().length >= 2,
    value: sanitized,
    error: sanitized.length < 2 
      ? 'Numele trebuie să aibă minim 2 caractere'
      : !hasLetter
      ? 'Numele trebuie să conțină cel puțin o literă'
      : !nameRegex.test(sanitized)
      ? 'Numele poate conține doar litere, spații, cratime și apostroafe'
      : ''
  }
}

// Validare telefon
export const validatePhone = (phone) => {
  const sanitized = sanitizeInput(phone)
  // Acceptă formate internaționale: +373, 0, spații, cratime, paranteze
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
  const cleanPhone = sanitized.replace(/[\s\-\(\)\.]/g, '')
  
  return {
    isValid: phoneRegex.test(sanitized) && cleanPhone.length >= 8 && cleanPhone.length <= 15,
    value: sanitized,
    error: cleanPhone.length < 8
      ? 'Numărul de telefon trebuie să aibă minim 8 cifre'
      : cleanPhone.length > 15
      ? 'Numărul de telefon este prea lung'
      : !phoneRegex.test(sanitized)
      ? 'Format telefon invalid. Folosiți format: +373 69 876 660 sau 069876660'
      : ''
  }
}

// Validare email
export const validateEmail = (email) => {
  const sanitized = sanitizeInput(email.toLowerCase())
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  return {
    isValid: emailRegex.test(sanitized) && sanitized.length <= 100,
    value: sanitized,
    error: !sanitized
      ? 'Email-ul este obligatoriu'
      : !emailRegex.test(sanitized)
      ? 'Format email invalid. Exemplu: nume@exemplu.com'
      : sanitized.length > 100
      ? 'Email-ul este prea lung'
      : ''
  }
}

// Validare subiect
export const validateSubject = (subject) => {
  const sanitized = sanitizeInput(subject)
  // Permite litere, cifre, spații și caractere comune de punctuație
  const subjectRegex = /^[a-zA-ZăâîșțĂÂÎȘȚăâîșțА-Яа-яЁё0-9\s\.,!?\-'"]{3,100}$/
  
  return {
    isValid: subjectRegex.test(sanitized) && sanitized.length >= 3 && sanitized.length <= 100,
    value: sanitized,
    error: sanitized.length < 3
      ? 'Subiectul trebuie să aibă minim 3 caractere'
      : sanitized.length > 100
      ? 'Subiectul trebuie să aibă maxim 100 caractere'
      : !subjectRegex.test(sanitized)
      ? 'Subiectul conține caractere nepermise'
      : ''
  }
}

// Validare mesaj
export const validateMessage = (message) => {
  const sanitized = sanitizeInput(message)
  // Permite litere, cifre, spații și caractere de punctuație
  const messageRegex = /^[a-zA-ZăâîșțĂÂÎȘȚăâîșțА-Яа-яЁё0-9\s\.,!?\-'":;()\n\r]{10,1000}$/
  
  return {
    isValid: messageRegex.test(sanitized) && sanitized.length >= 10 && sanitized.length <= 1000,
    value: sanitized,
    error: sanitized.length < 10
      ? 'Mesajul trebuie să aibă minim 10 caractere'
      : sanitized.length > 1000
      ? 'Mesajul trebuie să aibă maxim 1000 caractere'
      : !messageRegex.test(sanitized)
      ? 'Mesajul conține caractere nepermise'
      : ''
  }
}

// Validare locație (plecare/destinație) - DOAR LITERE
export const validateLocation = (location) => {
  const sanitized = sanitizeInput(location)
  // Permite DOAR litere, spații, cratime, virgule și puncte (fără cifre)
  const locationRegex = /^[a-zA-ZăâîșțĂÂÎȘȚăâîșțА-Яа-яЁё\s\-\.,]{2,100}$/
  // Verifică că există cel puțin o literă
  const hasLetter = /[a-zA-ZăâîșțĂÂÎȘȚăâîșțА-Яа-яЁё]/.test(sanitized)
  
  return {
    isValid: locationRegex.test(sanitized) && hasLetter && sanitized.trim().length >= 2 && sanitized.length <= 100,
    value: sanitized,
    error: sanitized.length < 2
      ? 'Locația trebuie să aibă minim 2 caractere'
      : sanitized.length > 100
      ? 'Locația trebuie să aibă maxim 100 caractere'
      : !hasLetter
      ? 'Locația trebuie să conțină cel puțin o literă'
      : /[0-9]/.test(sanitized)
      ? 'Locația poate conține doar litere, spații, cratime, virgule și puncte'
      : !locationRegex.test(sanitized)
      ? 'Locația conține caractere nepermise'
      : ''
  }
}

// Validare dată
export const validateDate = (date) => {
  if (!date) {
    return {
      isValid: false,
      value: '',
      error: 'Data este obligatorie'
    }
  }
  
  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Data trebuie să fie în viitor
  if (selectedDate < today) {
    return {
      isValid: false,
      value: date,
      error: 'Data trebuie să fie în viitor'
    }
  }
  
  // Data nu trebuie să fie mai departe de 1 an
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  
  if (selectedDate > maxDate) {
    return {
      isValid: false,
      value: date,
      error: 'Data nu poate fi mai departe de 1 an'
    }
  }
  
  return {
    isValid: true,
    value: date,
    error: ''
  }
}

// Validare număr (pasageri/colete)
export const validateNumber = (value, min = 0, max = 100) => {
  const num = parseInt(value) || 0
  
  return {
    isValid: num >= min && num <= max,
    value: num.toString(),
    error: num < min
      ? `Valoarea trebuie să fie minim ${min}`
      : num > max
      ? `Valoarea trebuie să fie maxim ${max}`
      : ''
  }
}

// Rate limiting - verifică dacă s-au făcut prea multe încercări
export const checkRateLimit = () => {
  const key = 'form_submission_attempts'
  const maxAttempts = 5
  const timeWindow = 15 * 60 * 1000 // 15 minute
  
  const attempts = JSON.parse(localStorage.getItem(key) || '[]')
  const now = Date.now()
  
  // Elimină încercările vechi
  const recentAttempts = attempts.filter(time => now - time < timeWindow)
  
  if (recentAttempts.length >= maxAttempts) {
    return {
      allowed: false,
      message: 'Prea multe încercări. Vă rugăm să încercați din nou peste 15 minute.'
    }
  }
  
  // Adaugă încercarea curentă
  recentAttempts.push(now)
  localStorage.setItem(key, JSON.stringify(recentAttempts))
  
  return {
    allowed: true,
    message: ''
  }
}

// Honeypot field - câmp ascuns pentru anti-bot
export const checkHoneypot = (honeypotValue) => {
  // Dacă honeypot field este completat, este probabil un bot
  return honeypotValue === '' || honeypotValue === null || honeypotValue === undefined
}

