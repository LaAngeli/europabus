import React from 'react'
import {
  FiShield,
  FiUsers,
  FiClock,
  FiCompass,
  FiTrendingUp,
  FiAward
} from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'

const DespreNoi = () => {
  const { t } = useLanguage()

  const valuesRaw = t('about.values')
  const values = Array.isArray(valuesRaw) ? valuesRaw : []
  const timelineRaw = t('about.timeline')
  const timeline = Array.isArray(timelineRaw) ? timelineRaw : []
  const metricsRaw = t('about.metrics')
  const metrics = Array.isArray(metricsRaw) ? metricsRaw : []

  const valueIcons = [FiShield, FiUsers, FiClock, FiCompass]

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]" />
        <div className="mx-auto max-w-5xl px-4 pb-16 text-center text-white lg:px-6">
          <p className="section-kicker text-secondary-200">{t('about.subtitle')}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('about.title')}</h1>
          <p className="mt-4 text-base text-white/80">{t('about.story')}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="content-card border border-slate-100">
              <p className="section-kicker text-left">{t('about.title')}</p>
              <h2 className="text-3xl font-semibold text-primary-900">{t('about.subtitle')}</h2>
              <p className="mt-4 text-sm text-slate-600">{t('about.mission')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-center">
                  <p className="text-3xl font-semibold text-primary-900">{metric.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <p className="section-kicker">{t('features.title')}</p>
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((value, index) => {
              const Icon = valueIcons[index] || FiAward
              return (
                <div key={value.title} className="content-card flex gap-4 border border-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-100 text-secondary-600">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-primary-900">{value.title}</p>
                    <p className="text-sm text-slate-500">{value.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <p className="section-kicker">{t('gallery.title')}</p>
          <h2 className="section-title">{t('routes.title')}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {timeline.map((item) => (
              <div key={item.year} className="content-card border border-slate-100">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-500">
                  {item.year}
                </p>
                <h3 className="text-lg font-semibold text-primary-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default DespreNoi

