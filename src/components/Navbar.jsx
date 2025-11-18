import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { FiMenu, FiX, FiPhoneCall } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import LocalizedLink from './LocalizedLink'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, changeLanguage, t, getPath } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = useMemo(() => [
    { path: '/', label: t('nav.home') },
    { path: '/rute', label: t('nav.routes') },
    { path: '/rezervari', label: t('nav.reservations') },
    { path: '/contacte', label: t('nav.contact') }
  ], [t])

  const isActive = (path) => {
    const normalizedCurrent = (router.asPath.split('?')[0].replace(/\/$/, '') || '/') || '/'
    const target = getPath(path).replace(/\/$/, '') || '/'
    return normalizedCurrent === target
  }

  const renderLanguageButton = (lang, label) => (
    <button
      key={lang}
      onClick={() => {
        changeLanguage(lang)
        setIsMenuOpen(false)
      }}
      className={`rounded-xl px-3 py-1 text-sm font-semibold transition-all duration-200 ${
        language === lang
          ? 'bg-primary-600 text-white'
          : 'text-primary-600 hover:bg-primary-50'
      }`}
    >
      {label}
    </button>
  )

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/20 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <LocalizedLink href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <div className="flex items-center gap-2 rounded-2xl bg-primary-50/80 px-3 py-2">
            <img
              src="/img/logo/tab-logo-notext.svg"
              alt="EuropaBus Logo"
              className="h-8 w-auto drop-shadow-sm"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-400">
                EuropaBus
              </p>
              <p className="text-sm font-semibold text-primary-900">Moldova ↔ Europa</p>
            </div>
          </div>
        </LocalizedLink>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map(({ path, label }) => (
            <LocalizedLink
              key={path}
              href={path}
              className={`text-sm font-semibold transition-colors ${
                isActive(path)
                  ? 'text-secondary-600 underline decoration-2 underline-offset-8'
                  : 'text-slate-500 hover:text-primary-600'
              }`}
            >
              {label}
            </LocalizedLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="hidden lg:flex flex-col text-right text-xs font-semibold text-slate-500">
            <span className="uppercase tracking-[0.2em]">24/7</span>
            <a
              href="tel:+37369876660"
              className="flex items-center justify-end gap-2 text-base font-bold text-primary-900 hover:text-secondary-600"
            >
              <FiPhoneCall className="text-secondary-500" />
              +373 69 876 660
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            {['ro', 'ru'].map((lang) => renderLanguageButton(lang, lang.toUpperCase()))}
          </div>
          <LocalizedLink href="/rezervari" className="btn-primary text-sm">
            {t('hero.btnReserve')}
          </LocalizedLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:+37369876660"
            className="rounded-2xl bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700"
            aria-label="Call EuropaBus"
          >
            <FiPhoneCall />
          </a>
          <button
            className="rounded-2xl border border-slate-200 p-2 text-2xl text-primary-700"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden ${
          isMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden border-t border-slate-100 bg-white/90 backdrop-blur rounded-b-3xl shadow-xl transition-all duration-300`}
      >
        <div className="space-y-4 px-4 py-6">
          {navItems.map(({ path, label }) => (
            <LocalizedLink
              key={path}
              href={path}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                isActive(path) ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-primary-50'
              }`}
            >
              {label}
            </LocalizedLink>
          ))}
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            {['ro', 'ru'].map((lang) => (
              <div key={lang}>{renderLanguageButton(lang, lang.toUpperCase())}</div>
            ))}
          </div>
          <LocalizedLink
            href="/rezervari"
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary w-full text-center"
          >
            {t('hero.btnReserve')}
          </LocalizedLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

