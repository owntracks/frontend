import Vue from "vue";
import App from "@/App.vue";
import config from "@/config";
import i18n from "@/i18n";
import router from "@/router";
import store from "@/store";
import VModal from "vue-js-modal";
import VOutsideEvents from "vue-outside-events";

Vue.use(VModal);
Vue.use(VOutsideEvents);

Vue.config.productionTip = false;

Vue.prototype.$config = config;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount("#app");
