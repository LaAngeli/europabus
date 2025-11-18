import React from 'react'
import {
  FiMapPin,
  FiClock,
  FiPackage,
  FiNavigation,
  FiArrowRightCircle,
  FiPhoneCall
} from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import LocalizedLink from '../components/LocalizedLink'

const Rute = () => {
  const { t } = useLanguage()

  const metaRaw = t('routes.meta')
  const metaHighlights = Array.isArray(metaRaw) ? metaRaw : []

  const timelineRaw = t('routes.timeline')
  const timelineSteps = timelineRaw && Array.isArray(timelineRaw.steps) ? timelineRaw.steps : []

  const pickupRaw = t('routes.pickup')
  const pickupPoints = pickupRaw && Array.isArray(pickupRaw.points) ? pickupRaw.points : []

  const countryFlags = {
    germany: '🇩🇪',
    belgium: '🇧🇪',
    netherlands: '🇳🇱'
  }

  const countries = ['germany', 'belgium', 'netherlands'].map((key) => {
    const data = t(`routes.countries.${key}`)
    return typeof data === 'object' && data !== null
      ? { key, flag: countryFlags[key], ...data }
      : { key, flag: countryFlags[key], name: key }
  })

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 text-white lg:px-6">
          <div className="space-y-6 text-center">
            <p className="section-kicker text-secondary-200">{t('routes.heroKicker')}</p>
            <h1 className="text-4xl font-bold md:text-5xl">{t('routes.title')}</h1>
            <p className="text-xl text-white/80">{t('routes.subtitle')}</p>
            <p className="mx-auto max-w-3xl text-base text-white/70">{t('routes.description')}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <LocalizedLink href="/rezervari" className="btn-primary bg-secondary-500 text-sm">
                {t('routes.cta.primary')}
              </LocalizedLink>
              <a
                href="tel:+37369876660"
                className="btn-outline border-white/40 text-sm"
              >
                {t('routes.cta.secondary')}
              </a>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              {t('routes.cta.note')}
            </p>
          </div>

          <div className="grid gap-4 rounded-[32px] border border-white/20 bg-white/10 p-6 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-3">
              {metaHighlights.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="rounded-3xl border border-white/20 bg-white/5 p-5 text-center"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-200">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="space-y-4 text-center">
            <p className="section-kicker">{t('routes.title')}</p>
            <h2 className="section-title">{t('routes.subtitle')}</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {countries.map((country) => (
              <div key={country.key} className="content-card flex flex-col gap-4 border border-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <p className="text-lg font-semibold text-primary-900">{country.name}</p>
                      <p className="text-sm text-slate-500">{country.desc}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-700">
                    {country.badge}
                  </span>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
                    {t('routes.routesTitle')}
                  </p>
                  <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                    {(country.cities || []).map((city) => (
                      <li key={city} className="flex items-center gap-2">
                        <FiMapPin className="text-secondary-500" />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="rounded-2xl bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-800">
                  {country.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="content-card border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-kicker text-left">{timelineRaw?.title}</p>
                  <h3 className="text-2xl font-semibold text-primary-900">{t('routes.timeline.title')}</h3>
                </div>
                <FiClock className="text-4xl text-secondary-500" />
              </div>
              <div className="mt-6 space-y-5">
                {timelineSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="text-3xl font-semibold text-secondary-300">{`0${index + 1}`}</div>
                    <div>
                      <p className="text-base font-semibold text-primary-900">{step.title}</p>
                      <p className="text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-card border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-kicker text-left">{pickupRaw?.title}</p>
                  <h3 className="text-2xl font-semibold text-primary-900">
                    {t('routes.pickup.title')}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{t('routes.pickup.desc')}</p>
                </div>
                <FiNavigation className="text-4xl text-secondary-500" />
              </div>
              <div className="mt-6 space-y-4">
                {pickupPoints.map((point) => (
                  <div key={point.city} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-base font-semibold text-primary-900">{point.city}</p>
                    <p className="text-sm text-slate-500">{point.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-2xl shadow-primary-900/5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="section-kicker text-left">{t('routes.cta.title')}</p>
              <h3 className="text-2xl font-semibold text-primary-900">{t('routes.cta.desc')}</h3>
              <p className="mt-2 text-sm text-slate-500">{t('routes.cta.note')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LocalizedLink href="/rezervari" className="btn-primary">
                <FiArrowRightCircle />
                {t('routes.cta.primary')}
              </LocalizedLink>
              <a href="tel:+37369876660" className="btn-secondary">
                <FiPhoneCall />
                {t('routes.cta.secondary')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Rute

