import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    // TODO ↓多言語化のためのstateを作るか？
    // locale: store.state.locale,
    fallbackLocale: 'ja',
    messages: {
      ja: require('~/locales/ja.json')
    }
  })
}

export const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    ja: require('~/locales/ja.json')
  }
})
