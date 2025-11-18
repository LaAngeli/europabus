import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, pageKeyToSlug } from './pageConfig'

const BASE_URL = 'https://europabus.md'
const OG_IMAGE = `${BASE_URL}/img/logo/meta-logo-300x218.png`
const OG_LOCALE_MAP = {
  ro: 'ro_RO',
  ru: 'ru_RU'
}

const HREF_LANG_MAP = {
  ro: 'ro-RO',
  ru: 'ru-RU'
}

const HOME_LABEL = {
  ro: 'Acasă',
  ru: 'Главная'
}

const SEO_TEXT = {
  home: {
    ro: {
      title: 'EuropaBus | Transport Moldova – Germania, Belgia, Olanda',
      description:
        'EuropaBus asigură curse regulate de pasageri și transport de colete din Republica Moldova către Germania, Belgia și Olanda, cu servicii door-to-door și suport 24/7.',
      keywords: 'transport moldova germania, transport pasageri moldova europa, europabus, colete moldova europa',
      breadcrumb: 'Acasă'
    },
    ru: {
      title: 'EuropaBus | Пассажирские перевозки Молдова – Германия, Бельгия, Нидерланды',
      description:
        'EuropaBus выполняет регулярные рейсы и доставку посылок из Молдовы в Германию, Бельгию и Нидерланды с сервисом door-to-door и поддержкой 24/7.',
      keywords: 'пассажирские перевозки молдова германия, europabus, доставка посылок молдова европа',
      breadcrumb: 'Главная'
    }
  },
  rute: {
    ro: {
      title: 'Rute EuropaBus | Moldova către Germania, Belgia și Olanda',
      description:
        'Vezi rutele și orașele acoperite de EuropaBus, inclusiv curse zilnice Moldova – Germania și transport rapid către Belgia și Olanda.',
      keywords: 'rute moldova germania, transport moldova olanda, trasee europabus',
      breadcrumb: 'Rute'
    },
    ru: {
      title: 'Маршруты EuropaBus | Молдова – Германия, Бельгия, Нидерланды',
      description:
        'Подробное расписание рейсов EuropaBus: ежедневные маршруты Молдова – Германия и регулярные поездки в Бельгию и Нидерланды.',
      keywords: 'маршруты молдова германия, europabus маршруты, перевозки молдова европа',
      breadcrumb: 'Маршруты'
    }
  },
  rezervari: {
    ro: {
      title: 'Rezervări EuropaBus | Formular online transport Moldova – UE',
      description:
        'Rezervă rapid un loc sau trimite un colet cu EuropaBus folosind formularul securizat și primește confirmarea în maximum 30 de minute.',
      keywords: 'rezervare transport moldova, rezervare europabus, formular transport colete',
      breadcrumb: 'Rezervări'
    },
    ru: {
      title: 'Бронирование EuropaBus | Онлайн форма поездки Молдова – ЕС',
      description:
        'Заполните безопасную форму EuropaBus, чтобы забронировать место или отправить посылку. Ответ и подтверждение в течение 30 минут.',
      keywords: 'бронирование europabus, перевозки молдова европа онлайн, форма отправки посылок',
      breadcrumb: 'Бронирование'
    }
  },
  contacte: {
    ro: {
      title: 'Contacte EuropaBus | Telefon, WhatsApp, program',
      description:
        'Ia legătura cu EuropaBus prin telefon, WhatsApp, Viber sau Telegram. Program zilnic 07:00 – 22:00 și suport tehnic non-stop.',
      keywords: 'contact europabus, telefon transport moldova, whatsapp europabus',
      breadcrumb: 'Contacte'
    },
    ru: {
      title: 'Контакты EuropaBus | Телефон, WhatsApp, график работы',
      description:
        'Свяжитесь с EuropaBus по телефону, WhatsApp, Viber или Telegram. Мы доступны ежедневно с 07:00 до 22:00 и обеспечиваем круглосуточную поддержку.',
      keywords: 'контакты europabus, телефон перевозки молдова европа, whatsapp europabus',
      breadcrumb: 'Контакты'
    }
  },
  despreNoi: {
    ro: {
      title: 'Despre EuropaBus | 12 ani experiență în transport internațional',
      description:
        'Află povestea EuropaBus, flota modernă și procedurile de siguranță care garantează călătorii confortabile și livrări rapide în UE.',
      keywords: 'despre europabus, transport international moldova, companie transport moldova europa',
      breadcrumb: 'Despre noi'
    },
    ru: {
      title: 'О компании EuropaBus | 12 лет международных перевозок',
      description:
        'Узнайте историю EuropaBus, о нашем современном автопарке и стандартах безопасности для комфортных поездок и доставки посылок в ЕС.',
      keywords: 'о компании europabus, международные перевозки молдова, автобусные рейсы молдова европа',
      breadcrumb: 'О компании'
    }
  },
  faq: {
    ro: {
      title: 'Întrebări frecvente EuropaBus | Răspunsuri rapide',
      description:
        'Descoperă cele mai frecvente întrebări despre bilete, bagaje, copii, colete și procedura de plată pentru serviciile EuropaBus.',
      keywords: 'faq europabus, întrebări transport moldova europa, bagaje europabus',
      breadcrumb: 'FAQ'
    },
    ru: {
      title: 'FAQ EuropaBus | Ответы на популярные вопросы',
      description:
        'Ответы на вопросы о билетах, багаже, детских скидках и доставке посылок при поездках EuropaBus.',
      keywords: 'faq europabus, вопросы перевозки молдова, багаж europabus',
      breadcrumb: 'FAQ'
    }
  },
  termeni: {
    ro: {
      title: 'Termeni și condiții EuropaBus | Reguli de transport',
      description:
        'Consultă termenii și condițiile pentru rezervări, anulări, plata serviciilor și regulile privind bagajele și coletele EuropaBus.',
      keywords: 'termeni europabus, conditii transport moldova, reguli bagaje europabus',
      breadcrumb: 'Termeni și condiții',
      ogType: 'article'
    },
    ru: {
      title: 'Условия EuropaBus | Правила бронирования и перевозок',
      description:
        'Прочитайте условия бронирования, отмены, оплаты и правила провоза багажа и посылок при поездках с EuropaBus.',
      keywords: 'условия europabus, правила перевозок молдова, багаж europabus',
      breadcrumb: 'Условия',
      ogType: 'article'
    }
  },
  politica: {
    ro: {
      title: 'Politica de confidențialitate EuropaBus',
      description:
        'Află cum protejează EuropaBus datele personale ale pasagerilor și expeditorilor, ce colectăm și cum poți solicita ștergerea informațiilor.',
      keywords: 'politica confidentialitate europabus, protectia datelor transport, gdpr europabus',
      breadcrumb: 'Politica de confidențialitate',
      ogType: 'article'
    },
    ru: {
      title: 'Политика конфиденциальности EuropaBus',
      description:
        'Как EuropaBus защищает персональные данные пассажиров и клиентов, какие сведения мы собираем и как запросить удаление информации.',
      keywords: 'политика конфиденциальности europabus, защита данных перевозки',
      breadcrumb: 'Политика конфиденциальности',
      ogType: 'article'
    }
  },
  galerie: {
    ro: {
      title: 'Galerie EuropaBus | Flotă modernă și servicii premium',
      description:
        'Vezi flota EuropaBus, interiorul microbuzelor și momente din operațiunile zilnice de transport pasageri și colete.',
      keywords: 'galerie europabus, flota transport moldova, poze microbuze moldova europa',
      breadcrumb: 'Galerie foto'
    },
    ru: {
      title: 'Галерея EuropaBus | Современный автопарк и сервис',
      description:
        'Фото автопарка EuropaBus, салона микроавтобусов и процесса работы при перевозке пассажиров и посылок.',
      keywords: 'галерея europabus, автобусы молдова европа, фото перевозок',
      breadcrumb: 'Галерея'
    }
  }
}

