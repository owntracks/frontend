import Vue from "vue";
import VueI18n from "vue-i18n";

import config from "@/config";

// TODO: This should be possible to do with https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n,
// but that breaks at runtime - may only work with vue-i18n@9?
import da_DK from "@/locales/da-DK.json";
import de_DE from "@/locales/de-DE.json";
import en_GB from "@/locales/en-GB.json";
import en_US from "@/locales/en-US.json";
import es_ES from "@/locales/es-ES.json";
import fr_FR from "@/locales/fr-FR.json";
import sk_SK from "@/locales/sk-SK.json";
import tr_TR from "@/locales/tr-TR.json";

Vue.use(VueI18n);

const messages = {
  da_DK: da_DK,
  de_DE: de_DE,
  en_GB: en_GB,
  en_US: en_US,
  es_ES: es_ES,
  fr_FR: fr_FR,
  sk_SK: sk_SK,
  tr_TR: tr_TR,
};

export default new VueI18n({
  locale: config.locale,
  fallbackLocale: "en-US",
  formatFallbackMessages: true,
  messages,
});
