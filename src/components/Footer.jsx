import React from 'react'
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTelegramPlane, FaViber } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import LocalizedLink from './LocalizedLink'

const Footer = () => {
  const { t } = useLanguage()

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://www.facebook.com/transgerm.arv', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/_transport_germania_?igsh=djlsZng3ZHZmdmlm', label: 'Instagram' },
    { icon: FaViber, href: 'viber://chat?number=37369876660', label: 'Viber' },
    { icon: FaWhatsapp, href: 'https://api.whatsapp.com/send/?phone=%2B37369876660&text&type=phone_number&app_absent=0', label: 'WhatsApp' },
    { icon: FaTelegramPlane, href: 'https://telegram.me/RUSLANEUROPABUS', label: 'Telegram' }
  ]

  const primaryLinks = [
    { path: '/rute', label: t('footer.routes') },
    { path: '/rezervari', label: t('footer.reservations') },
    { path: '/galerie', label: t('footer.gallery') }
  ]

  const infoLinks = [
    { path: '/faq', label: t('footer.faq') },
    { path: '/termeni', label: t('footer.terms') },
    { path: '/politica', label: t('footer.privacy') }
  ]

  const contactDetails = [
    {
      icon: FiPhoneCall,
      label: '+373 (69) 876 660',
      href: 'tel:+37369876660'
    },
    {
      icon: FiMail,
      label: 'contact@europabus.md',
      href: 'mailto:contact@europabus.md'
    },
    {
      icon: FiMapPin,
      label: 'Chișinău, str. Arborilor 21',
      href: 'https://www.google.com/maps/search/?api=1&query=Chisinau+str+Arborilor+21'
    }
  ]

  return (
    <footer className="mt-16 bg-primary-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-5">
            <LocalizedLink href="/" className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <img src="/img/logo/tab-logo-notext.svg" alt="EuropaBus" className="h-10 w-auto" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-secondary-300">EuropaBus</p>
                <p className="text-lg font-semibold text-white">{t('footer.about')}</p>
              </div>
            </LocalizedLink>
            <p className="text-sm leading-relaxed text-white/70">{t('footer.aboutDesc')}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-200">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-lg text-white transition-all duration-300 hover:-translate-y-1 hover:bg-secondary-500"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-200">
                {t('footer.services')}
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {primaryLinks.map(({ path, label }) => (
                  <li key={path}>
                    <LocalizedLink href={path} className="transition-colors hover:text-white">
                      {label}
                    </LocalizedLink>
                  </li>
                ))}
                <li>
                  <LocalizedLink href="/despre-noi" className="transition-colors hover:text-white">
                    {t('footer.learnMore')}
                  </LocalizedLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-200">
                {t('footer.info')}
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {infoLinks.map(({ path, label }) => (
                  <li key={path}>
                    <LocalizedLink href={path} className="transition-colors hover:text-white">
                      {label}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-200">
              {t('footer.contact')}
            </h4>
            <ul className="mt-4 space-y-4 text-sm text-white/80">
              {contactDetails.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-base">
                      <Icon />
                    </span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/60">{t('footer.schedule')}</p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl">{t('footer.ctaTitle')}</p>
            <div className="flex flex-wrap gap-3">
              <LocalizedLink href="/rezervari" className="btn-outline border-white/40 bg-white/10">
                {t('footer.ctaPrimary')}
              </LocalizedLink>
              <a href="tel:+37369876660" className="btn-primary bg-secondary-500 text-sm">
                {t('footer.ctaPhone')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          <p>&copy; 2025 EuropaBus. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

