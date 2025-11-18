import React from 'react'
import {
  FiShield,
  FiPackage,
  FiClock,
  FiHeadphones,
  FiPhoneCall,
  FiNavigation,
  FiMapPin,
  FiUsers,
  FiBriefcase
} from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import LocalizedLink from '../components/LocalizedLink'

const Home = () => {
  const { t } = useLanguage()

  const heroHighlights = [
    { icon: FiShield, title: t('hero.highlights.safety.title'), desc: t('hero.highlights.safety.desc') },
    { icon: FiPackage, title: t('hero.highlights.parcels.title'), desc: t('hero.highlights.parcels.desc') },
    { icon: FiClock, title: t('hero.highlights.schedule.title'), desc: t('hero.highlights.schedule.desc') },
    { icon: FiHeadphones, title: t('hero.highlights.support.title'), desc: t('hero.highlights.support.desc') }
  ]

  const features = [
    { icon: FiClock, title: t('features.1.title'), desc: t('features.1.desc') },
    { icon: FiPackage, title: t('features.2.title'), desc: t('features.2.desc') },
    { icon: FiShield, title: t('features.3.title'), desc: t('features.3.desc') },
    { icon: FiHeadphones, title: t('features.4.title'), desc: t('features.4.desc') }
  ]

  const services = [
    { icon: FiUsers, title: t('services.passengers.title'), desc: t('services.passengers.desc'), badge: t('services.passengers.badge') },
    { icon: FiPackage, title: t('services.parcels.title'), desc: t('services.parcels.desc'), badge: t('services.parcels.badge') },
    { icon: FiMapPin, title: t('services.door.title'), desc: t('services.door.desc'), badge: t('services.door.badge') },
    { icon: FiBriefcase, title: t('services.corporate.title'), desc: t('services.corporate.desc'), badge: t('services.corporate.badge') }
  ]

  const destinations = [
    {
      key: 'germany',
      flag: '🇩🇪',
      route: 'Chișinău — Berlin',
      desc: t('destinations.germany.desc'),
      routes: t('destinations.germany.routes')
    },
    {
      key: 'belgium',
      flag: '🇧🇪',
      route: 'Chișinău — Bruxelles',
      desc: t('destinations.belgium.desc'),
      routes: t('destinations.belgium.routes')
    },
    {
      key: 'netherlands',
      flag: '🇳🇱',
      route: 'Chișinău — Amsterdam',
      desc: t('destinations.netherlands.desc'),
      routes: t('destinations.netherlands.routes')
    }
  ]

  const journeySteps = [
    { step: '01', title: t('journey.steps.plan.title'), desc: t('journey.steps.plan.desc') },
    { step: '02', title: t('journey.steps.prepare.title'), desc: t('journey.steps.prepare.desc') },
    { step: '03', title: t('journey.steps.travel.title'), desc: t('journey.steps.travel.desc') }
  ]

  const heroStats = [
    { label: t('hero.metrics.years.label'), value: t('hero.metrics.years.value') },
    { label: t('hero.metrics.clients.label'), value: t('hero.metrics.clients.value') },
    { label: t('hero.metrics.cities.label'), value: t('hero.metrics.cities.value') }
  ]

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
        <div className="absolute -top-16 right-10 h-52 w-52 rounded-full bg-secondary-200/50 blur-3xl" />
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-10 lg:flex-row lg:items-center lg:px-6">
          <div className="space-y-6 lg:w-1/2">
            <span className="section-kicker">{t('hero.badge')}</span>
            <h1 className="text-4xl font-bold text-primary-950 md:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="text-xl font-semibold text-primary-600">{t('hero.subtitle')}</p>
            <p className="text-base text-slate-600">{t('hero.description')}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LocalizedLink href="/rezervari" className="btn-primary w-full sm:w-auto">
                {t('hero.btnReserve')}
              </LocalizedLink>
              <LocalizedLink href="/rute" className="btn-secondary w-full sm:w-auto">
                {t('hero.btnRoutes')}
              </LocalizedLink>
            </div>
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <FiPhoneCall className="text-secondary-500" />
              {t('hero.support')}
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white/90 px-4 py-5 text-center shadow-sm"
                >
                  <p className="text-3xl font-semibold text-primary-900">{stat.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="glass-card relative overflow-hidden">
              <div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-secondary-400/20 blur-3xl" />
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-600">
                {t('hero.panelTitle')}
              </p>
              <div className="mt-6 grid gap-4">
                {heroHighlights.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/30 bg-white/40 p-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-primary-900">{title}</p>
                      <p className="text-sm text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-dashed border-primary-100 bg-primary-50/70 p-5 text-sm text-primary-900">
                <p className="font-semibold uppercase tracking-[0.3em] text-secondary-600">
                  {t('hero.routesTitle')}
                </p>
                <p className="mt-2 flex items-center gap-2 text-base font-semibold">
                  <FiMapPin /> Chișinău · Bălți · Iași → Germania · Belgia · Olanda
                </p>
                <p className="text-sm text-primary-700">{t('hero.routesDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">{t('features.title')}</p>
            <h2 className="section-title">{t('features.subtitle')}</h2>
            <p className="text-base text-slate-500">{t('features.description')}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="content-card flex flex-col gap-4 border border-slate-100 bg-slate-50/40 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-100 text-secondary-600">
                  <Icon size={24} />
                </span>
                <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <p className="section-kicker">{t('services.kicker')}</p>
              <h2 className="section-title text-left">{t('services.title')}</h2>
              <p className="text-base text-slate-600">{t('services.subtitle')}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-500 shadow-lg">
              {t('services.note')}
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map(({ icon: Icon, title, desc, badge }) => (
              <div key={title} className="content-card flex flex-col gap-4 border border-white shadow-xl shadow-primary-900/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
                  </div>
                  <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-700">
                    {badge}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-5">
              <p className="section-kicker text-secondary-200">{t('destinations.title')}</p>
              <h2 className="section-title text-white">{t('destinations.subtitle')}</h2>
              <p className="text-base text-white/70">{t('destinations.description')}</p>
              <LocalizedLink href="/rute" className="btn-outline w-fit border-white text-white">
                {t('hero.btnRoutes')}
              </LocalizedLink>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {destinations.map(({ key, flag, route, desc, routes }) => (
                <div key={key} className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/20 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{flag}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                      {t(`destinations.${key}.name`)}
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-semibold">{route}</p>
                  <p className="text-sm text-white/80">{desc}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-secondary-200">
                    {t('destinations.routesTitle')}
                  </p>
                  <p className="text-sm text-white">{routes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center lg:px-6">
          <p className="section-kicker">{t('journey.title')}</p>
          <h2 className="section-title">{t('journey.subtitle')}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journeySteps.map(({ step, title, desc }) => (
              <div key={title} className="content-card border border-slate-100">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-600">
                  {step}
                </p>
                <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-100 bg-white/80 px-6 py-10 text-center shadow-2xl shadow-primary-900/5 sm:px-12">
          <p className="section-kicker">{t('cta.title')}</p>
          <h2 className="mb-4 text-3xl font-semibold text-primary-950">{t('cta.desc')}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-sm text-slate-600">{t('cta.details')}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <LocalizedLink href="/rezervari" className="btn-primary w-full sm:w-auto">
              {t('cta.reserve')}
              </LocalizedLink>
              <LocalizedLink href="/contacte" className="btn-secondary w-full sm:w-auto">
              {t('cta.contact')}
              </LocalizedLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