const cloneSchema = (schema) => JSON.parse(JSON.stringify(schema))

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}#organization`,
  name: 'EuropaBus',
  url: BASE_URL,
  logo: `${BASE_URL}/img/logo/tab-logo-notext.svg`,
  sameAs: [
    'https://www.facebook.com/transgerm.arv',
    'https://www.instagram.com/_transport_germania_?igsh=djlsZng3ZHZmdmlm',
    'https://telegram.me/RUSLANEUROPABUS'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+37369876660',
      contactType: 'customer service',
      areaServed: ['MD', 'RO', 'DE', 'BE', 'NL'],
      availableLanguage: ['ro', 'ru', 'en']
    }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Arborilor 21',
    addressLocality: 'Chișinău',
    addressCountry: 'MD'
  }
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}#website`,
  url: BASE_URL,
  name: 'EuropaBus',
  publisher: {
    '@id': `${BASE_URL}#organization`
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/rezervari?search={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
}

const buildPath = (language, pageKey) => {
  const slug = pageKeyToSlug[pageKey] || ''
  const slugPath = slug ? `/${slug}` : '/'

  if (language === DEFAULT_LANGUAGE) {
    return slugPath
  }

  return slugPath === '/' ? `/${language}` : `/${language}${slugPath}`
}

const buildAlternates = (pageKey) => {
  const links = SUPPORTED_LANGUAGES.map((lang) => ({
    hrefLang: HREF_LANG_MAP[lang] || lang,
    href: `${BASE_URL}${buildPath(lang, pageKey)}`
  }))

  links.push({
    hrefLang: 'x-default',
    href: `${BASE_URL}${buildPath(DEFAULT_LANGUAGE, pageKey)}`
  })

  const unique = new Map()
  links.forEach((link) => {
    unique.set(link.hrefLang, link)
  })

  return Array.from(unique.values())
}

const buildBreadcrumbSchema = (pageKey, language, canonical, breadcrumbName) => {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: HOME_LABEL[language] || HOME_LABEL[DEFAULT_LANGUAGE],
      item: `${BASE_URL}${buildPath(language, 'home')}`
    }
  ]

  if (pageKey !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: breadcrumbName || SEO_TEXT[pageKey]?.[language]?.title || 'EuropaBus',
      item: canonical
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

const buildWebPageSchema = (pageKey, language, canonical, title, description) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${canonical}#webpage`,
  url: canonical,
  name: title,
  inLanguage: language,
  description,
  isPartOf: {
    '@id': `${BASE_URL}#website`
  },
  about: {
    '@id': `${BASE_URL}#organization`
  }
})

