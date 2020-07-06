import Vue from 'vue'
import VueI18n from 'vue-i18n'
import validationMessagesEnglish from 'vee-validate/dist/locale/en'
import validationMessagesVietnamese from 'vee-validate/dist/locale/vi'

// import languages
import english from '../../languages/en'
import vietnamese from '../../languages/vi'
import { LOCALE } from '../../enum/locale.enum'

Vue.use(VueI18n)

const dictionary = {
  en: {
    url: 'The {_field_} is wrong format'
  },
  vi: {
    url: '不正な形式になっています。'
  }
}

const messages = {
  english: { ...english, validation: { ...validationMessagesEnglish.messages, ...dictionary.en } },
  japanese: { ...vietnamese, validation: { ...validationMessagesVietnamese.messages, ...dictionary.vi } }
}

const i18n = new VueI18n({
  locale: LOCALE.vi, // set locale
  messages,
  fallbackLocale: LOCALE.vi
})

export default i18n
