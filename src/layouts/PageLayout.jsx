import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LanguageProvider } from '../context/LanguageContext'
import SeoHead from '../components/SeoHead'

const PageLayout = ({ children, language, translations, seo }) => {
  return (
    <LanguageProvider initialLanguage={language} initialTranslations={translations}>
      <SeoHead meta={seo} language={language} />
      <div className="min-h-screen bg-slate-50 text-gray-900">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}

export default PageLayout

