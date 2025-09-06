import DefaultTheme from 'vitepress/theme'
import "@fontsource/maple-mono";
import 'vuetify/styles'
import './style/custom.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({ 
  components, directives,
  icons: {
    defaultSet: 'mdi',
  },
})

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(vuetify)
  },
}