import PageLayout from '../../src/layouts/PageLayout'
import PageRenderer from '../../src/components/PageRenderer'
import { getTranslations } from '../../src/lib/getTranslations'
import {
  DEFAULT_LANGUAGE,
  PAGE_DEFINITIONS,
  SUPPORTED_LANGUAGES,
  getPageKeyFromSlug
} from '../../src/lib/pageConfig'
import { getSeoMetadata } from '../../src/lib/seoConfig'

const LocalizedPage = ({ language, translations, pageKey, seo }) => {
  return (
    <PageLayout language={language} translations={translations} seo={seo}>
      <PageRenderer pageKey={pageKey} />
    </PageLayout>
  )
}

export const getStaticPaths = () => {
  const languages = SUPPORTED_LANGUAGES.filter((lang) => lang !== DEFAULT_LANGUAGE)
  const paths = []

  languages.forEach((lang) => {
    PAGE_DEFINITIONS.forEach(({ slug }) => {
      paths.push({
        params: {
          lang,
          slug: slug ? slug.split('/') : []
        }
      })
    })
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params = {} }) => {
  const lang = params.lang

  if (!SUPPORTED_LANGUAGES.includes(lang) || lang === DEFAULT_LANGUAGE) {
    return { notFound: true }
  }

  const slugSegments = params.slug || []
  const pageKey = getPageKeyFromSlug(slugSegments)
  const translations = getTranslations(lang)
  const seo = getSeoMetadata(pageKey, lang)

  return {
    props: {
      language: lang,
      translations,
      pageKey,
      seo
    }
  }
}

export default LocalizedPage


