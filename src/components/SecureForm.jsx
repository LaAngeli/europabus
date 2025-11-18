import React, { useState, useEffect } from 'react'
import { checkRateLimit, checkHoneypot } from '../utils/validation'

// Componentă pentru protecție anti-bot și rate limiting
const SecureForm = ({ children, onSubmit, className = '' }) => {
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rateLimitError, setRateLimitError] = useState('')

  // Reset honeypot la fiecare render
  useEffect(() => {
    setHoneypot('')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Verifică honeypot
    if (!checkHoneypot(honeypot)) {
      // Bot detectat - nu face nimic, dar simulează succes
      console.warn('Bot detected')
      return
    }

    // Verifică rate limiting
    const rateLimit = checkRateLimit()
    if (!rateLimit.allowed) {
      setRateLimitError(rateLimit.message)
      return
    }

    setIsSubmitting(true)
    setRateLimitError('')

    try {
      await onSubmit(e)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Honeypot field - ascuns pentru utilizatori, vizibil pentru boti */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <label htmlFor="website-url">Website URL (nu completați)</label>
        <input
          type="text"
          id="website-url"
          name="website-url"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {rateLimitError && (
        <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-lg">
          {rateLimitError}
        </div>
      )}

      {children}

      {/* Butonul de submit este gestionat de componenta părinte */}
    </form>
  )
}

export default SecureForm

