import 'server-only'
 
const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  ar: () => import('../../dictionaries/ar.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => {
  const validLocales = ['en', 'ar'];  // Define valid locales

  if (!validLocales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return dictionaries[locale]();
};