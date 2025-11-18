import NextLink from 'next/link'
import { useLanguage } from '../context/LanguageContext'

const isExternalHref = (href) => /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')

const LocalizedLink = ({ href = '/', children, ...props }) => {
  const { getPath } = useLanguage()

  if (!href) {
    return children
  }

  if (isExternalHref(href) || href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  const localizedHref = getPath(href)

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  )
}

export default LocalizedLink

