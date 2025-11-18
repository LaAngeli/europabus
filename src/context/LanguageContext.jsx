import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { createInstance } from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { DEFAULT_LANGUAGE } from '../lib/pageConfig'

const LanguageContext = createContext(null)

const getNormalizedPath = (path = '/') => {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

const splitAsPath = (asPath) => {
  const [pathAndQuery = '', hash = ''] = asPath.split('#')
  const [pathname = '', query = ''] = pathAndQuery.split('?')
  return { pathname: pathname || '/', query, hash }
}

const stripLangFromPath = (pathname, lang) => {
  const segments = pathname.split('/').filter(Boolean)
  if (lang !== DEFAULT_LANGUAGE && segments[0] === lang) {
    segments.shift()
  }
  return `/${segments.join('/')}`.replace(/\/\/+/g, '/') || '/'
}

const createI18nInstance = (language, translations) => {
  const instance = createInstance()

  if (typeof window !== 'undefined') {
    instance.use(HttpBackend)
  }

  instance.init({
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    resources: translations ? { [language]: { common: translations } } : undefined,
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    react: { useSuspense: false },
    initImmediate: false
  })

  return instance
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
  initialTranslations = {}
}) => {
  const router = useRouter()
  const [i18n] = useState(() => createI18nInstance(initialLanguage, initialTranslations))
  const [language, setLanguage] = useState(initialLanguage)

  useEffect(() => {
    if (initialTranslations) {
      i18n.addResourceBundle(initialLanguage, 'common', initialTranslations, true, true)
    }
    i18n.changeLanguage(initialLanguage)
    setLanguage(initialLanguage)
  }, [i18n, initialLanguage, initialTranslations])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  const fetchTranslations = useCallback(async (lang) => {
    try {
      const response = await fetch(`/locales/${lang}.json`)
      if (!response.ok) {
        throw new Error('Nu am putut încărca traducerile')
      }
      const data = await response.json()
      i18n.addResourceBundle(lang, 'common', data, true, true)
    } catch (error) {
      console.error(error)
    }
  }, [i18n])

  const getPath = useCallback(
    (targetPath = '/', lang = language) => {
      const normalized = getNormalizedPath(targetPath)
      if (lang === DEFAULT_LANGUAGE) {
        return normalized
      }
      return normalized === '/' ? `/${lang}` : `/${lang}${normalized}`
    },
    [language]
  )

  const changeLanguage = useCallback(
    async (lang) => {
      if (lang === language) return

      if (!i18n.hasResourceBundle(lang, 'common')) {
        await fetchTranslations(lang)
      }

      await i18n.changeLanguage(lang)
      setLanguage(lang)

      const { pathname, query, hash } = splitAsPath(router.asPath || '/')
      const basePath = stripLangFromPath(pathname, language)
      const localizedBase = lang === DEFAULT_LANGUAGE ? basePath : (basePath === '/' ? `/${lang}` : `/${lang}${basePath}`)

      let nextPath = localizedBase === '//' ? '/' : localizedBase
      if (query) {
        nextPath += `?${query}`
      }
      if (hash) {
        nextPath += `#${hash}`
      }

      router.push(nextPath, undefined, { scroll: false })
    },
    [fetchTranslations, i18n, language, router]
  )

  const t = useCallback((key) => i18n.t(key, { defaultValue: key }), [i18n])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, getPath }}>
      {children}
    </LanguageContext.Provider>
  )
}
