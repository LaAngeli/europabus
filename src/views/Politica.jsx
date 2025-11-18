import React from 'react'
import { FiShield, FiDatabase, FiLock, FiShare2, FiUserCheck } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'

const icons = [FiDatabase, FiShield, FiLock, FiShare2, FiUserCheck]

const Politica = () => {
  const { t } = useLanguage()
  const sectionsRaw = t('privacy.sections')
  const sections = Array.isArray(sectionsRaw) ? sectionsRaw : []

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
        <div className="mx-auto max-w-5xl px-4 pb-16 text-center text-white lg:px-6">
          <p className="section-kicker text-secondary-200">{t('privacy.subtitle')}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('privacy.title')}</h1>
          <p className="mt-3 text-sm text-white/80">{t('privacy.note')}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = icons[index] || FiShield
              return (
                <div key={section.title} className="content-card flex gap-4 border border-slate-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-primary-900">{section.title}</p>
                    <p className="text-sm text-slate-600">{section.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Politica

