import fs from 'fs'
import path from 'path'

export const getTranslations = (language) => {
  const filePath = path.join(process.cwd(), 'public', 'locales', `${language}.json`)

  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Nu am putut încărca fișierul de traduceri pentru limba ${language}`, error)
    return {}
  }
}