export const getSeoMetadata = (pageKey, language) => {
  const safePageKey = SEO_TEXT[pageKey] ? pageKey : 'home'
  const pageCopy = SEO_TEXT[safePageKey]?.[language] || SEO_TEXT[safePageKey]?.[DEFAULT_LANGUAGE]
  const fallbackCopy = SEO_TEXT.home[language] || SEO_TEXT.home[DEFAULT_LANGUAGE]
  const meta = pageCopy || fallbackCopy

  const canonical = `${BASE_URL}${buildPath(language, safePageKey)}`
  const alternates = buildAlternates(safePageKey)

  const structuredData = [
    cloneSchema(ORGANIZATION_SCHEMA),
    cloneSchema(WEBSITE_SCHEMA),
    buildWebPageSchema(safePageKey, language, canonical, meta.title, meta.description),
    buildBreadcrumbSchema(safePageKey, language, canonical, meta.breadcrumb)
  ]

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: meta.robots || 'index, follow',
    canonical,
    pageUrl: canonical,
    ogImage: OG_IMAGE,
    ogType: meta.ogType || 'website',
    siteName: 'EuropaBus',
    locale: OG_LOCALE_MAP[language] || OG_LOCALE_MAP[DEFAULT_LANGUAGE],
    ogAlternates: SUPPORTED_LANGUAGES.filter((lang) => lang !== language).map(
      (lang) => OG_LOCALE_MAP[lang] || lang
    ),
    alternates,
    structuredData
  }
}


