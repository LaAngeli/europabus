import React from 'react'
import { FiCamera } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'

const galleryImages = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60'
]

const Galerie = () => {
  const { t } = useLanguage()
  const cardsRaw = t('gallery.cards')
  const cards = Array.isArray(cardsRaw) ? cardsRaw : []

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-600" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />
        <div className="mx-auto max-w-4xl px-4 pb-16 text-center text-white lg:px-6">
          <p className="section-kicker text-secondary-100">{t('gallery.subtitle')}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('gallery.title')}</h1>
          <p className="mt-4 text-sm text-white/80">{t('gallery.description')}</p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-[28px] border border-white bg-white shadow-lg shadow-primary-900/5"
              >
                <img
                  src={galleryImages[index % galleryImages.length]}
                  alt={card.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="space-y-2 p-6">
                  <p className="section-kicker text-left">{t('gallery.subtitle')}</p>
                  <h3 className="text-xl font-semibold text-primary-900">{card.title}</h3>
                  <p className="text-sm text-slate-500">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[32px] border border-slate-100 bg-white/90 p-8 text-center shadow-2xl shadow-primary-900/5">
            <FiCamera className="mx-auto text-4xl text-secondary-500" />
            <p className="mt-4 text-base font-semibold text-primary-900">{t('gallery.note')}</p>
            <p className="mt-2 text-sm text-slate-500">{t('gallery.description')}</p>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B37369876660&text"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              {t('gallery.cta')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Galerie

