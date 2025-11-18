import React, { useState } from 'react'
import { FiChevronDown, FiMessageSquare } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import LocalizedLink from '../components/LocalizedLink'

const FAQ = () => {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const faqRaw = t('faq.items')
  const faqs = Array.isArray(faqRaw) ? faqRaw : []

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />
        <div className="mx-auto max-w-4xl px-4 pb-16 text-center text-white lg:px-6">
          <p className="section-kicker text-secondary-200">{t('faq.subtitle')}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('faq.title')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">{t('faq.contactPrompt')}</p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div key={item.question} className="content-card border border-white">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div>
                    <p className="text-base font-semibold text-primary-900">{item.question}</p>
                  </div>
                  <FiChevronDown
                    className={`text-2xl text-secondary-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-4 text-sm text-slate-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[32px] border border-slate-100 bg-white p-8 text-center shadow-2xl shadow-primary-900/5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-500">
              {t('faq.contactPrompt')}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-primary-900">{t('contact.title')}</h3>
            <p className="mt-2 text-sm text-slate-500">{t('contact.cta.desc')}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <LocalizedLink href="/contacte" className="btn-primary text-sm">
                <FiMessageSquare />
                {t('faq.contactCta')}
              </LocalizedLink>
              <LocalizedLink href="/rezervari" className="btn-secondary text-sm">
                {t('reservations.title')}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ

