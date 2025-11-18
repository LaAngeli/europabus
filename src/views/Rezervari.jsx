import React, { useState } from 'react'
import {
  FiCheckCircle,
  FiPackage,
  FiHeadphones,
  FiPhoneCall,
  FiMessageSquare,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiEdit3
} from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import LocalizedLink from '../components/LocalizedLink'
import SecureForm from '../components/SecureForm'
import {
  validateName,
  validatePhone,
  validateEmail,
  validateLocation,
  validateDate,
  validateNumber,
  validateMessage
} from '../utils/validation'
import { formatReservationEmail, sendEmailViaMailto } from '../utils/emailService'

const Rezervari = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    from: '',
    to: '',
    date: '',
    passengers: '',
    packages: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState(null)

  const highlightsRaw = t('reservations.highlights')
  const highlights = Array.isArray(highlightsRaw) ? highlightsRaw : []
  const stepsRaw = t('reservations.steps')
  const steps = Array.isArray(stepsRaw) ? stepsRaw : []
  const supportData = t('reservations.support')

  const highlightIcons = [FiCheckCircle, FiPackage, FiHeadphones]
  const stepIcons = [FiEdit3, FiMapPin, FiCalendar]

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
      case 'phone':
        validation = validatePhone(value)
        break
      case 'email':
        validation = validateEmail(value)
        break
      case 'from':
      case 'to':
        validation = validateLocation(value)
        break
      case 'date':
        validation = validateDate(value)
        break
      case 'passengers':
        validation = validateNumber(value, 1, 50)
        break
      case 'packages':
        validation = validateNumber(value, 0, 100)
        break
      case 'message':
        if (value) {
          validation = validateMessage(value)
        }
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

    const phoneValidation = validatePhone(formData.phone)
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error
      isValid = false
    }

    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error
      isValid = false
    }

    const fromValidation = validateLocation(formData.from)
    if (!fromValidation.isValid) {
      newErrors.from = fromValidation.error
      isValid = false
    }

    const toValidation = validateLocation(formData.to)
    if (!toValidation.isValid) {
      newErrors.to = toValidation.error
      isValid = false
    }

    const dateValidation = validateDate(formData.date)
    if (!dateValidation.isValid) {
      newErrors.date = dateValidation.error
      isValid = false
    }

    const hasPassengers = formData.passengers && parseInt(formData.passengers) > 0
    const hasPackages = formData.packages && parseInt(formData.packages) > 0

    if (!hasPassengers && !hasPackages) {
      const requirementMessage = t('reservations.form.requireOne')
      newErrors.passengers = requirementMessage
      newErrors.packages = requirementMessage
      isValid = false
    }

    if (formData.passengers) {
      const passengersValidation = validateNumber(formData.passengers, 1, 50)
      if (!passengersValidation.isValid) {
        newErrors.passengers = passengersValidation.error
        isValid = false
      }
    }

    if (formData.packages) {
      const packagesValidation = validateNumber(formData.packages, 0, 100)
      if (!packagesValidation.isValid) {
        newErrors.packages = packagesValidation.error
        isValid = false
      }
    }

    if (formData.message) {
      const messageValidation = validateMessage(formData.message)
      if (!messageValidation.isValid) {
        newErrors.message = messageValidation.error
        isValid = false
      }
    }

    setErrors(newErrors)
    setTouched({
      name: true,
      phone: true,
      email: true,
      from: true,
      to: true,
      date: true,
      passengers: true,
      packages: true,
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
      const emailData = formatReservationEmail(formData)
      sendEmailViaMailto(emailData)

      setStatus('success')
      setTimeout(() => {
        setStatus(null)
        setFormData({
          name: '',
          phone: '',
          email: '',
          from: '',
          to: '',
          date: '',
          passengers: '',
          packages: '',
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]" />
        <div className="mx-auto max-w-5xl px-4 pb-16 text-center text-white lg:px-6">
          <p className="section-kicker text-secondary-200">{t('reservations.intro.kicker')}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('reservations.title')}</h1>
          <p className="mt-3 text-xl text-white/80">{t('reservations.subtitle')}</p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-white/70">
            {t('reservations.intro.description')}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="tel:+37369876660" className="btn-primary text-sm">
              <FiPhoneCall />
              {supportData?.phone}
            </a>
            <LocalizedLink href="/contacte" className="btn-outline text-sm">
              <FiMessageSquare />
              {t('contact.title')}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <div className="content-card border border-white">
                <p className="section-kicker text-left">{t('reservations.intro.kicker')}</p>
                <h3 className="text-2xl font-semibold text-primary-900">{t('reservations.subtitle')}</h3>
                <div className="mt-6 space-y-4">
                  {highlights.map((item, index) => {
                    const Icon = highlightIcons[index] || FiCheckCircle
                    return (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-secondary-500">
                          <Icon />
                        </span>
                        <div>
                          <p className="text-base font-semibold text-primary-900">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="content-card border border-white">
                <p className="section-kicker text-left">{t('journey.title')}</p>
                <h3 className="text-2xl font-semibold text-primary-900">{t('reservations.title')}</h3>
                <div className="mt-6 space-y-4">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[index] || FiEdit3
                    return (
                      <div key={step.title} className="flex gap-3">
                        <span className="rounded-2xl bg-secondary-100 p-3 text-secondary-600">
                          <Icon />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-primary-900">{step.title}</p>
                          <p className="text-sm text-slate-500">{step.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="content-card bg-primary-900 text-white">
                <p className="section-kicker text-left text-secondary-200">{supportData?.title}</p>
                <h3 className="text-2xl font-semibold">{supportData?.phone}</h3>
                <p className="mt-2 text-sm text-white/80">{supportData?.desc}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="tel:+37369876660" className="btn-primary bg-secondary-500 text-sm">
                    <FiPhoneCall /> Call
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=%2B37369876660&text"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline border-white text-sm"
                  >
                    <FiMessageSquare /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <SecureForm onSubmit={handleSubmit} className="glass-card space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-primary-900">
                    {t('reservations.form.name')} *
                  </label>
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
                  <label className="text-sm font-semibold text-primary-900">
                    {t('reservations.form.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="+373 69 876 660"
                    className={inputClasses(!!errors.phone)}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-primary-900">
                  {t('reservations.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="contact@europabus.md"
                  className={inputClasses(!!errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-primary-900">
                    {t('reservations.form.from')} *
                  </label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Chișinău"
                    className={inputClasses(!!errors.from)}
                  />
                  {errors.from && <p className="mt-1 text-xs text-red-600">{errors.from}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary-900">
                    {t('reservations.form.to')} *
                  </label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Berlin"
                    className={inputClasses(!!errors.to)}
                  />
                  {errors.to && <p className="mt-1 text-xs text-red-600">{errors.to}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-primary-900">
                  {t('reservations.form.date')} *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className={inputClasses(!!errors.date)}
                />
                {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white/60 p-4">
                <p className="text-sm font-semibold text-primary-900">
                  {t('reservations.form.passengers')} / {t('reservations.form.packages')}
                </p>
                <p className="text-xs text-slate-500">{t('reservations.form.requireOne')}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-primary-700">
                      <FiUsers className="mr-1 inline-block" />
                      {t('reservations.form.passengers')}
                    </label>
                    <input
                      type="number"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min="1"
                      max="50"
                      placeholder="2"
                      className={inputClasses(!!errors.passengers)}
                    />
                    {errors.passengers && (
                      <p className="mt-1 text-xs text-red-600">{errors.passengers}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-primary-700">
                      <FiPackage className="mr-1 inline-block" />
                      {t('reservations.form.packages')}
                    </label>
                    <input
                      type="number"
                      name="packages"
                      value={formData.packages}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min="0"
                      max="100"
                      placeholder="5"
                      className={inputClasses(!!errors.packages)}
                    />
                    {errors.packages && (
                      <p className="mt-1 text-xs text-red-600">{errors.packages}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-primary-900">
                  {t('reservations.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="4"
                  maxLength="1000"
                  className={`${inputClasses(!!errors.message)} resize-y`}
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                {formData.message && !errors.message && (
                  <p className="mt-1 text-xs text-slate-500">{formData.message.length}/1000</p>
                )}
              </div>

              {status === 'success' && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  {t('reservations.form.success')}
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {t('reservations.form.error')}
                </div>
              )}

              <button type="submit" className="btn-primary w-full text-sm">
                {t('reservations.form.submit')}
              </button>
            </SecureForm>
          </div>
        </div>
      </section>
    </>
  )
}

export default Rezervari

