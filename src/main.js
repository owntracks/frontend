import Vue from "vue";
import VueModal from "vue-js-modal";
import VueOutsideEvents from "vue-outside-events";
import VueMq from "vue-mq";

import App from "@/App.vue";
import config from "@/config";
import { log } from "@/logging";
import i18n from "@/i18n";
import router from "@/router";
import store from "@/store";

Vue.use(VueModal);
Vue.use(VueOutsideEvents);
Vue.use(VueMq, {
  breakpoints: {
    sm: 1300,
    lg: Infinity,
  },
});

Vue.config.productionTip = false;

log("CONFIG", config);

Vue.prototype.$config = config;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount("#app");
