import React, { useState } from 'react'
import {
  FiPhoneCall,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiClock
} from 'react-icons/fi'
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaViber
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import SecureForm from '../components/SecureForm'
import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage
} from '../utils/validation'
import { formatContactEmail, sendEmailViaMailto } from '../utils/emailService'

const Contacte = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState(null)

  const infoCards = [
    {
      icon: FiPhoneCall,
      label: t('contact.cards.phone'),
      value: '+373 69 876 660',
      link: 'tel:+37369876660'
    },
    {
      icon: FiMail,
      label: t('contact.cards.email'),
      value: 'contact@europabus.md',
      link: 'mailto:contact@europabus.md'
    },
    {
      icon: FiMapPin,
      label: t('contact.cards.hq'),
      value: 'Chișinău, str. Arborilor 21',
      link: 'https://www.google.com/maps/search/?api=1&query=Chisinau+str+Arborilor+21'
    },
    {
      icon: FiClock,
      label: t('contact.cards.hours'),
      value: `${t('contact.hours.week')} · ${t('contact.hours.support')}`,
      link: null
    }
  ]

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://www.facebook.com/transgerm.arv', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/_transport_germania_?igsh=djlsZng3ZHZmdmlm', label: 'Instagram' },
    { icon: FaViber, href: 'viber://chat?number=37369876660', label: 'Viber' },
    { icon: FaWhatsapp, href: 'https://api.whatsapp.com/send/?phone=%2B37369876660&text', label: 'WhatsApp' },
    { icon: FaTelegramPlane, href: 'https://telegram.me/RUSLANEUROPABUS', label: 'Telegram' }
  ]

  const inputClasses = (hasError) =>
    `w-full rounded-2xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
      hasError
        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200'
        : 'border-slate-200 bg-white focus:border-secondary-500 focus:ring-secondary-500/20'
    }`

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })
    validateField(name, value)
  }

  const validateField = (name, value) => {
    let validation = { isValid: true, value, error: '' }

    switch (name) {
      case 'name':
        validation = validateName(value)
        break
      case 'email':
        validation = validateEmail(value)
        break
      case 'subject':
        validation = validateSubject(value)
        break
      case 'message':
        validation = validateMessage(value)
        break
      default:
        break
    }

    setErrors({
      ...errors,
      [name]: validation.isValid ? '' : validation.error
    })

    setFormData({
      ...formData,
      [name]: validation.value
    })

    return validation.isValid
  }

  const validateAll = () => {
    const newErrors = {}
    let isValid = true

    const nameValidation = validateName(formData.name)
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error
      isValid = false
    }

    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error
      isValid = false
    }

    const subjectValidation = validateSubject(formData.subject)
    if (!subjectValidation.isValid) {
      newErrors.subject = subjectValidation.error
      isValid = false
    }

    const messageValidation = validateMessage(formData.message)
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error
      isValid = false
    }

    setErrors(newErrors)
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    })

    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateAll()) {
      setStatus('error')
      return
    }

    try {
      const emailData = formatContactEmail(formData)
      sendEmailViaMailto(emailData)

      setStatus('success')
      setTimeout(() => {
        setStatus(null)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setErrors({})
        setTouched({})
      }, 5000)
    } catch (error) {
      console.error('Eroare la trimiterea email-ului:', error)
      setStatus('error')
    }
  }

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-4 pb-16 text-center text-white lg:px-6">
          <p className="section-kicker text-secondary-200">{t('contact.contactInfo')}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('contact.title')}</h1>
          <p className="mt-3 text-xl text-white/80">{t('contact.subtitle')}</p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-white/70">{t('contact.cta.desc')}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="https://api.whatsapp.com/send/?phone=%2B37369876660&text" target="_blank" rel="noreferrer" className="btn-primary text-sm">
              <FiMessageSquare />
              {t('contact.cta.primary')}
            </a>
            <a href="/rezervari" className="btn-outline text-sm">
              {t('contact.cta.secondary')}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16" id="form">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <div className="grid gap-4">
                {infoCards.map(({ icon: Icon, label, value, link }) => (
                  <a
                    key={label}
                    href={link || undefined}
                    target={link?.startsWith('http') ? '_blank' : undefined}
                    rel={link?.startsWith('http') ? 'noreferrer' : undefined}
                    className="content-card flex items-center gap-4 border border-white transition hover:shadow-xl"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-100 text-secondary-600">
                      <Icon />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
                        {label}
                      </p>
                      <p className="text-base font-semibold text-primary-900">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="content-card border border-white">
                <p className="section-kicker text-left">{t('contact.socialMedia')}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 text-primary-700 transition hover:-translate-y-1 hover:border-secondary-500 hover:text-secondary-600"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              <div className="content-card border border-white p-0 overflow-hidden">
                <div className="p-6">
                  <p className="section-kicker text-left">{t('contact.mapTitle')}</p>
                  <p className="text-sm text-slate-500">{t('contact.mapDesc')}</p>
                </div>
                <div className="h-64 w-full">
                  <iframe
                    title="EuropaBus HQ"
                    loading="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.512087995852!2d28.827744077698963!3d47.00726593201418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d5c9f438177%3A0x7d482ca392f74538!2sStrada%20Arborilor%2021%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2sro!4v1700000000000"
                    className="h-full w-full border-0"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <SecureForm onSubmit={handleSubmit} className="glass-card space-y-5">
              <div>
                <label className="text-sm font-semibold text-primary-900">{t('contact.form.name')} *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={inputClasses(!!errors.name)}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-primary-900">{t('contact.form.email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={inputClasses(!!errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-primary-900">{t('contact.form.subject')} *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  maxLength="100"
                  className={inputClasses(!!errors.subject)}
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
                {formData.subject && !errors.subject && (
                  <p className="mt-1 text-xs text-slate-500">{formData.subject.length}/100</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-primary-900">{t('contact.form.message')} *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="5"
                  maxLength="1000"
                  required
                  className={`${inputClasses(!!errors.message)} resize-y`}
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                {formData.message && !errors.message && (
                  <p className="mt-1 text-xs text-slate-500">{formData.message.length}/1000</p>
                )}
              </div>

              {status === 'success' && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  {t('contact.form.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {t('contact.form.error')}
                </div>
              )}

              <button type="submit" className="btn-primary w-full text-sm">
                {t('contact.form.submit')}
              </button>
            </SecureForm>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contacte

