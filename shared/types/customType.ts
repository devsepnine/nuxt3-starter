import {I18nOptions} from 'vue-i18n';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify: {
      vueI18n?: I18nOptions | string;
      localeDir?: string;
    };
  }
}
