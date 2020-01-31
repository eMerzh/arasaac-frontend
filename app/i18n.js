/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import nl from 'react-intl/locale-data/nl'
import es from 'react-intl/locale-data/es'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'
import de from 'react-intl/locale-data/de'
import pt from 'react-intl/locale-data/pt'
import he from 'react-intl/locale-data/he'
import af from 'react-intl/locale-data/af'

import { DEFAULT_LOCALE, appLocales } from './containers/App/constants'
import enTranslationMessages from './translations/en.json'
import nlTranslationMessages from './translations/nl.json'
import esTranslationMessages from './translations/es.json'
import frTranslationMessages from './translations/fr.json'
import itTranslationMessages from './translations/it.json'
import deTranslationMessages from './translations/de.json'
import valTranslationMessages from './translations/val.json'
import ptTranslationMessages from './translations/pt.json'
import heTranslationMessages from './translations/he.json'
import afTranslationMessages from './translations/af.json'

addLocaleData([...en, ...es, ...fr, ...it, ...de, ...pt, ...he, ...af])

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key]
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key]
    }
    return Object.assign(formattedMessages, { [key]: message })
  }, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
  it: formatTranslationMessages('it', itTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  nl: formatTranslationMessages('nl', nlTranslationMessages),
  val: formatTranslationMessages('val', valTranslationMessages),
  pt: formatTranslationMessages('pt', ptTranslationMessages),
  he: formatTranslationMessages('he', heTranslationMessages),
  af: formatTranslationMessages('af', afTranslationMessages),
}
