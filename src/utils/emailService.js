// Serviciu pentru trimiterea email-urilor

const EMAIL_TO = 'ruslaneuropabus@gmail.com'

// Formatează mesajul pentru rezervare
export const formatReservationEmail = (formData) => {
  const subject = encodeURIComponent(`[EuropaBus] Rezervare Nouă - ${formData.from} → ${formData.to}`)
  
  const body = encodeURIComponent(`NOUĂ REZERVARE - EURO PABUS
=====================================

DATE CLIENT:
------------
Nume complet: ${formData.name}
Telefon: ${formData.phone}
Email: ${formData.email}

DETALII CĂLĂTORIE:
------------------
Punct de plecare: ${formData.from}
Destinație: ${formData.to}
Data călătoriei: ${formData.date}

SERVICII SOLICITATE:
--------------------
${formData.passengers && parseInt(formData.passengers) > 0 
  ? `✓ Pasageri: ${formData.passengers} persoană(e)` 
  : '✗ Pasageri: Nu'}
${formData.packages && parseInt(formData.packages) > 0 
  ? `✓ Colete: ${formData.packages} colet(e)` 
  : '✗ Colete: Nu'}

${formData.message ? `MESAJ ADIȚIONAL:
------------------
${formData.message}` : ''}

=====================================
Data trimiterii: ${new Date().toLocaleString('ro-RO')}
IP: ${window.location.hostname}
`)

  return {
    to: EMAIL_TO,
    subject: decodeURIComponent(subject),
    body: decodeURIComponent(body),
    mailtoLink: `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`
  }
}

// Formatează mesajul pentru contact
export const formatContactEmail = (formData) => {
  const subject = encodeURIComponent(`[EuropaBus] Contact: ${formData.subject}`)
  
  const body = encodeURIComponent(`MESAJ DE CONTACT - EURO PABUS
=====================================

DATE EXPEDITOR:
---------------
Nume: ${formData.name}
Email: ${formData.email}

SUBIECT:
--------
${formData.subject}

MESAJ:
------
${formData.message}

=====================================
Data trimiterii: ${new Date().toLocaleString('ro-RO')}
IP: ${window.location.hostname}
`)

  return {
    to: EMAIL_TO,
    subject: decodeURIComponent(subject),
    body: decodeURIComponent(body),
    mailtoLink: `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`
  }
}

// Trimite email prin mailto (deschide clientul de email)
export const sendEmailViaMailto = (emailData) => {
  window.location.href = emailData.mailtoLink
}

// Alternativ: trimite prin API (dacă ai backend)
export const sendEmailViaAPI = async (emailData, formType = 'reservation') => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        type: formType
      })
    })
    
    if (!response.ok) {
      throw new Error('Eroare la trimiterea email-ului')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Eroare API email:', error)
    // Fallback la mailto dacă API-ul eșuează
    sendEmailViaMailto(emailData)
    throw error
  }
}

