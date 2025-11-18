export const DEFAULT_LANGUAGE = 'ro'

export const SUPPORTED_LANGUAGES = ['ro', 'ru']

export const PAGE_DEFINITIONS = [
  { key: 'home', slug: '' },
  { key: 'rute', slug: 'rute' },
  { key: 'rezervari', slug: 'rezervari' },
  { key: 'contacte', slug: 'contacte' },
  { key: 'despreNoi', slug: 'despre-noi' },
  { key: 'faq', slug: 'faq' },
  { key: 'termeni', slug: 'termeni' },
  { key: 'politica', slug: 'politica' },
  { key: 'galerie', slug: 'galerie' }
]

export const slugToPageKey = PAGE_DEFINITIONS.reduce(
  (acc, { key, slug }) => ({ ...acc, [slug || '']: key }),
  {}
)

export const getPageKeyFromSlug = (slugSegments = []) => {
  const slug = slugSegments.join('/') || ''
  return slugToPageKey[slug] || 'home'
}

export const pageKeyToSlug = PAGE_DEFINITIONS.reduce(
  (acc, { key, slug }) => ({ ...acc, [key]: slug }),
  {}
)

export const localizedSlugs = PAGE_DEFINITIONS.reduce((acc, { key, slug }) => {
  acc[key] = {
    ro: slug ? `/${slug}` : '/',
    ru: slug ? `/ru/${slug}` : '/ru'
  }
  return acc
}, {})

export const buildStaticPaths = (language) =>
  PAGE_DEFINITIONS.map(({ slug }) => {
    const segments = slug ? slug.split('/') : []
    return language === 'ro'
      ? { params: { slug: segments } }
      : { params: { slug: segments } }
  })

