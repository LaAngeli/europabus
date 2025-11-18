import Head from 'next/head'

const SeoHead = ({ meta, language }) => {
  if (!meta) return null

  const {
    title,
    description,
    keywords,
    canonical,
    robots = 'index, follow',
    ogImage,
    ogType = 'website',
    siteName = 'EuropaBus',
    pageUrl = canonical,
    locale,
    alternates = [],
    ogAlternates = [],
    structuredData = []
  } = meta

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="language" content={language} />
      <meta httpEquiv="content-language" content={language} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />
      {locale && <meta property="og:locale" content={locale} />}
      {ogAlternates.map((alternate) => (
        <meta key={`og-alt-${alternate}`} property="og:locale:alternate" content={alternate} />
      ))}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {alternates.map(({ hrefLang, href }) => (
        <link key={`alt-${hrefLang}`} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}

      {structuredData.map((schema, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={`ldjson-${index}`}
          type="application/ld+json"
        />
      ))}
    </Head>
  )
}

export default SeoHead

