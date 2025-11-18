import React from 'react'
import { FiShield, FiAlertTriangle, FiClipboard, FiPackage, FiCheckCircle } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'

const iconSet = [FiClipboard, FiAlertTriangle, FiShield, FiPackage, FiCheckCircle]

const Termeni = () => {
  const { t } = useLanguage()
  const sectionsRaw = t('terms.sections')
  const sections = Array.isArray(sectionsRaw) ? sectionsRaw : []

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-4 pb-16 text-center text-white lg:px-6">
          <p className="section-kicker text-secondary-200">{t('terms.subtitle')}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('terms.title')}</h1>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = iconSet[index] || FiShield
              return (
                <div key={section.title} className="content-card flex gap-4 border border-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-100 text-secondary-600">
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

export default Termeni

