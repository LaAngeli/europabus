import PageLayout from '../src/layouts/PageLayout'
import PageRenderer from '../src/components/PageRenderer'
import { getTranslations } from '../src/lib/getTranslations'
import {
  DEFAULT_LANGUAGE,
  PAGE_DEFINITIONS,
  getPageKeyFromSlug
} from '../src/lib/pageConfig'
import { getSeoMetadata } from '../src/lib/seoConfig'

const DefaultLocalePage = ({ language, translations, pageKey, seo }) => {
  return (
    <PageLayout language={language} translations={translations} seo={seo}>
      <PageRenderer pageKey={pageKey} />
    </PageLayout>
  )
}

export const getStaticPaths = () => {
  const paths = PAGE_DEFINITIONS.map(({ slug }) => ({
    params: {
      slug: slug ? slug.split('/') : []
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params = {} }) => {
  const slugSegments = params.slug || []
  const pageKey = getPageKeyFromSlug(slugSegments)
  const translations = getTranslations(DEFAULT_LANGUAGE)
  const seo = getSeoMetadata(pageKey, DEFAULT_LANGUAGE)

  return {
    props: {
      language: DEFAULT_LANGUAGE,
      translations,
      pageKey,
      seo
    }
  }
}

export default DefaultLocalePage


